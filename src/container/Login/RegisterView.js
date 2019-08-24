/**
 * Created by Liudq on 2019-08-22
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import registerStyle from './registerStyle.css';

export class RegisterView extends Component{
    constructor(props) {
        super(props);
    }
    register(){
        this.props.register();
    }
    inputPhoneNum(e){
        this.props.inputPhoneNum(e.target.value);
    }
    inputPassword(e) {
        this.props.inputPassword(e.target.value)
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
                        <div className="register_right_log_log_phone_num">
                            <input placeholder="请输入手机号" onChange={(e)=>this.inputPhoneNum(e)} className="register_phone_num_input"/>
                        </div>
                        <div className="register_right_log_log_password">
                            <input type="password" placeholder="请输入密码" className="register_psd_num_input" onChange={(e)=>{
                                this.inputPassword(e)
                            }}/>
                        </div>
                    </div>
                    <div className="register_right_log_log_reset_psd">
                        <Link to="/login/resetPsd" className="register_right_log_log_reset_psd_btn">忘记密码</Link>
                    </div>
                    <div className="register_btn" onClick={this.register.bind(this)}>注册</div>
                </div>
            </div>
        );
    }
}