/**
 * Created by Liudq on 2019-08-22
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import loginStyle from './loginStyle.css';
import {HB} from "../../util/HB";
export class LoginView extends Component{
    constructor(props) {
        super(props);
        this.state={
            countDown:"获取验证码",
            phoneNumStyle:{border:"0.01rem solid #ffffff"},
            passwordStyle:{border:"0.01rem solid #ffffff"},
            loginByPsd:true
        }
    }
    //  登录
    login(){
        this.props.login();
    }
    inputPhoneNum(e){
        this.phoneNum = e.target.value;
        this.props.inputPhoneNum(e.target.value);
    }
    inputPassword(e) {
        this.props.inputPassword(e.target.value)
    }
    onPhoneNumBlur(){
        this.setState({
            phoneNumStyle:{border:"0.01rem solid #ffffff"}
        })
    }
    onPhoneNumFocus(){
        this.setState({
            phoneNumStyle:{border:"0.01rem solid #FFC200"},
        })
    }
    onPasswordFocus(){
        this.setState({
            passwordStyle:{border:"0.01rem solid #FFC200"},
        })
    }
    onPasswordBlur(){
        this.setState({
            passwordStyle:{border:"0.01rem solid #ffffff"}
        })
    }
    onLoginByPsd(){
        this.setState({
            loginByPsd:true
        })
    }
    onLoginByVCode(){
        this.setState({
            loginByPsd:false
        })
    }
    getLoginVCode(){
        if(this.state.countDown === "获取验证码" && HB.valid.isPoneAvailable(this.phoneNum)){
            this.startCountDown();
            this.props.getLoginVCode();
        }
    }
    inputVCode(e){
        this.props.inputVCode(e.target.value);
    }
    startCountDown(){
        let startTime = 60;
        let t = setInterval(()=>{
            startTime--;
            this.setState({
                countDown:startTime+"s后重新获取"
            });
            if(startTime === 0){
                startTime = 60;
                this.setState({
                    countDown:"获取验证码"
                });
                clearInterval(t);
            }
        },1000)
    }
    vCodeLogin(){
        this.props.vCodeLogin();
    }

    render() {
        return (
            <div className="login_right">
                <div className="login_right_top">
                    <span>没有注册账号</span>
                    <Link to="/login/register" className="login_right_top_register_btn">注册账号</Link>
                </div>
                <div className="login_right_log">
                    <div className="login_right_log_way">
                        <div className="login_right_log_way_title"
                             onClick={this.onLoginByPsd.bind(this)}
                             style={this.state.loginByPsd?{color:"#000000"}:{}}>密码登录</div>
                        <div className="login_seg">|</div>
                        <div className="login_right_log_way_title"
                             onClick={this.onLoginByVCode.bind(this)}
                             style={this.state.loginByPsd?{}:{color:"#000000"}}>验证码登录</div>
                    </div>
                    <div className="login_right_log_log">
                        <div className="login_right_log_log_phone_num" style={this.state.phoneNumStyle}>
                            <input placeholder="请输入手机号"
                                   onBlur={this.onPhoneNumBlur.bind(this)}
                                   onFocus={this.onPhoneNumFocus.bind(this)}
                                   onChange={(e)=>this.inputPhoneNum(e)}
                                   className="login_phone_num_input"/>
                        </div>
                        {this.state.loginByPsd?<div className="login_right_log_log_password" style={this.state.passwordStyle}>
                            <input type="password"
                                   placeholder="请输入密码"
                                   className="login_psd_num_input"
                                   onChange={(e)=>{this.inputPassword(e)}}
                                   onBlur={this.onPasswordBlur.bind(this)}
                                   onFocus={this.onPasswordFocus.bind(this)} autoComplete="new-password"/>
                        </div>:<div className="register_right_register_v_code" style={this.state.passwordStyle}>
                            <input type="text"
                                   className="register_v_code_input"
                                   onChange={this.inputVCode.bind(this)}
                                   placeholder="验证码"
                                   onBlur={this.onPasswordBlur.bind(this)}
                                   onFocus={this.onPasswordFocus.bind(this)}/>
                            <div className="v_code_time" onClick={this.getLoginVCode.bind(this)}>{this.state.countDown}</div>
                        </div>}

                    </div>
                    <div className="login_right_log_log_reset_psd">
                        <Link to="/forgetPassword" className="login_right_log_log_reset_psd_btn">忘记密码</Link>
                    </div>
                    {this.state.loginByPsd?
                        <div className="login_btn" onClick={this.login.bind(this)}>登录</div>:
                        <div className="login_btn" onClick={this.vCodeLogin.bind(this)}>登录</div>}
                </div>
            </div>
        );
    }
}