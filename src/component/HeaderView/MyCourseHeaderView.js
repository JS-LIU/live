/**
 * Created by Liudq on 2019-08-08
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import headerStyle from "./headerStyle.css";
export class MyCourseHeaderView extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="common_header">
                <div className="common_header_center_box">
                    <div className="common_header_logo"/>
                    <div className="common_header_right">
                        <Link to="/home" className="common_header_center_link_item">首页</Link>
                        <Link to="/studyCourseCenter/week" className="common_header_center_link_item">本周课程</Link>
                        <Link to="/studyCourseCenter/myCourseList" className="common_header_center_link_item">我的课程</Link>
                        <Link to="/user/userInfo" className="common_header_login_info" onMouseEnter={this.showDialog}>
                            <div className="common_header_login_header_box">
                                <img src={this.props.userInfo.headImgUrl||"src/img/def_header_img.png"} alt="" className="common_header_login_header_pic"/>
                            </div>
                            <div className="common_header_login_user_name">{this.props.userInfo.userName}</div>
                            <div className="down_arrow"/>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }


}