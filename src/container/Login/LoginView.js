/**
 * Created by Liudq on 2019-08-22
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import loginStyle from './loginStyle.css';
import {HB} from "../../util/HB";
import {CountDownView} from "../../component/CountDown/CountDownView";
import {ShowToastView} from "../../component/ShowToastView/ShowToastView";
export class LoginView extends Component{
    constructor(props) {
        super(props);
        this.phoneNum = "";
        this.vcode = "";
        this.password = "";
        this.state={
            phoneNumStyle:{border:"0.01rem solid #ffffff"},
            passwordStyle:{border:"0.01rem solid #ffffff"},
            phoneNum:this.phoneNum,
            password:this.password,
            signWay:this.props.signWay,
            loginByPsd:true
        }
    }
    componentDidMount() {
        if(this.state.signWay === "signByPassword"){
            this.setState({
                loginByPsd:true,
            })
        }else{
            this.setState({
                loginByPsd:false,
            })
        }
    }

    //  登录
    login(){
        if(!HB.valid.isPhoneAvailable(this.phoneNum)){
            this.props.showToast("请输入正确的手机号")
        }else{
            this.props.login(this.state.signWay,{
                phoneNum:this.phoneNum,
                password:this.password,
                vcode:this.vcode
            });
        }

    }
    inputPhoneNum(e){
        this.phoneNum = e.target.value;
        this.setState({
            phoneNum:this.phoneNum
        })
    }
    inputPassword(e) {
        // this.props.inputPassword(e.target.value);
        this.password = e.target.value;
        this.setState({
            password:this.password
        })
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
    cutSignWay(signWay){
        return ()=>{
            this.resetInitParam();
            this.props.cutSignWay(signWay);
        };

    }
    resetInitParam(){
        this.phoneNum = "";
        this.vcode = "";
        this.password = "";
        this.setState({
            phoneNum:this.phoneNum,
            password:this.password,
            vcode:this.vcode
        })
    }

    inputVCode(e){
        this.vcode = e.target.value;
        this.setState({
            vcode:this.vcode
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
                        <div className="login_right_log_way_title"
                             onClick={this.cutSignWay("signByPassword")}
                             style={this.state.loginByPsd?{color:"#000000"}:{}}>密码登录</div>
                        <div className="login_seg">|</div>
                        <div className="login_right_log_way_title"
                             onClick={this.cutSignWay("signByVCode")}
                             style={this.state.loginByPsd?{}:{color:"#000000"}}>验证码登录</div>
                    </div>
                    <div className="login_right_log_log">
                        <div className="login_right_log_log_phone_num" style={this.state.phoneNumStyle}>
                            <input placeholder="请输入手机号"
                                   onBlur={this.onPhoneNumBlur.bind(this)}
                                   onFocus={this.onPhoneNumFocus.bind(this)}
                                   onChange={(e)=>this.inputPhoneNum(e)}
                                   className="login_phone_num_input"
                                   value={this.state.phoneNum}/>
                        </div>
                        {this.state.loginByPsd?<div className="login_right_log_log_password" style={this.state.passwordStyle}>
                            <input type="password"
                                   placeholder="请输入密码"
                                   className="login_psd_num_input"
                                   onChange={(e)=>{this.inputPassword(e)}}
                                   onBlur={this.onPasswordBlur.bind(this)}
                                   onFocus={this.onPasswordFocus.bind(this)}
                                   autoComplete="new-password"
                                   value={this.state.password}/>
                        </div>:<div className="register_right_register_v_code" style={this.state.passwordStyle}>
                            <input type="text"
                                   className="register_v_code_input"
                                   onChange={this.inputVCode.bind(this)}
                                   placeholder="验证码"
                                   onBlur={this.onPasswordBlur.bind(this)}
                                   onFocus={this.onPasswordFocus.bind(this)}
                                   value={this.state.vcode}/>
                           <CountDownView
                               clickHandle={()=>{
                                   this.props.getVCode("login",this.phoneNum);
                               }}
                               startCondition={()=>{return new Promise((resolve, reject)=>{
                                   if(HB.valid.isPhoneAvailable(this.phoneNum)){
                                       resolve();
                                   }else{
                                       reject()
                                   }
                               })}}
                               initText={"获取验证码"}
                               countDownText={"秒后重新获取"}
                               totalSec={60}/>
                        </div>}

                    </div>
                    <div className="login_right_log_log_reset_psd">
                        <Link to="/forgetPassword" className="login_right_log_log_reset_psd_btn">忘记密码</Link>
                    </div>
                    <div className="login_btn" onClick={this.login.bind(this)}>登录</div>
                </div>
                {this.props.isShowToast?<ShowToastView
                    text={this.props.toastText}
                    showTime={1500}
                    hideToast={this.props.hideToast}
                    style={{position:"absolute",bottom:"0.8rem"}}/>:null}
            </div>
        );
    }
}