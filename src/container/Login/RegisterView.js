/**
 * Created by Liudq on 2019-08-22
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import registerStyle from './registerStyle.css';
import {HB} from "../../util/HB";

export class RegisterView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            countDown:"获取验证码",
            phoneNumStyle:{border:"0.01rem solid #ffffff"},
            passwordStyle:{border:"0.01rem solid #ffffff"},
            vCodeStyle:{border:"0.01rem solid #ffffff"},
        };
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
    onVCodeFocus(){
        this.setState({
            vCodeStyle:{border:"0.01rem solid #FFC200"},
        })
    }
    onVCodeBlur(){
        this.setState({
            vCodeStyle:{border:"0.01rem solid #ffffff"}
        })
    }
    register(){
        this.props.register();
    }
    inputPhoneNum(e){
        this.phoneNum = e.target.value;
        this.props.inputPhoneNum(e.target.value);
    }
    inputPassword(e) {
        this.props.inputPassword(e.target.value)
    }
    getVCode(){
        if(this.state.countDown === "获取验证码" && HB.valid.isPoneAvailable(this.phoneNum)){
            this.startCountDown();
            this.props.getRegisterVCode();
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
    render() {
        return (
            <div className="register_right">
                <div className="register_right_top">
                    <span>已有账号？请</span>
                    <Link to="/login/login" className="register_right_top_register_btn">登录</Link>
                </div>
                <div className="register_right_log">
                    <div className="register_right_log_way">注册松鼠编程</div>
                    <div className="register_right_log_log">
                        <div className="register_right_log_log_phone_num" style={this.state.phoneNumStyle}>
                            <input
                                placeholder="请输入手机号"
                                onChange={(e)=>this.inputPhoneNum(e)}
                                className="register_phone_num_input"
                                onFocus={this.onPhoneNumFocus.bind(this)}
                                onBlur={this.onPhoneNumBlur.bind(this)}
                            />
                        </div>
                        <div className="register_right_register_v_code" style={this.state.vCodeStyle}>
                                <input type="text"
                                       className="register_v_code_input"
                                       onChange={this.inputVCode.bind(this)}
                                       placeholder="验证码"
                                       onFocus={this.onVCodeFocus.bind(this)}
                                       onBlur={this.onVCodeBlur.bind(this)}/>
                                <div className="v_code_time" onClick={this.getVCode.bind(this)}>{this.state.countDown}</div>
                        </div>
                        <div className="register_right_log_log_password" style={this.state.passwordStyle}>
                            <input type="password"
                                   autoComplete="new-password"
                                   placeholder="请输入密码"
                                   className="register_psd_num_input"
                                   onChange={(e)=>{this.inputPassword(e)}}
                                   onFocus={this.onPasswordFocus.bind(this)}
                                   onBlur={this.onPasswordBlur.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="register_right_log_log_reset_psd">
                        <Link to="/forgetPassword" className="register_right_log_log_reset_psd_btn">忘记密码</Link>
                    </div>
                    <div className="register_btn" onClick={this.register.bind(this)}>注册</div>
                </div>
            </div>
        );
    }
}