/**
 * Created by Liudq on 2019-08-10
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {RingProgressView} from "../../component/RingProgress/RingProgressView";
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";
import {baseUrl} from "../../config/config";

export class OwnedCourseHeaderView extends Component{
    constructor(props) {
        super(props);
    }
    courseProgressRender(){
        return (
            <div className="course_progress">
                <div className="course_progress_num">{this.props.ownedCourseModule.finishLessonNum} / {this.props.ownedCourseModule.totalLessonNum}</div>
                <div className="course_progress_title">课程进度</div>
            </div>
        )
    }
    render() {
        return (
            <div className="owned_course_plan_header" style={{background:this.props.ownedCourseModule.type.background}}>
                <img src={this.props.ownedCourseModule.type.url} alt="" className="owned_course_plan_header_bg" />
                <div className="owned_course_plan_header_course_plan_item_info">
                    <div className="owned_course_plan_header_course_plan_item_info_top">
                        <div className="owned_course_plan_header_course_plan_item_info_top_name">{this.props.ownedCourseModule.courseName}</div>
                        <CourseTimeShowView
                            style={{
                                display:"flex",
                                flexDirection: "row",
                                fontSize: "0.12rem",
                                color:"#FFFFFF",
                                marginTop: "0.15rem"
                            }}
                            showTimeStepEnd={true}
                            timeStep={this.props.ownedCourseModule.timeList}
                            startTime={this.props.ownedCourseModule.startTime}
                            endTime={this.props.ownedCourseModule.endTime}
                        />
                    </div>
                    <div className="owned_course_plan_header_course_plan_item_info_bottom">
                        <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info">
                            <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_header">
                                <img src={this.props.ownedCourseModule.teacherInfo.headImgUrl} className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_header_pic" alt=""/>
                            </div>
                            <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_name">
                                <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_name_title">教师</div>
                                <div>{this.props.ownedCourseModule.teacherInfo.teacherName}</div>
                            </div>
                        </div>
                        <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info">
                            <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_header">
                                <img src={this.props.ownedCourseModule.assistantInfo.headImgUrl} className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_header_pic" alt=""/>
                            </div>
                            <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_name">
                                <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_name_title">助教</div>
                                <div>{this.props.ownedCourseModule.assistantInfo.teacherName}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="owned_course_plan_header_course_plan_item_right">
                    <RingProgressView
                        unit={"rem"}
                        size={"0.88"}
                        borderWidth={"0.06"}
                        borderBg={"rgba(255,255,255,1)"}
                        progressBorderBg={"#96d874"}
                        nowProgress={this.props.ownedCourseModule.finishLessonNum}
                        totalProgress={this.props.ownedCourseModule.totalLessonNum}
                        innerRender={this.courseProgressRender()}
                    />
                </div>

            </div>
        );
    }
}
