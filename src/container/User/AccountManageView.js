/**
 * Created by Liudq on 2019-08-06
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import accountManageStyle from './accountManageStyle.css';
import {userService} from "../../service/UserService";
import {ShowToastView} from "../../component/ShowToastView/ShowToastView";

export class AccountManageView extends Component{
    constructor(props) {
        super(props);
        this.resetInfo = {};
        this.state = {
            countDown:"获取验证码",
            isShowToast:false,
            toastText:""
        };
        this.phone = userService.user.getUserInfo().phone;
        this.hidePhone = this.phone.substr(0, 3) + "****" +this.phone.substr(7);
    }
    sendVCode(){
        if(this.state.countDown === "获取验证码"){
            this.startCountDown();
            userService.getVCode("resetPassword",this.phone)
        }

    }
    inputVCode(e){
        this.resetInfo.vCode = e.target.value
    }
    inputNewPsd(e){
        this.resetInfo.newPsd = e.target.value
    }
    inputVPsd(e){
        this.resetInfo.VPsd = e.target.value
    }
    confirmFixed(){
        if(this.resetInfo.VPsd !== this.resetInfo.newPsd){
            //  弹窗
            this.setState({
                isShowToast:true,
                toastText:"两次输入的密码不同"
            })
        }else{
            this.resetInfo.phoneNum = userService.user.getUserInfo().phone;
            userService.resetPassword(this.resetInfo).then(()=>{
                //  弹窗
                this.setState({
                    isShowToast:true,
                    toastText:"修改成功"
                })
            }).catch((msg)=>{
                this.setState({
                    isShowToast:true,
                    toastText:msg
                })
            })
        }
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
    hideToast(){
        this.setState({
            isShowToast:false,
        })
    }
    render() {
        return (
            <div className="account_manage">
                <div className="account_title">修改密码</div>
                <div className="account_change_psd">
                    {this.state.isShowToast?<ShowToastView
                        text={this.state.toastText}
                        showTime={1500}
                        hideToast={this.hideToast.bind(this)}
                        style={{position:"absolute",bottom:"4.8rem",left:"5rem"}}/>:null}
                    <ul className="account_change_psd_box">
                        <li className="account_item">
                            <div className="account_change_item_title">手机</div>
                            <div className="account_change_item_info">
                                <div className="account_change_item_info_phone_num">{this.hidePhone}</div>
                                <div className="account_change_item_info_send_v_code" onClick={this.sendVCode.bind(this)}>{this.state.countDown}</div>
                            </div>
                        </li>
                        <li className="account_item">
                            <div className="account_change_item_title"/>
                            <input placeholder="请输入手机验证码"
                                   className="account_change_item_input input_v_code"
                                   onChange={this.inputVCode.bind(this)}/>
                        </li>
                        <li className="account_item">
                            <div className="account_change_item_title">新密码</div>
                            <input type="password" placeholder="请输入新密码"
                                   autoComplete="new-password"
                                   className="account_change_item_input input_psd"
                                   onChange={this.inputNewPsd.bind(this)}/>
                        </li>
                        <li className="account_item">
                            <div className="account_change_item_title">确认密码</div>
                            <input placeholder="请确认新密码"
                                   type="password"
                                   className="account_change_item_input input_psd"
                                   onChange={this.inputVPsd.bind(this)}/>
                        </li>
                        <li className="confirm_fixed_psd">
                            <div className="account_change_item_title"/>
                            <a className="confirm_fixed_psd_btn" onClick={this.confirmFixed.bind(this)}>确认修改</a>
                        </li>
                    </ul>
                </div>
                <div className="account_title bind_wx_title">绑定微信</div>
                <ul className="account_change_wx_box">
                    <li className="account_item">
                        <div className="account_change_item_title">手机</div>
                        <div className="account_change_item_info">
                            <div className="account_change_item_info_phone_num">{this.hidePhone}</div>
                        </div>
                    </li>
                    <li className="account_item">
                        <div className="account_change_item_title">微信</div>
                        <a className="account_bind_wx_btn">绑定微信</a>
                    </li>
                </ul>
            </div>
        );
    }
}
