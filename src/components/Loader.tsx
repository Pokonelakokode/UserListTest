import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {mainSelector} from "../store";
import {pageStateActions, pageStateSelector} from "../store/reducers/pageState";
import { bindActionCreators } from "redux";

const Loader = () => {
    const {message, loading} = useSelector(pageStateSelector);
    const actions = bindActionCreators({
        dismiss: () => pageStateActions.SET({message: ""}),
    }, useDispatch());
    if (!loading && message === "") {return null}
    return (
        <div id="loader" onClick={actions.dismiss}>
            <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                <rect x="40" y="50" width="4" height="10" fill="#000">
                    <animateTransform attributeType="xml"
                                      attributeName="transform" type="translate"
                                      values="0 0; 0 20; 0 0"
                                      begin="0" dur="0.6s" repeatCount="indefinite"/>
                </rect>
                <rect x="50" y="50" width="4" height="10" fill="#000">
                    <animateTransform attributeType="xml"
                                      attributeName="transform" type="translate"
                                      values="0 0; 0 20; 0 0"
                                      begin="0.2s" dur="0.6s" repeatCount="indefinite"/>
                </rect>
                <rect x="60" y="50" width="4" height="10" fill="#000">
                    <animateTransform attributeType="xml"
                                      attributeName="transform" type="translate"
                                      values="0 0; 0 20; 0 0"
                                      begin="0.4s" dur="0.6s" repeatCount="indefinite"/>
                </rect>
            </svg>
            <h1>{message || "Loading..."}</h1>
        </div>
    );
};

export default Loader;
