/**
 * Created by Liudq on 2019-07-22
 */

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import {login} from "../../entity/Login";
import {userService} from "../../service/UserService";
import {FooterView} from "../../component/FooterView/FooterView";
import {LoginHeaderView} from '../../component/HeaderView/LoginHeaderView';
import {LoginView} from "./LoginView";
import {RegisterView} from './RegisterView';
import loginStyle from './loginStyle.css';
export class LoginMainView extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    //  登录
    login(){
        return ()=>{
            userService.signIn().then((data)=>{
                userService.updateUserInfo({token:data.data.token});
                //  跳转到首页
                this.props.history.replace('/home');
            });
        }
    }
    inputPhoneNum(value){
        userService.getUser().setPhoneNum(value);
    }
    inputPassword(value) {
        userService.getUser().setPassword(value);
    }
    register(){
        return ()=>{
            userService.register().then((data)=>{
                userService.updateUserInfo({token:data.data.token});
                //  跳转到首页
                this.props.history.replace('/login/login');
            });
        }
    }
    render(){
        return(
            <div>
                <div className="login_wrap"/>
                <LoginHeaderView />
                <div className="login_main">
                    <Route path="/login/login" component={ props =>{
                        let obj = Object.assign({},props,{
                            login:this.login(),
                            inputPhoneNum:this.inputPhoneNum,
                            inputPassword:this.inputPassword,
                        });
                        return <LoginView  {...obj} />
                    }} />

                    <Route path="/login/register" component={ props => {
                        let obj = Object.assign({},props,{
                            register:this.register(),
                            inputPhoneNum:this.inputPhoneNum,
                            inputPassword:this.inputPassword,
                        });
                        return <RegisterView {...obj}/>
                    }} />
                </div>
            </div>
        )
    }
}