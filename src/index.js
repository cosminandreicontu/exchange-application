import React                    from "react";
import RootComponent            from "./js/components/rootContainer";
import {render}                 from "react-dom";
import {Provider}               from "react-redux";
import store                    from "./js/store";
import                               "./style/app.scss";


render(
    <Provider store={store}>
        <RootComponent/>
    </Provider>,
    document.getElementById("root")
);