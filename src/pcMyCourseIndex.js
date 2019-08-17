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

let token = HB.url.getSearchKey("token")||"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTY1OTQ0MzA5Mzg2Iiwia2V5X3VzZXJfaWQiOjIsImlhdCI6MTU2NTk0NDMwOSwiZXhwIjoxNTY2NTQ5MTA5fQ.vXnQBUPAQrFrWBZ31zR4NIlP38ssjv8Gv2Lw5P5h-Ag";
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



