/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {CalenderView} from "../../component/CalenderView";
import {weekCourseData} from "./WeekCourseData";
import {courseService} from "../../service/CourseService";
import {TimeManager} from "../../entity/TimeManager";
import weekCourseStyle from './weekCourseStyle.css';
import {userService} from "../../service/UserService";
import {HB} from "../../util/HB";

export class WeekCourseView extends Component{

    constructor(props){
        super(props);
        this.state = {
            courseList:[]
        }
    }
    updateOwnedCourseList(){
        courseService.pagination.to(1);
        this.getOwnedCourseList();
    };
    getOwnedCourseList(){
        courseService.getOwnedCourseListByWeek(
            TimeManager.convertToTimeStampBySec(weekCourseData.startTime),
            TimeManager.convertToTimeStampBySec(weekCourseData.endTime)
        ).then((courseList)=>{
            this.setState({
                courseList:courseList
            })
        }).catch((info)=>{
            console.log(info);
        });
    }
    onGetMore(){
        HB.ui.scrollToTheBottom(()=>{
            courseService.pagination.nextPage();
            this.getOwnedCourseList();
        });
    }
    componentDidMount() {
        courseService.pagination.to(1);
        this.getOwnedCourseList();
        this.onGetMore();
    }
    componentWillUnmount() {
        window.onscroll = null;
    }

    getCourseNodes(){
        if(this.state.courseList.length > 0){
            return this.state.courseList.map((courseItem, index) => {
                return (
                    <div className="course_week_course_item" key={index}>
                        <div className="course_week_course_item_title">
                            <span
                                className="course_week_course_item_title_time">{courseItem.classTime}</span>
                        </div>
                        <div className="course_week_course_item_info">
                            <div className="course_week_course_item_info_name_box">
                                <div className="course_week_course_item_info_name">
                                    <div className="course_week_course_item_info_type"
                                         style={{background: courseItem.getTypeInfo(courseItem.type).background}}>{courseItem.getTypeInfo(courseItem.type).name}</div>
                                    <div
                                        className="course_week_course_item_info_session_name">{courseItem.sessionName}</div>
                                </div>
                                <div className="course_week_course_item_info_teacher_info">
                                    <div className="course_week_course_item_info_teacher">
                                        <div className="course_week_course_item_info_teacher_header">
                                            <img src={courseItem.teacherInfo.headImgUrl} alt=""
                                                 className="course_week_course_item_info_teacher_header_img"/>
                                        </div>
                                        <div className="course_week_course_item_info_teacher_name">
                                            <div>主讲</div>
                                            <div>{courseItem.teacherInfo.teacherName}</div>
                                        </div>
                                    </div>
                                    <div className="course_week_course_item_info_teacher">
                                        <div className="course_week_course_item_info_teacher_header">
                                            <img src={courseItem.assistantInfo.headImgUrl||"../src/img/def_header_img.png"} alt=""
                                                 className="course_week_course_item_info_teacher_header_img"/>
                                        </div>
                                        <div className="course_week_course_item_info_teacher_name">
                                            <div>助教</div>
                                            <div>{courseItem.assistantInfo.teacherName}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <Link to="/downLoad" className="course_week_course_down_load">
                                下载客户端上课 >
                            </Link>

                        </div>

                    </div>
                )
            });
        }else{
            return (
                <div>
                    暂无课程
                </div>
            )
        }
    }
    render() {
        return(
            <div>
                <div className="course_week_main">
                    <div className="crumbs">
                        首页 > 本周课程
                    </div>
                    <div className="course_week_box">
                        <div className="calender_box">
                            <CalenderView weekCourseData={weekCourseData} onChangeTime={this.updateOwnedCourseList.bind(this)}/>
                        </div>
                        <div className="course_week_course_list">
                            {this.getCourseNodes()}
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}
