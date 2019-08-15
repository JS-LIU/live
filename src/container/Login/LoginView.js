/**
 * Created by Liudq on 2019-07-22
 */

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import {login} from "../../entity/Login";
import {userService} from "../../service/UserService";
import {FooterView} from "../../component/FooterView/FooterView";
import {LoginHeaderView} from '../../component/HeaderView/LoginHeaderView';
import loginStyle from './loginStyle.css';

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
                <div className="login_wrap"/>
                <LoginHeaderView />
                <div className="login_main">
                    <div className="login_right">
                        <div className="login_right_top">
                            <span>没有注册账号</span>
                            <Link to="/login/register" className="login_right_top_register_btn">注册账号</Link>
                        </div>
                        <div className="login_right_log">
                            <div className="login_right_log_way">
                                <Link to="/login/psdLogin">密码登录</Link>
                                <div className="login_seg">|</div>
                                <Link to="/login/verificationCodeLog">验证码登录</Link>
                            </div>
                            <div className="login_right_log_log">
                                <div className="login_right_log_log_phone_num">
                                    <input placeholder="请输入手机号" onChange={(e)=>this.inputPhoneNum(e)} className="login_phone_num_input"/>
                                </div>
                                <div className="login_right_log_log_password">
                                    <input type="password" placeholder="请输入密码" className="login_psd_num_input" onChange={(e)=>{
                                        this.inputPassword(e)
                                    }}/>
                                </div>
                            </div>
                            <div className="login_right_log_log_reset_psd">
                                <Link to="/login/resetPsd" className="login_right_log_log_reset_psd_btn">忘记密码</Link>
                            </div>
                            <div className="login_btn" onClick={this.login.bind(this)}>登录</div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
