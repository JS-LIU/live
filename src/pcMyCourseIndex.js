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
baseUrl.setBaseUrl("/pcwap");

let token = HB.url.getSearchKey("token")||"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTY5MzgwNTQzNjc0Iiwia2V5X3VzZXJfaWQiOjg5LCJpYXQiOjE1NjkzODA1NDMsImV4cCI6MTU2OTk4NTM0M30.4aIGvUyum_TN8I_KQv1mpThqlfoaZxpOymPePhFeISI";
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



