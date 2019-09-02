/**
 * Created by Liudq on 2019-08-15
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,
    Switch,
    Route,
    Redirect,
    Link } from "react-router-dom";

//  学习中心
import {PCStudyCourseView} from "./container/PCStudyCourse/PCStudyCourseView";
import {HB} from "./util/HB";
import {userService} from "../src/service/UserService";
import {baseUrl} from "./config/config";

HB.ui.setBaseFontSize(1280,100);

let token = HB.url.getSearchKey("token")||"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTY2NjQ4MjE5OTczIiwia2V5X3VzZXJfaWQiOjQ2LCJpYXQiOjE1NjY2NDgyMTksImV4cCI6MTU2NzI1MzAxOX0.1bofMt32n3mSgQgZXE7K3_WN3aeSSilwsLRJIpFaYWs";
userService.updateUserInfo({token:token});
baseUrl.setBaseUrl("/pcwap");

userService.getUserInfo().then(()=>{
    ReactDOM.render(
        (<BrowserRouter>
            <Redirect to="/studyCourseCenter/week"/>
            <div>
                <Route path="/studyCourseCenter/:myCourse" component={PCStudyCourseView} />
            </div>
        </BrowserRouter>),
        document.getElementById('root')
    );
});



