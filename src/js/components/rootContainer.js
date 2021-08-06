import React,{Component}      from "react";
import {connect}              from "react-redux";
import ExchangeTabs           from "./Tabs"


class RootContainer extends Component {

    render() {
        return (
            <div className="root-container">
                <ExchangeTabs />
            </div>
        );
    }
}

export default connect(null)(RootContainer);