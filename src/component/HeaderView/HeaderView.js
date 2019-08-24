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
    }

    showDialog(){

    }
    toStudyCourseCenter(){
        if(userService.login.isLogin(userService.getUser())){
            this.props.history.push("/studyCourseCenter/week");
        }else{
            this.props.history.push("/login/login");
        }
    }
    render() {
        return (
            <div className="common_header">
                <div className="common_header_center">
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
                        <Link to={userService.login.isLogin(userService.getUser())?"/user/userInfo":"/login/login"} className="common_header_login_info" onMouseEnter={this.showDialog}>
                            <div className="common_header_login_header_box">
                                <img src={userService.getUser().userInfo.headImgUrl} alt="" className="common_header_login_header_pic"/>
                            </div>
                            <div className="common_header_login_user_name">{userService.getUser().userInfo.userName||"小松许"}</div>
                            <div className="down_arrow"/>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}
