/**
 * Created by Liudq on 2019-08-22
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import loginStyle from './loginStyle.css';
export class LoginView extends Component{
    constructor(props) {
        super(props);
        this.state={
            phoneNumStyle:{border:"0.01rem solid #ffffff"},
            passwordStyle:{border:"0.01rem solid #ffffff"}
        }
    }
    //  登录
    login(){
        this.props.login();
    }
    inputPhoneNum(e){
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
    render() {
        return (
            <div className="login_right">
                <div className="login_right_top">
                    <span>没有注册账号</span>
                    <Link to="/login/register" className="login_right_top_register_btn">注册账号</Link>
                </div>
                <div className="login_right_log">
                    <div className="login_right_log_way">
                        <Link to="/login/login">密码登录</Link>
                        <div className="login_seg">|</div>
                        <Link to="/login/verificationCodeLog">验证码登录</Link>
                    </div>
                    <div className="login_right_log_log">
                        <div className="login_right_log_log_phone_num" style={this.state.phoneNumStyle}>
                            <input placeholder="请输入手机号"
                                   onBlur={this.onPhoneNumBlur.bind(this)}
                                   onFocus={this.onPhoneNumFocus.bind(this)}
                                   onChange={(e)=>this.inputPhoneNum(e)}
                                   className="login_phone_num_input"/>
                        </div>
                        <div className="login_right_log_log_password" style={this.state.passwordStyle}>
                            <input type="password"
                                   placeholder="请输入密码"
                                   className="login_psd_num_input"
                                   onChange={(e)=>{this.inputPassword(e)}}
                                   onBlur={this.onPasswordBlur.bind(this)}
                                   onFocus={this.onPasswordFocus.bind(this)}/>
                        </div>
                    </div>
                    <div className="login_right_log_log_reset_psd">
                        <Link to="/login/resetPsd" className="login_right_log_log_reset_psd_btn">忘记密码</Link>
                    </div>
                    <div className="login_btn" onClick={this.login.bind(this)}>登录</div>
                </div>
            </div>
        );
    }
}