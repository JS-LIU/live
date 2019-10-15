/**
 * Created by Liudq on 2019-08-10
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {courseService} from "../../service/CourseService";
import {OwnedCourseHeaderView} from "./OwnedCourseHeaderView";
import {MyCourseHeaderView} from "../../component/HeaderView/MyCourseHeaderView";
import {userService} from "../../service/UserService";
import {HB} from '../../util/HB'
import myOwnedCourseDetailStyle from './ownedCourseDetailStyle.css';

export class OwnedCourseDetailView extends Component{
    constructor(props) {
        super(props);
        this.courseItemId = this.props.match.params.id;
        this.state = {
            ownedCourse:null
        }
    }
    componentDidMount() {
        courseService.getOwnedCourseDetail(this.courseItemId).then((ownedCourse)=>{
            this.setState({
                ownedCourse:ownedCourse
            })
        });
    }
    render() {
        if(!this.state.ownedCourse){
            return null;
        }
        let OwnedCoursePlanNodes = courseService.getOwnedCoursePlanItemListByDetail(this.courseItemId).map((coursePlanItem,index)=>{
            let coursePlanItemModule = coursePlanItem.getModule.before((repairParam)=>{
                repairParam.startTime = coursePlanItem.coursePlanItem.getShowTime("unix");
            }).call(coursePlanItem,{});
            return (
                <div key={index} className="course_plan_item">
                    <div className="course_plan_item_info" >
                        <div className="course_plan_item_info_course_name"
                             style={{background:"url('"+coursePlanItemModule.type.iconBackground +"') no-repeat left center",backgroundSize:"0.25rem"}}>
                            {coursePlanItemModule.courseName} | {coursePlanItemModule.name}</div>
                        <div className="course_plan_item_info_course_start_time">{coursePlanItemModule.startTime}</div>
                    </div>
                    <Link to="/downLoad" className="course_down_load_title">
                        下载客户端上课 >
                    </Link>
                </div>
            )
        });
        let ownedCourseModule = this.state.ownedCourse.getModule.before((repairParam)=>{
            repairParam = repairParam || {};
            repairParam.startTime = this.state.ownedCourse.courseInfo.getStartTimeToShow("unix");
            repairParam.endTime = this.state.ownedCourse.courseInfo.getEndTimeToShow("unix");
        }).call(this.state.ownedCourse,{});
        return (
            <div>
                <div className="wrap" />
                <MyCourseHeaderView userInfo={userService.user.getUserInfo()}/>
                <div className="owned_course_plan_main">
                    <div className="crumbs">
                        首页 > 我的课程 > {this.state.ownedCourse.courseName}
                    </div>
                    <div className="owned_course_plan_list">
                        <OwnedCourseHeaderView ownedCourseModule={ownedCourseModule}/>
                        {OwnedCoursePlanNodes}
                    </div>
                </div>
            </div>
        );
    }
}