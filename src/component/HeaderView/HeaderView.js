/**
 * Created by Liudq on 2019-07-18
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import headerStyle from "./headerStyle.css";
import {baseUrl} from "../../config/config";
import {userService} from "../../service/UserService";

export class HeaderView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isShowDialog:false
        }
    }

    onShowDialog(){
        this.setState({
            isShowDialog:true
        })
    }
    onHideDialog(){
        this.setState({
            isShowDialog:false
        })
    }
    toStudyCourseCenter(){
        if(userService.login.isLogin(userService.getUser())){
            this.props.history.push("/studyCourseCenter/week");
        }else{
            this.props.history.push("/login/login");
        }
    }
    logout(){
        window.location.href = "../index.html?redirect=login/login";
        localStorage.clear();
    }
    render() {
        return (
            <div className="common_header">
                <div className="common_header_center_box">
                    <div className="common_header_logo_title">
                        <div className="common_header_logo" />
                        <div className="common_header_title">{this.props.title}</div>
                    </div>

                    <div className="common_header_right">
                        <Link to="/home" className="common_header_center_link_item">首页</Link>
                        <Link to="/selectCourseCenter" className="common_header_center_link_item">选课中心</Link>
                        <a className="common_header_center_link_item"
                           onClick={this.toStudyCourseCenter.bind(this)}>学习中心</a>
                        <Link to="/downLoad" className="common_header_center_link_item">软件下载</Link>
                        <Link to={userService.login.isLogin(userService.getUser())?"/user/userInfo":"/login/login"}
                              className="common_header_login_info"
                              onMouseEnter={this.onShowDialog.bind(this)}>
                            <div className="common_header_login_header_box">
                                <img src={this.props.userInfo.headImgUrl} alt="" className="common_header_login_header_pic"/>
                            </div>
                            <div className="common_header_login_user_name">{this.props.userInfo.userName||"小松许"}</div>
                            <div className="down_arrow"/>
                        </Link>
                    </div>
                    {this.state.isShowDialog?<div className="login_info_toggle_list" onMouseLeave={this.onHideDialog.bind(this)}>
                        <Link to={userService.login.isLogin(userService.getUser())?"/user/userInfo":"/login/login"} className="login_info_toggle_list_item">个人中心</Link>
                        {userService.login.isLogin(userService.getUser())?<a onClick={this.logout.bind(this)} className="login_info_toggle_list_item">退出登录</a>:<Link to="/login/login" className="login_info_toggle_list_item">登录</Link>}
                    </div>:null}
                </div>

            </div>
        )
    }
}
