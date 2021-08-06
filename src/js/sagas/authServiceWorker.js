import {post}                                     from "axios";
import {call, cancel, cancelled, fork, put, take} from "@redux-saga/core/effects";
import actionTypes, {AUTH_TYPE} from "../actions/actionTypes";
import {SERVER_IP}                                from "../config/server-api";

export function serverAuthorize(user, password, authType) {
    return new Promise(async (resolve, reject) => {
        try {
            let path = authType === AUTH_TYPE.LOGIN ? "login" : "register"
            const result = await post(`${SERVER_IP}users/${path}`, {mail: user, password: password});
            resolve(result.data.token);
        } catch (error) {
            reject(error.response.data);
        }
    });
}
export function* authorize(user, password, authType) {
    try {
        const token = yield call(serverAuthorize, user, password, authType)
        yield put({type: actionTypes.LOGIN_SUCCESS, user})
        yield put({type: actionTypes.SAVE_TOKEN, token, user});
    } catch (error) {
        yield put({type: actionTypes.LOGIN_ERROR, error})
    } finally {
        if (yield cancelled()) {
            yield put({type: actionTypes.LOGIN_CANCELLED})
        }
    }
}
export function* authFlow() {
    while (true) {
        const {user, password, authType} = yield take(actionTypes.AUTH_REQUEST)
        const task = yield fork(authorize, user, password, authType)
        const action = yield take([actionTypes.LOGOUT, actionTypes.LOGIN_ERROR])
        if (action.type === actionTypes.LOGOUT) {
            yield cancel(task)
            yield put({type: actionTypes.DELETE_TOKEN})
        }
    }
}
export function* logActions() {
    //FOR DEVELOPMENT PURPOSE
    while (true) {
        const action = yield take('*')
        console.log(action.type);
    }
}
export function* saveTokenToLocalstorage() {
    while (true) {
        const {token,user} = yield take(actionTypes.SAVE_TOKEN);
        localStorage.setItem('token',JSON.stringify({token:'Bearer ' + token,user:user}))
    }
}