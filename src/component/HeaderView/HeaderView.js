/**
 * Created by Liudq on 2019-07-18
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import headerStyle from "./headerStyle.css";
import {baseUrl} from "../../config/config";
import {userService} from "../../service/UserService";
import {HB} from "../../util/HB";

export class HeaderView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isShowDialog:false,
            pathname:this.props.history.location.pathname
        };
        this.isShowDialog = false;
    }
    componentDidMount() {
        this.state = {
            pathname:this.props.history.location.pathname
        };
    }

    onShowDialog(){
        this.isShowDialog = true;
        if(userService.login.isLogin()){
            this.setState({
                isShowDialog:true
            })
        }
    }
    onHideDialog(){
        this.isShowDialog = false;
        this.setState({
            isShowDialog:false
        });
    }
    onDelayHide(){
        this.isShowDialog = false;
        setTimeout(()=>{
            if(!this.isShowDialog){
                this.setState({
                    isShowDialog:false
                });
            }
        },200);
    }
    toStudyCourseCenter(){
        if(userService.login.isLogin()){
            this.props.history.push("/studyCourseCenter/week");
        }else{
            this.props.history.push("/login/login?redirect=/studyCourseCenter/week");
        }
    }
    logout(){
        localStorage.clear();
        HB.save.setStorage({redirect:"login/login"});
        window.location.href = baseUrl.getBaseUrl()+"/index.html";
    }
    setActive(path){
        return ()=>{
            this.state = {
                pathname:path
            };
            this.props.history.push(path);
        }
    }
    render() {
        return (
            <div className="common_header" style={this.props.headerStyle}>
                <div className="common_header_center_box">
                    <div className="common_header_logo_title">
                        <div className="common_header_logo" />
                        <div className="common_header_title">{this.props.title}</div>
                    </div>

                    <div className="common_header_right">
                        <div className={`common_header_center_link_item ${this.state.pathname==="/home"?"active_link_item":null}`} onClick={this.setActive("/home")}>首页</div>
                        <div className={`common_header_center_link_item ${this.state.pathname==="/selectCourseCenter"?"active_link_item":null}`} onClick={this.setActive("/selectCourseCenter")}>选课中心</div>
                        <div className={`common_header_center_link_item ${this.state.pathname==="/downLoad"?"active_link_item":null}`} onClick={this.setActive("/downLoad")}>软件下载</div>
                        <Link to={userService.login.isLogin()?"/user/userInfo":"/login/login"}
                              className="common_header_login_info"
                              onMouseLeave={this.onDelayHide.bind(this)}
                              onMouseEnter={this.onShowDialog.bind(this)}>
                            <div className="common_header_login_header_box">
                                <img src={this.props.userInfo.headImgUrl} alt="" className="common_header_login_header_pic"/>
                            </div>
                            <div className="common_header_login_user_name">{userService.login.isLogin()?(this.props.userInfo.userName||"未科学员"):"登录"}</div>
                            <div className="down_arrow"/>
                        </Link>
                    </div>
                    {this.state.isShowDialog?<div className="login_info_toggle_list"
                                                  onMouseLeave={this.onHideDialog.bind(this)}
                                                  onMouseEnter={this.onShowDialog.bind(this)}>
                        <Link to={"/user/userInfo"} className="login_info_toggle_list_item" style={{paddingTop:"0.1rem"}}>个人中心</Link>
                        <Link to={"/studyCourseCenter/week"} className="login_info_toggle_list_item"
                              onClick={this.toStudyCourseCenter.bind(this)}>学习中心</Link>
                        <div onClick={this.logout.bind(this)}
                             className="login_info_toggle_list_item">退出登录</div>
                    </div>:null}

                </div>

            </div>
        )
    }
}
