/**
 * Created by Liudq on 2019-08-08
 */

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import myCourseListStyle from "./myCourseListStyle.css";
import {courseService} from "../../service/CourseService";
import {HB} from "../../util/HB";
export class MyCourseListView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ownedCourseList:[],
            learnStatusList:courseService.getOwnedCourseLearnStatusList().getList()
        }
    }
    componentDidMount() {
        courseService.pagination.to(1);
        let activeLearnStatus = courseService.getOwnedCourseLearnStatusList().getActive();
        this.updateOwnedCourseList(activeLearnStatus.id);
        this.onGetMore();
    }
    componentWillUnmount() {
        window.onscroll = null;
    }
    onGetMore(){
        HB.ui.scrollToTheBottom(()=>{
            this.pagination.nextPage();
            this.updateOwnedCourseList();
        });
    }
    updateOwnedCourseList(learnStatus){
        courseService.getAllOwnedCourseList(learnStatus).then((courseList)=>{
            console.log(courseList);
            this.setState({
                ownedCourseList:courseList
            });
        });
    }
    onChangeLearnStatus(learnStatus){
        return ()=>{
            this.updateOwnedCourseList(learnStatus);
            this.setState({
                learnStatusList:courseService.selectOwnedCourseLearnStatus(learnStatus)
            })
        }
    }
    render() {
        let ownedCourseLearnStatusNodes = this.state.learnStatusList.map((learnStatus,index)=>{
            return (
                <div key={index} onClick={this.onChangeLearnStatus(learnStatus)} className="my_course_learn_status">
                    {learnStatus.name}
                </div>
            )

        });
        let ownedCourseListNodes = this.state.ownedCourseList.map((courseItem,index)=>{
            return (
                <div key={index} className="my_course_item">
                    <div className="my_owned_course_product_item_header" style={{background:courseItem.getTypeInfo(courseItem.type).background}}>
                        <img src={courseItem.getTypeInfo(courseItem.type).url} alt="" className="my_owned_course_product_item_header_bg" />
                        <div className="my_owned_course_product_item_header_box">
                            <div className="my_owned_course_product_item_title">{courseItem.courseName}</div>
                            <div className="my_owned_course_product_item_time">{courseItem.startTime}-{courseItem.endTime}</div>
                        </div>
                    </div>
                    <div className="my_owned_course_product_item_body">
                        <div className="my_owned_course_week_course_item_info_teacher">
                            <div className="my_owned_course_week_course_item_info_teacher_header">
                                <img src={courseItem.teacherInfo.headImgUrl||"../src/img/def_header_img.png"} alt=""
                                     className="my_owned_course_week_course_item_info_teacher_header_img"/>
                            </div>
                            <div className="my_owned_course_week_course_item_info_teacher_name">
                                <div>主讲</div>
                                <div>{courseItem.teacherInfo.name}</div>
                            </div>
                        </div>
                        <div className="my_owned_course_week_course_item_info_teacher">
                            <div className="my_owned_course_week_course_item_info_teacher_header">
                                <img src={courseItem.assistantInfo.headImgUrl||"../src/img/def_header_img.png"} alt=""
                                     className="my_owned_course_week_course_item_info_teacher_header_img"/>
                            </div>
                            <div className="my_owned_course_week_course_item_info_teacher_name">
                                <div>助教</div>
                                <div>{courseItem.assistantInfo.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="my_owned_course_product_item_footer">
                        <div className="my_owned_course_product_item_footer_total_course">
                            已完成{courseItem.finishLessonNum}/{courseItem.totalLessonNum}节课
                        </div>
                    </div>

                </div>
            )
        });
        return (
            <div className="my_course_main">
                <div className="crumbs">首页 > 我的课程</div>
                <div className="my_course_box">

                    <div className="my_course_main_header">
                        <div className="my_course_header_title">我的课程</div>
                        <div className="my_course_learnStatus_list">
                            {ownedCourseLearnStatusNodes}
                        </div>
                    </div>
                    <div className="my_course_main_course_list">
                        {ownedCourseListNodes}
                    </div>
                </div>
            </div>
        );
    }
}