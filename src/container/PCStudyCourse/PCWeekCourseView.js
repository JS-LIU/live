/**
 * Created by Liudq on 2019-08-16
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {CalenderView} from "../../component/CalenderView";
import {courseService} from "../../service/CourseService";
import {TimeManager} from "../../entity/TimeManager";
import PCWeekCourseStyle from './pcWeekCourseStyle.css';
import {HB} from "../../util/HB";

export class PCWeekCourseView extends Component{

    constructor(props){
        super(props);
        this.state = {
            coursePlanList:[],
        };
        this.weekData = {
            startTime:"",
            endTime:""
        }
    }
    updateOwnedCoursePlanItemList(){
        courseService.pagination.to(1);
        this.getOwnedCoursePlanItemList();
    };
    getOwnedCoursePlanItemList(){
        courseService.getOwnedCoursePlanItemListByWeek(
            TimeManager.convertToTimeStampBySec(this.weekData.startTime),
            TimeManager.convertToTimeStampBySec(this.weekData.endTime)
        ).then((coursePlanList)=>{
            this.setState({
                coursePlanList:coursePlanList
            });
        }).catch((info)=>{
            console.log(info);
        });
    }
    onGetMore(){
        HB.ui.scrollToTheBottom(()=>{
            courseService.pagination.nextPage();
            this.getOwnedCoursePlanItemList();
        });
    }
    componentDidMount() {
        courseService.pagination.to(1);
        this.getOwnedCoursePlanItemList();
        this.onGetMore();
    }
    downLoadHomework(coursePlanItem){
        return ()=>{
            courseService.downLoadHomework(coursePlanItem);
        }
    }
    componentWillUnmount() {
        window.onscroll = null;
    }

    getCourseNodes(){
        if(this.state.coursePlanList.length > 0){
            return this.state.coursePlanList.map((coursePlanItem, index) => {
                return (
                    <div className="pc_course_week_course_item" key={index}>
                        <div className="pc_course_week_course_item_title">
                            <span
                                className="pc_course_week_course_item_title_time">{coursePlanItem.getShowTime()}</span>
                            <span className="course_week_course_item_title_status"
                                  style={{background:coursePlanItem.learnStatus.getStatusInfo().background,color:coursePlanItem.learnStatus.getStatusInfo().color}}>
                                {coursePlanItem.learnStatus.getStatusInfo().name}
                            </span>
                        </div>
                        <div className="course_week_course_item_info">
                            <div className="pc_course_week_course_item_info_name_box">
                                <div className="course_week_course_item_info_name">
                                    <div
                                        className="course_week_course_item_info_session_name"
                                        style={{background:"url('"+coursePlanItem.type.getTypeInfo().iconBackground +"') no-repeat left center",backgroundSize:"0.25rem"}}>
                                        {coursePlanItem.sessionName}</div>
                                </div>
                                <div className="course_week_course_item_info_teacher_info">
                                    <div className="course_week_course_item_info_teacher">
                                        <div className="course_week_course_item_info_teacher_header">
                                            <img src={coursePlanItem.teacherInfo.headImgUrl || "/src/img/def_header_img.png"} alt=""
                                                 className="course_week_course_item_info_teacher_header_img"/>
                                        </div>
                                        <div className="course_week_course_item_info_teacher_name">
                                            <div>主讲</div>
                                            <div>{coursePlanItem.teacherInfo.teacherName}</div>
                                        </div>
                                    </div>
                                    <div className="course_week_course_item_info_teacher">
                                        <div className="course_week_course_item_info_teacher_header">
                                            <img src={coursePlanItem.assistantInfo.headImgUrl||"/src/img/def_header_img.png"} alt=""
                                                 className="course_week_course_item_info_teacher_header_img"/>
                                        </div>
                                        <div className="course_week_course_item_info_teacher_name">
                                            <div>助教</div>
                                            <div>{coursePlanItem.assistantInfo.teacherName}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pc_course_week_course_right">
                                <ul className="pc_course_week_course_material">
                                    <li className="pc_course_week_course_material_item" style={{background:"url('"+coursePlanItem.preVideo.getPreVideoStatus().url+"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItem.preVideo.getPreVideoStatus().color}}>预习视频</li>
                                    <li className="pc_course_week_course_material_item" style={{background:"url('"+coursePlanItem.courseware.getCourseWareStatus().url+"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItem.courseware.getCourseWareStatus().color}}>讲义</li>
                                    <li className="pc_course_week_course_material_item"
                                        onClick={this.downLoadHomework(coursePlanItem)}
                                        style={{background:"url('"+ coursePlanItem.homework.getStatusInfo().url +"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItem.homework.getStatusInfo().color}}>作业</li>
                                </ul>
                                <div className="pc_course_week_course_enter_box">
                                    <div className="pc_course_week_course_enter_course" style={{background:coursePlanItem.learnStatus.getStatusInfo().background,color:coursePlanItem.learnStatus.getStatusInfo().pcColor}}>{coursePlanItem.learnStatus.getStatusInfo().pcName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        }else{
            return (
                <div className="week_no_course">
                    暂无课程
                </div>
            )
        }
    }
    render() {
        return(
            <div className="pc_course_week_main">
                <div className="pc_course_week_box">
                    <div className="pc_calender_box">
                        <CalenderView weekData={this.weekData} onChangeTime={this.updateOwnedCoursePlanItemList.bind(this)}/>
                    </div>
                    <div className="pc_course_week_course_list">
                        {this.getCourseNodes()}
                    </div>
                </div>
            </div>
        )
    }
}