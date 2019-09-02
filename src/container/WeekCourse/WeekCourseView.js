/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {CalenderView} from "../../component/CalenderView";
import {courseService} from "../../service/CourseService";
import {TimeManager} from "../../entity/TimeManager";
import weekCourseStyle from './weekCourseStyle.css';
import {userService} from "../../service/UserService";
import {HB} from "../../util/HB";
import {FooterView} from "../../component/FooterView/FooterView";
import {baseUrl} from "../../config/config";
import {TeacherView} from "../../component/Teacher/TeacherView";
import {IconCourseNameView} from "../../component/IconCourseNameView/IconCourseNameView";

export class WeekCourseView extends Component{

    constructor(props){
        super(props);
        this.state = {
            coursePlanList:[],
            footerStyle:null
        };
        this.weekData = {
            startTime:"",
            endTime:""
        }
    }
    setFooterStyle(){

        if(!HB.ui.hasScrollbar()){
            this.setState({
                footerStyle:{position:"fixed",bottom:"0"}
            })
        }else{
            this.setState({
                footerStyle:{position:"relative"}
            })
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
            this.setFooterStyle();
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
        HB.save.setStorage({redirect:"studyCourseCenter/week"});
    }

    componentWillUnmount() {
        window.onscroll = null;
    }

    getCourseNodes(){
        if(this.state.coursePlanList.length > 0){
            return this.state.coursePlanList.map((coursePlanItem, index) => {
                let coursePlanItemModule = coursePlanItem.getModule.before((repairParam)=>{
                    repairParam.startTime = coursePlanItem.coursePlanItem.getShowTime("common");
                }).call(coursePlanItem,{});
                return (
                    <div className="course_week_course_item" key={index}>
                        <div className="course_week_course_item_title">
                            <span
                                className="course_week_course_item_title_time">{coursePlanItemModule.startTime}</span>
                            <span className="course_week_course_item_title_status"
                                  style={{background:coursePlanItemModule.learnStatus.background,color:coursePlanItemModule.learnStatus.color}}>
                                {coursePlanItemModule.learnStatus.name}
                            </span>
                        </div>
                        <div className="course_week_course_item_info">
                            <div className="course_week_course_item_info_name_box">
                                <div className="course_week_course_item_info_name">
                                    <IconCourseNameView
                                        name={coursePlanItemModule.name}
                                        style={{
                                            background:"url('"+coursePlanItemModule.type.iconBackground +"') no-repeat left center",
                                            backgroundSize:"0.25rem",
                                            fontSize:"0.2rem",
                                            color: "#000000",
                                            paddingLeft:"0.4rem"
                                        }}
                                    />
                                </div>
                                <div className="course_week_course_item_info_teacher_info">
                                    <TeacherView
                                        teacherStyle={{marginLeft:"0.18rem"}}
                                        teacherTitle={"主讲"}
                                        headImgUrl={coursePlanItemModule.teacherInfo.headImgUrl}
                                        teacherName={coursePlanItemModule.teacherInfo.teacherName}
                                    />
                                    <TeacherView
                                        teacherStyle={{marginLeft:"0.18rem"}}
                                        teacherTitle={"助教"}
                                        headImgUrl={coursePlanItemModule.assistantInfo.headImgUrl}
                                        teacherName={coursePlanItemModule.assistantInfo.teacherName}
                                    />
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
                <div className="week_no_course">
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
                            <CalenderView weekData={this.weekData} onChangeTime={this.updateOwnedCoursePlanItemList.bind(this)}/>
                        </div>
                        <div className="course_week_course_list">
                            {this.getCourseNodes()}
                        </div>
                    </div>
                </div>
                <FooterView style={this.state.footerStyle}/>
            </div>
        )
    }

}
