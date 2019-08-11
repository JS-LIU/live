/**
 * Created by LDQ on 2019/7/17
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {HeaderView} from "./component/HeaderView/HeaderView";

//  登录界面
import {LoginView} from "./container/Login/LoginView";
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


import {TestView} from "./container/Test/TestView";
import {CodingView} from "./container/CodingView";
import {HB} from "./util/HB";

function About() {
    return (
        <div>
            <Link to="/users/">Users</Link>
        </div>
    )
}

function Users() {
    return (
        <div>
            <h2>Users</h2>
            <Link to="/">Home</Link>
        </div>
    )
}
//  resetFontSize
HB.ui.setBaseFontSize(1920,100);


ReactDOM.render(
    (<Router>
        <div>
            <Route path="/test"  component={TestView} />
            <Route path="/" exact component={LoginView} />
            <Route path="/home" component={HomeView}/>
            <Route path="/selectCourseCenter" component={SelectCourseCenterView} />
            <Route path="/studyCourseCenter/:myCourse" component={StudyCourseCenterView} />
            <Route path="/productCourseDetail/:productCourseNo" component={ProductCourseDetailView} />
            <Route path="/confirmOrder/:productCourseNo" component={SettleCenterView} />
            <Route path="/pay" component={PayView} />
            <Route path="/paySuccess/:status" component={PaySuccessView}/>
            <Route path="/payFail/:status" component={PayFailView}/>
            <Route path="/user/:userInfo" component={UserView}/>
            <Route path="/ownedCourseDetail/:id" component={OwnedCourseDetailView}/>
            {/*<Route path="/codingCenter" component={CodingView} />*/}

        </div>
    </Router>),
    document.getElementById('app')
);