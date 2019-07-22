/**
 * Created by LDQ on 2019/7/17
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {HeaderView} from "./component/HeaderView";

//  登录界面
import {LoginView} from "./container/Login/LoginView";
import {CodingView} from "./container/CodingView";

function Index() {


    return (
        <div>
            <HeaderView />
            <h2>Home</h2>
            <Link to="/about/">About</Link>
        </div>


    )
}

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
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
            <Route path="/codingCenter" component={CodingView} />
        </div>
    </Router>),
    document.getElementById('app')
);