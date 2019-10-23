/**
 * Created by Liudq on 2019-08-16
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {CalenderView} from "../../component/CalenderView";
import {courseService} from "../../service/CourseService";
import {TimeManager} from "../../entity/TimeManager";
import {HB} from "../../util/HB";
import {baseUrl} from "../../config/config";
import {userService} from "../../service/UserService";
import {PCPreSessionVideoDialogView} from "./PCPreSessionVideoDialogView";
import PCWeekCourseStyle from './pcWeekCourseStyle.css';
import { RViewer, RViewerTrigger } from 'react-viewerjs'
import {CommentHomeworkView} from "./CommentHomeworkView";
import {ShowLectureView} from "./ShowLectureView";

export class PCWeekCourseView extends Component{

    constructor(props){
        super(props);
        this.state = {
            coursePlanList:[],
            showPreview:false,
            showHomeWork:false,
            showReviewVideo:false,
            showHomeworkComment:false,
            showLecture:false
        };
        this.weekData = {
            startTime:"",
            endTime:""
        };
    }
    updateOwnedCoursePlanItemList(){
        courseService.pagination.to(1);
        this.getOwnedCoursePlanItemList();
    };
    getOwnedCoursePlanItemList(){
        courseService.getOwnedCoursePlanItemListByWeek(
            TimeManager.convertToTimeStampBySec(this.weekData.startTime + " 00:00:00"),
            TimeManager.convertToTimeStampBySec(this.weekData.endTime + " 23:59:59")
        ).then((coursePlanList)=>{
            console.log(coursePlanList);
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
    startHomework(coursePlan){
        if(coursePlan.coursePlanItem.homework.getStatusInfo().name === "下载作业"){
            window.startHomeWork(JSON.stringify({
                id:coursePlan.coursePlanItem.id,
                urlPath:coursePlan.homeworkInfo.urlPath,
                title:coursePlan.coursePlanItem.name,
                courseName:coursePlan.coursePlanItem.courseName,
                type:coursePlan.coursePlanItem.type.type,
                userReward:userService.user.getUserInfo().userReward,
                userName:userService.user.getUserInfo().userName,
                sex:userService.user.getUserInfo().sex,
                savePath:coursePlan.coursePlanItem.homework.homeworkSavePath,
            }));
        }
        return "nextSuccessor";
    }
    showHomeWork(coursePlan){
        if(coursePlan.coursePlanItem.homework.getStatusInfo().name === "作业已提交"||coursePlan.coursePlanItem.homework.getStatusInfo().name === "作业已批改"){
            this.setState({
                showHomeworkComment:true,
                commentInfo:coursePlan.homeworkInfo,
                courseName:coursePlan.coursePlanItem.courseName
            })
        }
        return "nextSuccessor";
    }

    downLoadHomework(coursePlanItem){
        return ()=>{
            console.log(coursePlanItem);
            courseService.downLoadHomework(coursePlanItem).then((data)=>{
                console.log(data);
                let hasComment = coursePlanItem.homework.getStatusInfo().isModify;
                this.startHomework.after(this.showHomeWork).call(this,{coursePlanItem:coursePlanItem,homeworkInfo:Object.assign(data.data,{hasComment:hasComment})});
            });
        }
    }
    componentWillUnmount() {
        window.onscroll = null;
    }
    unOpen(coursePlanItem){
        if (coursePlanItem.learnStatus.getStatusInfo().name === "未开课") {
            return false;
        }
        return 'nextSuccessor';
    }
    reViewVideo(coursePlanItem){
        if (coursePlanItem.learnStatus.getStatusInfo().name === "已结束" && coursePlanItem.learnStatus.videoViewStatus === 1) {
            courseService.getVideoView(coursePlanItem.learnStatus.videoId).then((data)=>{
                console.log("videoInfo:",data);
                this.setState({
                    showReviewVideo:true
                });
                new Aliplayer({
                    id: "J_show_review_video",
                    vid : data.data.aliVodId,
                    playauth : data.data.playAuth,
                    width:'8.96rem',
                    height:'5rem',
                    controlBarVisibility:'hover',
                    diagnosisButtonVisible:false,
                    autoplay: true
                });
            });
        }
        return 'nextSuccessor';
    }
    callLive(coursePlanItem){
        if(coursePlanItem.learnStatus.getStatusInfo().name === "正在学"){
            window.CallLiveClient(JSON.stringify({classPlanId:coursePlanItem.id,courseType:coursePlanItem.type.type,courseName:coursePlanItem.courseName}));
        }
        return false;
    }
    enterCourse(coursePlanItem){
        return ()=>{
            this.unOpen.after(this.reViewVideo).after(this.callLive).call(this,coursePlanItem);
        }
    }
    closeDialog(){
        this.setState({
            showPreview:false
        })
    }
    closeHomeworkDialog(){
        this.setState({
            showHomeworkComment:false
        })
    }
    showVideo(coursePlanItem){
        return ()=>{
            console.log(coursePlanItem);
            courseService.getPreSessionVideo(coursePlanItem).then((data)=>{
                this.setState({
                    courseName:coursePlanItem.name,
                    showPreview:true,
                    preSessionVideo:data.data
                })
            }).catch(()=>{
                console.log("没有权限查看")
            });
        }
    }
    showLectureNotes(coursePlanItem){
        return ()=>{
            courseService.getLectureNotes(coursePlanItem).then((data)=>{
                this.setState({
                    showLecture:true,
                    lectureUrl:data.urlPath,
                    courseName:coursePlanItem.name
                });
            });
        }
    }
    closeLectureDialog(){
        this.setState({
            showLecture:false,
        })
    }
    closeReviewVideo(){
        this.setState({
            showReviewVideo:false
        });
    }
    getCourseNodes(){
        if(this.state.coursePlanList.length > 0){
            return this.state.coursePlanList.map((coursePlanItem, index) => {
                let coursePlanItemModule = coursePlanItem.getModule.before((repairParam)=>{
                    repairParam.startTime = coursePlanItem.coursePlanItem.getShowTime("common");
                    repairParam.courseWareUrl = coursePlanItem.coursePlanItem.lectureNotes.urlPath;
                }).call(coursePlanItem,{});
                return (
                    <div className="pc_course_week_course_item" key={index}>
                        <div className="pc_course_week_course_item_title">
                            <span
                                className="pc_course_week_course_item_title_time">{coursePlanItemModule.startTime}</span>
                            <span className="course_week_course_item_title_status"
                                  style={{background:coursePlanItemModule.learnStatus.background,color:coursePlanItemModule.learnStatus.color}}>
                                {coursePlanItemModule.learnStatus.name}
                            </span>
                        </div>
                        <div className="course_week_course_item_info">
                            <div className="pc_course_week_course_item_info_name_box">
                                <div className="course_week_course_item_info_name">
                                    <div
                                        className="course_week_course_item_info_session_name"
                                        style={{background:"url('"+coursePlanItemModule.type.iconBackground +"') no-repeat left center",backgroundSize:"0.25rem"}}>
                                        {coursePlanItemModule.name}</div>
                                </div>
                                <div className="course_week_course_item_info_teacher_info">
                                    <div className="course_week_course_item_info_teacher">
                                        <div className="course_week_course_item_info_teacher_header">
                                            <img src={coursePlanItemModule.teacherInfo.headImgUrl} alt=""
                                                 className="course_week_course_item_info_teacher_header_img"/>
                                        </div>
                                        <div className="course_week_course_item_info_teacher_name">
                                            <div>主讲</div>
                                            <div>{coursePlanItemModule.teacherInfo.teacherName}</div>
                                        </div>
                                    </div>
                                    <div className="course_week_course_item_info_teacher">
                                        <div className="course_week_course_item_info_teacher_header">
                                            <img src={coursePlanItemModule.assistantInfo.headImgUrl} alt=""
                                                 className="course_week_course_item_info_teacher_header_img"/>
                                        </div>
                                        <div className="course_week_course_item_info_teacher_name">
                                            <div>助教</div>
                                            <div>{coursePlanItemModule.assistantInfo.teacherName}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pc_course_week_course_right">
                                <div className="pc_course_week_course_material">
                                    <div className="pc_course_week_course_material_item"
                                        style={{background:"url('"+coursePlanItemModule.preVideo.url+"') top center / 0.2rem no-repeat",color:coursePlanItemModule.preVideo.color}}
                                        onClick={this.showVideo(coursePlanItem.coursePlanItem)}>预习视频</div>
                                    <div
                                        onClick={this.showLectureNotes(coursePlanItem.coursePlanItem)}
                                        className="pc_course_week_course_material_item"
                                        style={{background:"url('"+coursePlanItemModule.lectureNotes.url+"') top center / 0.2rem no-repeat",color:coursePlanItemModule.lectureNotes.color}}>
                                        <div>讲义</div>
                                    </div>
                                    <div className="pc_course_week_course_material_item"
                                         style={{background:"url('"+ coursePlanItemModule.homework.url +"') top center / 0.2rem no-repeat",color:coursePlanItemModule.homework.color}}
                                         onClick={this.downLoadHomework(coursePlanItem.coursePlanItem)}>作业</div>
                                </div>
                                <div className="pc_course_week_course_enter_box">
                                    <div className="pc_course_week_course_enter_course"
                                         onClick={this.enterCourse(coursePlanItem.coursePlanItem)}
                                         style={{background:coursePlanItemModule.learnStatus.background,color:coursePlanItemModule.learnStatus.pcColor,border:coursePlanItemModule.learnStatus.border}}>
                                        {coursePlanItemModule.learnStatus.pcName}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        }else{
            return (
                <div className="my_course_no_course" style={{width:"100%"}}>
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
                {this.state.showPreview?<PCPreSessionVideoDialogView
                    courseName={this.state.courseName}
                    closeDialog={this.closeDialog.bind(this)}
                    preSessionVideo={this.state.preSessionVideo}/>:null}
                {this.state.showReviewVideo?
                    <div className="review_video_box">
                        <div className="review_video_wrapper" />
                        <div className="review_video_close_btn" onClick={this.closeReviewVideo.bind(this)} />
                        <div id="J_show_review_video" className="show_review_video"/>
                    </div>
                    :null}
                {this.state.showHomeworkComment?<CommentHomeworkView
                    courseName={this.state.courseName}
                    commentInfo={this.state.commentInfo}
                    closeHomeworkDialog={this.closeHomeworkDialog.bind(this)}
                    hasComment={this.state.hasComment}/>:null}
                {this.state.showLecture?<ShowLectureView
                    courseName={this.state.courseName}
                    closeLectureDialog={this.closeLectureDialog.bind(this)}
                    lectureUrl={this.state.lectureUrl}/>:null}
            </div>
        )
    }
}