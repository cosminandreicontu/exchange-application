import {applyMiddleware, compose, createStore}         from "redux";
import rootReducer                                     from "../reducers/rootReducer";
import {forbiddenRequestsMiddleware}                   from "../middleware";
import createSagaMiddleware                            from "redux-saga";
import {authFlow, logActions, saveTokenToLocalstorage} from "../sagas/authServiceWorker";

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    storeEnhancers(
        applyMiddleware(forbiddenRequestsMiddleware, initialiseSagaMiddleware)
    )
);

initialiseSagaMiddleware.run(authFlow);
initialiseSagaMiddleware.run(saveTokenToLocalstorage);

//FOR DEVELOPMENT PURPOSE
initialiseSagaMiddleware.run(logActions);

export default store;