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
HB.ui.setBaseFontSize(1280,100);

let token = HB.url.getSearchKey("token")||"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTY2MTgzNTMxNTQwIiwia2V5X3VzZXJfaWQiOjIsImlhdCI6MTU2NjE4MzUzMSwiZXhwIjoxNTY2Nzg4MzMxfQ.rEB4rva5vWvUYloEHwKtmaoPP9o19eToxVoYCz1C02o";
userService.updateUserInfo({token:token});
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



