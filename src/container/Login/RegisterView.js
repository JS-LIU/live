/**
 * Created by Liudq on 2019-08-22
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import registerStyle from './registerStyle.css';
import {HB} from "../../util/HB";
import {CountDownView} from "../../component/CountDown/CountDownView";
import {ShowToastView} from "../../component/ShowToastView/ShowToastView";

export class RegisterView extends Component{
    constructor(props) {
        super(props);
        this.vcode = "";
        this.phoneNum = "";
        this.password = "";
        this.state = {
            // countDown:"获取验证码",
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
        this.props.register({
            phoneNum:this.phoneNum,
            password:this.password,
            vcode:this.vcode
        });
    }
    inputPhoneNum(e){
        this.phoneNum = e.target.value;
    }
    inputPassword(e) {
        this.password = e.target.value;
    }
    inputVCode(e){
        this.vcode = e.target.value;
    }
    render() {
        return (
            <div className="register_right">
                <div className="register_right_top">
                    <span>已有账号？请</span>
                    <Link to="/login/login" className="register_right_top_register_btn">登录</Link>
                </div>
                <div className="register_right_log">
                    <div className="register_right_log_way">注册未科编程</div>
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
                            <CountDownView
                                clickHandle={()=>{
                                    this.props.getVCode("register",this.phoneNum)
                                }}
                                startCondition={()=>{return new Promise((resolve, reject)=>{
                                    if(HB.valid.isPhoneAvailable(this.phoneNum)){
                                        resolve();
                                    }else{
                                        this.props.showToast("请输入正确的手机号")
                                    }
                                })}}
                                initText={"获取验证码"}
                                countDownText={"秒后重新获取"}
                                totalSec={60}/>
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
                {this.props.isShowToast?<ShowToastView
                    text={this.props.toastText}
                    showTime={1500}
                    hideToast={this.props.hideToast}
                    style={{position:"absolute",bottom:"0.6rem"}}/>:null}
            </div>
        );
    }
}