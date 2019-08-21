/**
 * Created by Liudq on 2019-08-16
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import pcCourseRouteStyle from './pcCourseRouteStyle.css';
export class PCCourseRouteView extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="PC_course_route">
                <Link to="/studyCourseCenter/userInfo" className="PC_course_route_header_item">
                    <div className="PC_course_route_header">
                        <img src={this.props.userInfo.headImgUrl || "src/img/def_header_img.png"} alt="" className="PC_course_route_header_pic"/>
                    </div>
                    <div className="PC_course_route_header_name">{this.props.userInfo.userName||this.props.userInfo.nickName}</div>
                    <div className="PC_course_route_account">账户余额：300</div>
                </Link>
                <Link to="/studyCourseCenter/week" className="PC_course_route_item">本周课程</Link>
                <Link to="/studyCourseCenter/myCourseList" className="PC_course_route_item">我的课程</Link>
                <Link to="/studyCourseCenter/coding" className="PC_course_route_item">创作中心</Link>
                <Link to="/studyCourseCenter/select" className="PC_course_route_item">选课中心</Link>
            </div>
        );
    }

}