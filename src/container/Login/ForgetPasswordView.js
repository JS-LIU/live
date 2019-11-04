/**
 * Created by Liudq on 2019/8/27
 */

import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {userService} from "../../service/UserService";
import {HB} from "../../util/HB";
import forgetPasswordStyle from './forgetPasswordStyle.css';
import {ShowToastView} from "../../component/ShowToastView/ShowToastView";
var a = 0;
export class ForgetPasswordView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            countDown:"获取验证码",
            phoneNumStyle:{border:"0.01rem solid #ffffff"},
            passwordStyle:{border:"0.01rem solid #ffffff"},
            vCodeStyle:{border:"0.01rem solid #ffffff"},
            isShowToast:false,
            toastText:""
        };
        this.forgetInfo = {};
    }
    focusPhoneNum(){
        this.setState({
            phoneNumStyle:{border:"0.01rem solid #FFC200"},
        })
    }
    blurPhoneNum(){
        this.setState({
            phoneNumStyle:{border:"0.01rem solid #ffffff"},
        })
    }
    onInputPhoneNum(e){
        this.forgetInfo.phoneNum = e.target.value;
    }
    focusVCode(){
        this.setState({
            vCodeStyle:{border:"0.01rem solid #FFC200"},
        })
    }
    blurVCode(){
        this.setState({
            vCodeStyle:{border:"0.01rem solid #ffffff"},
        })
    }
    onInputVCode(e){
        this.forgetInfo.vCode = e.target.value;
    }
    focusPassword(){
        this.setState({
            passwordStyle:{border:"0.01rem solid #FFC200"},
        })
    }
    blurPassword(){
        this.setState({
            passwordStyle:{border:"0.01rem solid #ffffff"},
        })
    }
    onInputPassword(e){
        this.forgetInfo.newPsd = e.target.value;
    }
    getPwdVCode(){
        if(this.state.countDown === "获取验证码" && HB.valid.isPhoneAvailable(this.forgetInfo.phoneNum)){
            this.startCountDown();
            userService.getVCode("resetPassword",this.forgetInfo.phoneNum).then(()=>{

            }).catch((msg)=>{
                this.setState({
                    isShowToast:true,
                    toastText:msg
                })
            })
        }
    }
    hideToast(){
        this.setState({
            isShowToast:false,
        })
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
    resetPassword(){
        userService.resetPassword(this.forgetInfo).then(()=>{
            this.props.history.push("/login/login");
        })
    }
    render() {
        return (
            <div className="find_password_main">
                <div className="forget_wrap" />
                <div className="find_password_box">
                    {this.props.isShowToast?<ShowToastView
                        text={this.props.toastText}
                        showTime={1500}
                        hideToast={this.props.hideToast}
                        style={{position:"absolute",bottom:"0.8rem"}}/>:null}
                    <div className="find_password_link">
                        <Link to="/login/login" style={{color:"#00A0E5"}}>登录</Link>
                        <div>|</div>
                        <Link to="/login/register" style={{color:"#00A0E5"}}>注册</Link>
                    </div>
                    <div className="find_password_title">找回密码</div>
                    <ul className="find_password_list">
                       <li className="find_password_item">
                           <input
                               className="find_password_phone_num"
                               type="text"
                               placeholder="输入手机号"
                               onFocus={this.focusPhoneNum.bind(this)}
                               onBlur={this.blurPhoneNum.bind(this)}
                               onChange={this.onInputPhoneNum.bind(this)}/>
                       </li>
                        <li className="find_password_item">
                            <input
                                className="find_password_v_code"
                                type="text"
                                placeholder="输入验证码"
                                onFocus={this.focusVCode.bind(this)}
                                onBlur={this.blurVCode.bind(this)}
                                onChange={this.onInputVCode.bind(this)}/>
                            <div className="v_code_time" onClick={this.getPwdVCode.bind(this)}>{this.state.countDown}</div>
                        </li>
                        <li className="find_password_item">
                            <input
                                className="find_password_password"
                                type="password"
                                   placeholder="输入新密码"
                                   onFocus={this.focusPassword.bind(this)}
                                   onBlur={this.blurPassword.bind(this)}
                                   onChange={this.onInputPassword.bind(this)}/>
                        </li>
                    </ul>
                    <div className="login_btn" onClick={this.resetPassword.bind(this)}>修改密码</div>
                </div>
            </div>
        );
    }
}