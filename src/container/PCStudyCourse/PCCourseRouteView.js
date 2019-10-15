/**
 * Created by Liudq on 2019-08-16
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import pcCourseRouteStyle from './pcCourseRouteStyle.css';
import {baseUrl} from "../../config/config";
import {userService} from "../../service/UserService";
export class PCCourseRouteView extends Component{
    constructor(props) {
        super(props);
        this.userInfo = userService.user.getUserInfo().getModule();
    }
    switchActiveBar(navBarItem){
        return ()=>{
            this.props.switchActiveBar(navBarItem);
            navBarItem.action();
        };

    }
    render() {
        let navBarNodes = this.props.navBarList.map((navBarItem,index)=>{
            return (
                <Link
                    key={index}
                    to={navBarItem.link}
                    onClick={this.switchActiveBar(navBarItem)}
                    className="PC_course_route_item"
                    style={navBarItem.select?{background:"#FFC200"}:{}}>
                    <div
                        className="PC_course_route_item_text"
                        style={navBarItem.select?{background:navBarItem.activeBackground,backgroundSize:"0.25rem",color:"#FFF"}:{background:navBarItem.background,backgroundSize:"0.25rem"}}>
                        {navBarItem.name}
                    </div>
                </Link>
            )
        });
        return (
            <div className="PC_course_route">
                <div>
                    <Link to="/studyCourseCenter/userInfo" className="PC_course_route_header_item">
                        <div className="PC_course_route_header">
                            <img src={this.userInfo.headImgUrl} alt="" className="PC_course_route_header_pic"/>
                        </div>
                        <div className="PC_course_route_header_name">{this.props.userName}</div>
                        <div className="PC_course_route_account">{this.userInfo.userReward}</div>
                    </Link>
                    {navBarNodes}
                </div>
                <div className="logout_btn"
                     onClick={()=>{
                         window.UserExit();
                     }}>退出</div>
            </div>
        );
    }
}