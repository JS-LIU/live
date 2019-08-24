/**
 * Created by LDQ on 2019/7/17
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,
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
import {baseUrl} from "./config/config";
//  resetFontSize
HB.ui.setBaseFontSize(1920,100);
//  获取当前路径
// baseUrl.setBaseUrl("/product");

//  上次访问的是哪个页面 到了这个页面我要让他访问哪个页面

let redirectConfig = {
    "resetPassword":"/login/login",
    "register":"/login/register",
    "selectCourseCenter":"selectCourseCenter"
};
let redirectUrl = redirectConfig[HB.url.getSearchKey("redirect")] || "/home";

ReactDOM.render(
    (<BrowserRouter>
        <Redirect to={redirectUrl}/>
        <div>
            <Route path="/home" component={HomeView}/>
            <Route path="/login/:action" exact component={LoginMainView} />
            <Route path="/selectCourseCenter" component={SelectCourseCenterView} />
            <Route path="/studyCourseCenter/:myCourse" component={StudyCourseCenterView} />
            <Route path="/productCourseDetail/:productCourseNo" component={ProductCourseDetailView} />
            <Route path="/confirmOrder/:productCourseNo" component={SettleCenterView} />
            <Route path="/pay" component={PayView} />
            <Route path="/paySuccess/:status" component={PaySuccessView}/>
            <Route path="/payFail/:status" component={PayFailView}/>
            <Route path="/user/:userInfo" component={UserView}/>
            <Route path="/ownedCourseDetail/:id" component={OwnedCourseDetailView}/>
            <Route path="/orderDetail/:orderNo" component={OrderDetailView}/>
            <Route path="/downLoad" component={DownLoadView}/>
            {/*<Route path="/codingCenter" component={CodingView} />*/}
        </div>
    </BrowserRouter>),
    document.getElementById('app')
);