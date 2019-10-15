/**
 * Created by Liudq on 2019-08-17
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {courseService} from "../../service/CourseService";
import {OwnedCourseHeaderView} from "../OwnedCourseDetail/OwnedCourseHeaderView";
import PCCourseDetailStyle from "./pcCourseDetailStyle.css";
import {PCPreSessionVideoDialogView} from "./PCPreSessionVideoDialogView";
import {userService} from "../../service/UserService";
import {CommentHomeworkView} from "./CommentHomeworkView";
import {ShowLectureView} from "./ShowLectureView";
export class PCCourseDetailView extends Component{
    constructor(props) {
        super(props);
        this.courseItemId = this.props.match.params.id;
        this.state = {
            ownedCourse:null,
            showPreview:false,
            showHomeWork:false,
            showReviewVideo:false,
            showHomeworkComment:false,
            showLecture:false
        }
    }
    componentDidMount() {
        courseService.getOwnedCourseDetail(this.courseItemId).then((ownedCourse)=>{
            this.setState({
                ownedCourse:ownedCourse
            })
        });
    }
    startHomework(coursePlan){
        console.log(JSON.stringify({
            id:coursePlan.coursePlanItem.id,
            urlPath:coursePlan.homeworkInfo.urlPath,
            title:coursePlan.coursePlanItem.name,
            courseName:coursePlan.coursePlanItem.courseName,
            type:coursePlan.coursePlanItem.type.type,
            userReward:userService.user.getUserInfo().userReward,
            userName:userService.user.getUserInfo().userName,
            sex:userService.user.getUserInfo().sex,
            savePath:coursePlan.coursePlanItem.homeworkSavePath
        }));
        window.startHomeWork(JSON.stringify({
            id:coursePlan.coursePlanItem.id,
            urlPath:coursePlan.homeworkInfo.urlPath,
            title:coursePlan.coursePlanItem.name,
            courseName:coursePlan.coursePlanItem.courseName,
            type:coursePlan.coursePlanItem.type.type,
            userReward:userService.user.getUserInfo().userReward,
            userName:userService.user.getUserInfo().userName,
            sex:userService.user.getUserInfo().sex,
            savePath:coursePlan.coursePlanItem.homeworkSavePath
        }));
    }
    showHomeWork(coursePlan){
        this.setState({
            showHomeworkComment:true,
            commentInfo:coursePlan.homeworkInfo,
            courseName:coursePlan.coursePlanItem.courseName
        })

    }
    downLoadHomework(coursePlanItem){
        return ()=>{
            courseService.downLoadHomework(coursePlanItem).then((data)=>{
                console.log(data);
                let hasComment = coursePlanItem.homework.getStatusInfo().isModify;
                this.showHomeWork.after(this.startHomework).call(this,{coursePlanItem:coursePlanItem,homeworkInfo:Object.assign(data.data,{hasComment:hasComment})});
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
                             style={{background:"url('"+coursePlanItemModule.type.iconBackground +"') no-repeat left 0.05rem",backgroundSize:"0.25rem"}}>
                            {coursePlanItemModule.courseName} | {coursePlanItemModule.name}</div>
                        <div className="course_plan_item_info_course_start_time">{coursePlanItemModule.startTime}</div>
                    </div>
                    <div className="pc_course_plan_item_right_pl_1">
                        <ul className="pc_course_week_course_material">
                            <li className="pc_course_week_course_material_item"
                                onClick={this.showVideo(coursePlanItem.coursePlanItem)}
                                style={{background:"url('"+coursePlanItemModule.preVideo.url+"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItemModule.preVideo.color}}>预习视频</li>
                            <div
                               className="pc_course_week_course_material_item"
                               onClick={this.showLectureNotes(coursePlanItem.coursePlanItem)}
                               style={{background:"url('"+coursePlanItemModule.lectureNotes.url+"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItemModule.lectureNotes.color}}>
                                <div>讲义</div>
                            </div>
                            <li className="pc_course_week_course_material_item"
                                onClick={this.downLoadHomework(coursePlanItem.coursePlanItem)}
                                style={{background:"url('"+ coursePlanItemModule.homework.url +"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItemModule.homework.color}}>作业</li>
                        </ul>
                        <div className="pc_course_week_course_enter_box">
                            <div className="pc_course_week_course_enter_course"
                                 onClick={this.enterCourse(coursePlanItem.coursePlanItem)}
                                 style={{background:coursePlanItemModule.learnStatus.background,color:coursePlanItemModule.learnStatus.pcColor,border:coursePlanItemModule.learnStatus.border}}>
                                {coursePlanItemModule.learnStatus.pcName}</div>
                        </div>
                    </div>
                </div>
            )
        });
        let ownedCourseModule = this.state.ownedCourse.getModule.before((repairParam)=>{
            repairParam = repairParam || {};
            repairParam.startTime = this.state.ownedCourse.courseInfo.getStartTimeToShow("common");
            repairParam.endTime = this.state.ownedCourse.courseInfo.getEndTimeToShow("common");
        }).call(this.state.ownedCourse,{});
        return (
            <div className="pc_owned_course_plan_main">
                <div className="pc_owned_course_plan_list">
                    <OwnedCourseHeaderView ownedCourseModule={ownedCourseModule}/>
                    {OwnedCoursePlanNodes}
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
                    closeHomeworkDialog={this.closeHomeworkDialog.bind(this)} hasComment={this.state.hasComment}/>:null}
                {this.state.showLecture?<ShowLectureView
                    courseName={this.state.courseName}
                    closeLectureDialog={this.closeLectureDialog.bind(this)}
                    lectureUrl={this.state.lectureUrl}/>:null}
            </div>
        );
    }
}