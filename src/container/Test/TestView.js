/**
 * Created by Liudq on 2019-08-10
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {LoginHeaderView} from "../../component/HeaderView/LoginHeaderView";
import testStyle from './testStyle.css';
export class TestView extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="test_wrap"/>
                <LoginHeaderView />
                <div className="test_main">

                    <div className="circleProgress_wrapper">
                        <div className="wrapper right">
                            <div className="circleProgress rightcircle"></div>
                        </div>
                        <div className="wrapper left">
                            <div className="circleProgress leftcircle"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}