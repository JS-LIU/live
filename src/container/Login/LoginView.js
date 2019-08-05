/**
 * Created by Liudq on 2019-07-22
 */

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import {login} from "../../entity/Login";
import {userService} from "../../service/UserService";
import {FooterView} from "../../component/FooterView/FooterView";

export class LoginView extends Component{

    componentDidMount() {

    }

    //  登录
    login(){
        userService.signIn().then((data)=>{
            userService.updateUserInfo({token:data.data.token});
            //  跳转到首页
            this.props.history.replace('/home');
        });
    }
    inputPhoneNum(e){
        userService.getUser().setPhoneNum(e.target.value);
    }
    inputPassword(e) {
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
                <FooterView style={{position:"fixed",bottom:"0"}}/>
            </div>
        )
    }
}
