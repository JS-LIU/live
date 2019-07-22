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
        userService.signIn().then((data)=>{
            console.log(data.data.token);
            userService.updateUserInfo({token:data.data.token});
            console.log(userService.getUser());
        });
    }
    inputPhoneNum(e){
        console.log(e.target.value);
        userService.getUser().setPhoneNum(e.target.value);
    }
    inputPassword(e) {
        console.log(e.target.value);
        userService.getUser().setPassword(e.target.value);
    }
    render(){
        return(
            <div>
                <input placeholder="手机号" onChange={(e)=>this.inputPhoneNum(e)}/>
                <input type="password" onChange={(e)=>{
                    this.inputPassword(e)
                }}/>
                <span onClick={this.login.bind(this)}>登录</span>
            </div>
        )
    }
}
