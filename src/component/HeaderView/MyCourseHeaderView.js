/**
 * Created by Liudq on 2019-08-08
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import headerStyle from "./headerStyle.css";
export class MyCourseHeaderView extends Component{
    constructor(props) {
        super(props);
        this.state={
            pathname:this.props.history.location.pathname
        }
    }
    componentDidMount() {
        this.state={
            pathname:this.props.history.location.pathname
        }
    }

    setActive(path){
        return () => {
            this.setState({
                pathname:path
            });
            this.props.history.push(path);
        }
    }
    render() {
        return (
            <div className="common_header">
                <div className="common_header_center_box">
                    <div className="common_header_logo"/>
                    <div className="common_header_right">
                        <div className={`common_header_center_link_item ${this.state.pathname==="/home"?"active_link_item":null}`} onClick={this.setActive("/home")}>首页</div>
                        <div className={`common_header_center_link_item ${this.state.pathname==="/studyCourseCenter/week"?"active_link_item":null}`} onClick={this.setActive("/studyCourseCenter/week")}>本周课程</div>
                        <div className={`common_header_center_link_item ${this.state.pathname==="/studyCourseCenter/myCourseList"?"active_link_item":null}` } onClick={this.setActive("/studyCourseCenter/myCourseList")}>我的课程</div>
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