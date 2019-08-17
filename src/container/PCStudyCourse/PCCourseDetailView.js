/**
 * Created by Liudq on 2019-08-17
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {courseService} from "../../service/CourseService";
import {OwnedCourseHeaderView} from "../OwnedCourseDetail/OwnedCourseHeaderView";
import PCCourseDetailStyle from "./pcCourseDetailStyle.css";
export class PCCourseDetailView extends Component{
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
        let OwnedCoursePlanNodes = this.state.ownedCourse.getCoursePlanList().map((coursePlanItem,index)=>{
            return (
                <div key={index} className="course_plan_item">
                    <div className="course_plan_item_info" >
                        <div className="course_plan_item_info_course_name" style={{background:"url('"+coursePlanItem.type.getTypeInfo().iconBackground +"') no-repeat left 0.04rem",backgroundSize:"0.25rem"}}>
                            {this.state.ownedCourse.courseName} | {coursePlanItem.sessionName}</div>
                        <div className="course_plan_item_info_course_start_time">{coursePlanItem.getShowTime()}</div>
                    </div>
                    <div className="pc_course_plan_item_right_pl_1">
                        <ul className="pc_course_week_course_material">
                            <li className="pc_course_week_course_material_item" style={{background:"url('"+coursePlanItem.preVideo.getPreVideoStatus().url+"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItem.preVideo.getPreVideoStatus().color}}>预习视频</li>
                            <li className="pc_course_week_course_material_item" style={{background:"url('"+coursePlanItem.courseware.getCourseWareStatus().url+"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItem.courseware.getCourseWareStatus().color}}>讲义</li>
                            <li className="pc_course_week_course_material_item" style={{background:"url('/src/img/home_work_cant.png') no-repeat top center",backgroundSize:"0.2rem",color:"#c7c7c7"}}>作业</li>
                        </ul>
                        <div className="pc_course_week_course_enter_box">
                            <div className="pc_course_week_course_enter_course" style={{background:coursePlanItem.learnStatus.getStatusInfo().background,color:coursePlanItem.learnStatus.getStatusInfo().pcColor}}>{coursePlanItem.learnStatus.getStatusInfo().pcName}</div>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className="pc_owned_course_plan_main">
                <div className="pc_owned_course_plan_list">
                    <OwnedCourseHeaderView ownedCourse={this.state.ownedCourse}/>
                    {OwnedCoursePlanNodes}
                </div>
            </div>
        );
    }
}