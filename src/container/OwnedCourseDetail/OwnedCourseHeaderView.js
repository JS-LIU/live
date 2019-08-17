/**
 * Created by Liudq on 2019-08-10
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {RingProgressView} from "../../component/RingProgress/RingProgressView";
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";

export class OwnedCourseHeaderView extends Component{
    constructor(props) {
        super(props);
    }
    courseProgressRender(){
        return (
            <div className="course_progress">
                <div className="course_progress_num">{this.props.ownedCourse.finishLessonNum} / {this.props.ownedCourse.totalLessonNum}</div>
                <div className="course_progress_title">课程进度</div>
            </div>
        )
    }
    render() {
        return (
            <div className="owned_course_plan_header" style={{background:this.props.ownedCourse.type.getTypeInfo().background}}>
                <img src={this.props.ownedCourse.type.getTypeInfo().url} alt="" className="owned_course_plan_header_bg" />
                <div className="owned_course_plan_header_course_plan_item_info">
                    <div className="owned_course_plan_header_course_plan_item_info_top">
                        <div className="owned_course_plan_header_course_plan_item_info_top_name">{this.props.ownedCourse.courseName}</div>
                        <CourseTimeShowView
                            style={{
                                display:"flex",
                                flexDirection: "row",
                                fontSize: "0.12rem",
                                color:"#FFFFFF",
                                marginTop: "0.15rem"
                            }}
                            showTimeStepEnd={true}
                            timeType={"common"}
                            timeStep={this.props.ownedCourse.timeList}
                            startTime={this.props.ownedCourse.startTime}
                            endTime={this.props.ownedCourse.endTime}
                        />
                    </div>
                    <div className="owned_course_plan_header_course_plan_item_info_bottom">
                        <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info">
                            <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_header">
                                <img src={this.props.ownedCourse.teacherInfo.headImgUrl||"/src/img/def_header_img.png"} className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_header_pic" alt=""/>
                            </div>
                            <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_name">
                                <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_name_title">教师</div>
                                <div>{this.props.ownedCourse.teacherInfo.teacherName}</div>
                            </div>
                        </div>
                        <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info">
                            <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_header">
                                <img src={this.props.ownedCourse.assistantInfo.headImgUrl||"/src/img/def_header_img.png"} className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_header_pic" alt=""/>
                            </div>
                            <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_name">
                                <div className="owned_course_plan_header_course_plan_item_info_bottom_teacher_info_name_title">助教</div>
                                <div>{this.props.ownedCourse.assistantInfo.teacherName||"暂未分配"}</div>
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
                        progressBorderBg={"rgba(220,255,234,1)"}
                        nowProgress={this.props.ownedCourse.finishLessonNum}
                        totalProgress={this.props.ownedCourse.totalLessonNum}
                        innerRender={this.courseProgressRender()}
                    />
                </div>

            </div>
        );
    }
}
