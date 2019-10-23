/**
 * Created by Liudq on 2019-08-15
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,
    HashRouter,
    Switch,
    Route,
    Redirect,
    Link } from "react-router-dom";

//  学习中心
import {PCStudyCourseView} from "./container/PCStudyCourse/PCStudyCourseView";
import {HB} from "./util/HB";
import {userService} from "../src/service/UserService";
import {baseUrl} from "./config/config";
import commonStyle from './container/PCStudyCourse/commonStyle.css';
HB.ui.setBaseFontSize(1280,100);
// baseUrl.setBaseUrl("/pcwap");

let token = HB.url.getSearchKey("token")||"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTcxMzc4MDM4NDY5Iiwia2V5X3VzZXJfaWQiOjEwMDE3LCJpYXQiOjE1NzEzNzgwMzgsImV4cCI6MTU3MTk4MjgzOH0.qF_mHfK0HmnpHfk3rEikCbutV3XEVUtNdtixBx-FqQk";
userService.login.updateToken(token);
window.navigateBack = function(){
    window.history.go(-1);
};
userService.updateUserInfo().then((data)=>{
    // let redirect = data.userName ==="" ? "/studyCourseCenter/userInfo" : ;
    ReactDOM.render(
        (<HashRouter>
            <Redirect to="/studyCourseCenter/week"/>
            <div>
                <Route path="/studyCourseCenter/:myCourse" component={PCStudyCourseView} />
            </div>
        </HashRouter>),
        document.getElementById('root')
    );
});



