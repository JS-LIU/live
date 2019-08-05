/**
 * Created by Liudq on 2019-07-18
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import headerStyle from "./headerStyle.css";


export class HeaderView extends Component{
    constructor(props) {
        super(props);
    }

    showDialog(){

    }
    render() {
        console.log("render:--headerView",this.props.userInfo);
        return (
            <div className="common_header">
                <div className="common_header_center">
                    <div className="common_header_logo"/>
                    <div className="common_header_right">
                        <Link to="/" className="common_header_center_link_item">首页</Link>
                        <Link to="/selectCourseCenter" className="common_header_center_link_item">选课中心</Link>
                        <Link to="/studyCourseCenter" className="common_header_center_link_item">学习中心</Link>
                        <Link to="/codingCenter" className="common_header_center_link_item">创作中心</Link>
                        <Link to="/downLoad" className="common_header_center_link_item">软件下载</Link>
                        <Link className="common_header_login_info" onMouseEnter={this.showDialog}>
                            <div className="common_header_login_header_box">
                                <img src={this.props.userInfo.headImgUrl||"src/img/def_header_img.png"} alt="" className="common_header_login_header_pic"/>
                            </div>
                            <div className="common_header_login_user_name">{this.props.userInfo.nickName||"登录"}</div>
                            <div className="down_arrow"/>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}
