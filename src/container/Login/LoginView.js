/**
 * Created by Liudq on 2019-07-22
 */

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import {login} from "../../entity/Login";
import {userService} from "../../service/UserService";


export class LoginView extends Component{

    componentDidMount() {

    }

    //  登录
    login(){
        // login.testLogin("13601180392","123456");
    }
    inputPhoneNum(e){
        console.log(e.target.value);
        userService.setPhoneNum(e.target.value);
    }
    render(){
        return(
            <div>
                <input placeholder="手机号" onChange={(e)=>this.inputPhoneNum(e)}/>
                <input type="password" />
                <span onClick={this.login.bind(this)}>登录</span>
            </div>
        )
    }
}
