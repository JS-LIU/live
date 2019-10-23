/**
 * Created by LDQ on 2019/7/17
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,
    HashRouter,
    Switch,
    Route,
    Redirect,
    Link } from "react-router-dom";

//  登录界面
import {LoginMainView} from "./container/Login/LoginMainView";
//  首页
import {HomeView} from "./container/HomePage/HomeView";
//  学习中心
import {StudyCourseCenterView} from "./container/StudyCourseCenter/StudyCourseCenterView";
//  选课中心
import {SelectCourseCenterView} from "./container/SelectCourseCenter/SelectCourseCenterView";
//  课程详情
import {ProductCourseDetailView} from "./container/ProductCourseDetail/ProductCourseDetailView";
//  结算中心
import {SettleCenterView} from "./container/SettleCenter/SettleCenterView";
//  支付成功
import {PaySuccessView} from "./container/PaySuccess/PaySuccessView";
//  支付失败
import {PayFailView} from "./container/PayFail/PayFailView";
//  用户中心
import {UserView} from "./container/User/UserView";
//  支付
import {PayView} from "./container/Pay/PayView";
//  课程详情
import {OwnedCourseDetailView} from './container/OwnedCourseDetail/OwnedCourseDetailView';

import {HB} from "./util/HB";
import {OrderDetailView} from "./container/User/OrderDetailView";
import {DownLoadView} from "./container/DownLoad/DownLoadView";
import {ForgetPasswordView} from './container/Login/ForgetPasswordView';
import {baseUrl} from "./config/config";
import {userService} from "./service/UserService";
//  resetFontSize

HB.ui.setBaseFontSize = function(designWidth,rem2px){
    var d = window.document.createElement('div');
    d.style.width = '1rem';
    d.style.display = "none";
    var head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);
    var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
    d.remove();
    document.documentElement.style.fontSize = designWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
    var st = document.createElement('style');
    var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((designWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
    var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((designWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
    st.innerHTML = portrait + landscape;
    head.appendChild(st);
    return defaultFontSize
};
HB.ui.setBaseFontSize(1920,100);
//  获取当前路径
// baseUrl.setBaseUrl("/product");

//  上次访问的是哪个页面 到了这个页面我要让他访问哪个页面

let renderDom = function(){
    ReactDOM.render(
        (<HashRouter history={history}>
            <Redirect to={redirectUrl}/>
            <div>
                <Route path="/home" component={HomeView}/>
                <Route path="/login/:action" component={LoginMainView} />
                <Route path="/forgetPassword" component={ForgetPasswordView} />
                <Route path="/selectCourseCenter" component={SelectCourseCenterView} />
                <Route path="/studyCourseCenter/:myCourse" component={StudyCourseCenterView} />
                <Route path="/productCourseDetail/:productCourseNo" component={ProductCourseDetailView} />
                <Route path="/confirmOrder" component={SettleCenterView} />
                <Route path="/pay" component={PayView} />
                <Route path="/paySuccess/:status" component={PaySuccessView}/>
                <Route path="/payFail" component={PayFailView}/>
                <Route path="/user/:userInfo" component={UserView}/>
                <Route path="/ownedCourseDetail/:id" component={OwnedCourseDetailView}/>
                <Route path="/orderDetail/:orderNo" component={OrderDetailView}/>
                <Route path="/downLoad" component={DownLoadView}/>
            </div>
        </HashRouter>),
        document.getElementById('app')
    );
};
//  获取token todo 将登陆跳转逻辑 重构到 RouterService 中
let token = HB.url.getSearchKey("token")||HB.url.getSearchKey("t")||HB.save.getLocalStorageByLimitTime("token");
let redirect = HB.url.getSearchKey("redirect")||localStorage.getItem("redirect");
let redirectConfig = {
    "resetPassword":"/forgetPassword",
    "register":"/login/register",
    "selectCourseCenter":"/selectCourseCenter",
    "login/login":"/login/login",
    "studyCourseCenter/myCourseList":"/studyCourseCenter/myCourseList",
    "studyCourseCenter/week":"/studyCourseCenter/week",
    "user":"/user/userInfo",
    "ownedCourseDetail":"/studyCourseCenter/myCourseList",
    "orderDetail":'/orderDetail'+localStorage.getItem("orderNo"),
    "home":'/home',
    "download":'/downLoad',
    "pay":localStorage.getItem("pay")
};
let redirectUrl = redirectConfig[redirect] || "/home";
if(token){
    HB.save.setLocalStorageByLimitTime("token",token);
    userService.login.updateToken(token);
    userService.updateUserInfo().then(()=>{
        renderDom();
    });
}else{
    localStorage.clear();
    redirectUrl = redirectConfig[HB.url.getSearchKey("redirect")] || "/home";
    console.log(redirectUrl);
    renderDom();
}


