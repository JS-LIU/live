/**
 * Created by LDQ on 2019/7/17
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {HeaderView} from "./component/HeaderView";

//  登录界面
import {LoginView} from "./container/Login/LoginView";
//  首页
import {HomeView} from "./container/HomePage/HomeView";
//  学习中心
import {StudyCourseCenterView} from "./container/StudyCourseCenter/StudyCourseCenterView";
//  选课中心
import {SelectCourseCenterView} from "./container/SelectCourseCenter/SelectCourseCenterView";


import {CodingView} from "./container/CodingView";


// function Index() {
//
//
//     return (
//         <div>
//             <HeaderView />
//             <h2>Home</h2>
//             <Link to="/about/">About</Link>
//         </div>
//
//
//     )
// }

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

ReactDOM.render(
    (<Router>
        <div>
            <Route path="/" exact component={LoginView} />
            <Route path="/home" component={HomeView}/>
            <Route path="/selectCourseCenter" component={SelectCourseCenterView} />
            <Route path="/studyCourseCenter" component={StudyCourseCenterView} />

            <Route path="/users/" component={Users} />
            <Route path="/codingCenter" component={CodingView} />
        </div>
    </Router>),
    document.getElementById('app')
);