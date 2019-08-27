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
    playAudio(coursePlanItem){
        return ()=>{
            courseService.getPreSessionVideo(coursePlanItem).then((data)=>{
                // {"code":0,"data":{"aliVodId":"dce478a8542745e4b2497812ba9036be","id":164,"playAuth":"eyJTZWN1cml0eVRva2VuIjoiQ0FJUzN3SjFxNkZ0NUIyeWZTaklyNHZUTXQvT2k1bEszUENBV256MWpWTm1mTFpub3ZiSWh6ejJJSDlJZEhWb0FPOGZ2dlUwbTJ0WTdQc1psck1xRmM0Y0hoR2FOSlFydjg0SHFsN3dKcExGc3QySjZyOEpqc1U4N3NKNHFGdXBzdlhKYXNEVkVma3VFNVhFTWlJNS8wMGU2TC8rY2lyWVhEN0JHSmFWaUpsaFE4MEtWdzJqRjFSdkQ4dFhJUTBRazYxOUszemRaOW1nTGlidWkzdnhDa1J2MkhCaWptOHR4cW1qL015UTV4MzFpMXYweStCM3dZSHRPY3FjYThCOU1ZMVdUc3Uxdm9oemFyR1Q2Q3BaK2psTStxQVU2cWxZNG1YcnM5cUhFa0ZOd0JpWFNaMjJsT2RpTndoa2ZLTTNOcmRacGZ6bjc1MUN0L2ZVaXA3OHhtUW1YNGdYY1Z5R0ZkN3drWk9aUXJ6emJZMWtMdTZpQVJtWGpJRFRiS3VTbWhnL2ZIY1dPRGxOZjljY01YSnFBWFF1TUdxRmR2LzdvQW1WTzFmeUVQZmVnUHRyaW9BSjVsSHA3TWVNR1YrRGVMeVF5aDBFSWFVN2EwNDRtc0dVYjlOZnBjUWFnQUZJT3hUSVRxK0lJQmdDQTFibUtzRUYrWVVsZTF4SFZBZzBoR2F5UEhSZG5KWlM2R3AxL2hhM1NBZjZSUHRyMVpzZTVldGdVSnNMSkVIVXllbG4zay9WWDlUdTNjUDRPcFVNK2VTS0dFa015S1NlRC9Oejk1UDdUU1ZId21iSG9nVEdoZ21XL0RJcHVwWmhoN21JZzczbGZKYW1EbExZMjR0VkNZdlB4QUxIQVE9PSIsIkF1dGhJbmZvIjoie1wiQ0lcIjpcIkdjRjB4ZUVQa09mSytHbFpSNDN4ZGIzZjZVOHU3QUZrRnl5SjlmZmtLb21Fa1B2eW9wQnBWQUdqSXdpZFJKa25MWFYrMkZRd05tTFNcXHJcXG5kVXJnSXAyR1RKTTFmODhGbVBNWG15eWRHSEhhQzZrPVxcclxcblwiLFwiQ2FsbGVyXCI6XCJlYmRzZ3ZKZGU3YThHQ2hNeEpaL2wrQWlvUjNia3lIa2g3ZmRreFJBRGFZPVxcclxcblwiLFwiRXhwaXJlVGltZVwiOlwiMjAxOS0wOC0yMFQxODo0MTowMlpcIixcIk1lZGlhSWRcIjpcImRjZTQ3OGE4NTQyNzQ1ZTRiMjQ5NzgxMmJhOTAzNmJlXCIsXCJQbGF5RG9tYWluXCI6XCJ2aWRlby5zc2NvZGluZy5jb21cIixcIlNpZ25hdHVyZVwiOlwiVWF1RUhiakYwNTlRc3pobUFyOUM0ZFU5ajlFPVwifSIsIlZpZGVvTWV0YSI6eyJTdGF0dXMiOiJOb3JtYWwiLCJWaWRlb0lkIjoiZGNlNDc4YTg1NDI3NDVlNGIyNDk3ODEyYmE5MDM2YmUiLCJUaXRsZSI6Iuiusuinoy5tcDQiLCJDb3ZlclVSTCI6Imh0dHA6Ly92aWRlby5zc2NvZGluZy5jb20vZGNlNDc4YTg1NDI3NDVlNGIyNDk3ODEyYmE5MDM2YmUvc25hcHNob3RzLzkxZTZkYmFiZGZhNTQyZDk4NGQyMWNjNDc2NDIwNmI1LTAwMDAyLmpwZyIsIkR1cmF0aW9uIjoyNS4wfSwiQWNjZXNzS2V5SWQiOiJTVFMuTkhmeWV6ZkZrazJrWFpEaVMzcDlLTTNjZSIsIlBsYXlEb21haW4iOiJ2aWRlby5zc2NvZGluZy5jb20iLCJBY2Nlc3NLZXlTZWNyZXQiOiJDNUx0SjVuNUx5a0t0UXRnUTRGTVFIRG54bTZNVnJWbTN6R21kNk4xeXRocyIsIlJlZ2lvbiI6ImNuLXNoYW5naGFpIiwiQ3VzdG9tZXJJZCI6MTY5MTM1NjE3MzkyODM1OX0=","previewTopicList":[{"id":1,"materialNo":"21","topicAnswer":"1","topicName":"121","topicOptionList":[{"analyse":"212","option":"212"},{"analyse":"2121","option":"211"},{"analyse":"2122","option":"212"},{"analyse":"1212","option":"212"}]}]},"message":""}
                console.log(data);
                new Aliplayer({
                    id: "J_prismPlayer",
                    vid : data.data.aliVodId,
                    playauth : data.data.playAuth,
                    position:"fixed",
                    top:"0.64rem",
                    left:"0.5rem",
                    width:'11.8rem',
                    height:'6.65rem',
                    controlBarVisibility:'hover',
                    diagnosisButtonVisible:false,
                    autoplay: true
                });
            })
        }
    }
    downLoadHomework(coursePlanItem){
        return ()=>{
            courseService.downLoadHomework(coursePlanItem);
        }
    }
    enterCourse(coursePlanItem){
        return ()=>{
            window.CallLiveClient(JSON.stringify({classPlanId:coursePlanItem.id,courseType:coursePlanItem.typeText}));
        }
    }
    render() {
        if(!this.state.ownedCourse){
            return null;
        }
        let OwnedCoursePlanNodes = courseService.getOwnedCoursePlanItemListByDetail(this.state.ownedCourse.id).map((coursePlanItem,index)=>{
            return (
                <div key={index} className="course_plan_item">
                    <div className="course_plan_item_info" >
                        <div className="course_plan_item_info_course_name" style={{background:"url('"+coursePlanItem.type.getTypeInfo().iconBackground +"') no-repeat left 0.04rem",backgroundSize:"0.25rem"}}>
                            {this.state.ownedCourse.courseName} | {coursePlanItem.sessionName}</div>
                        <div className="course_plan_item_info_course_start_time">{coursePlanItem.getShowTime("unix")}</div>
                    </div>
                    <div className="pc_course_plan_item_right_pl_1">
                        <ul className="pc_course_week_course_material">
                            <li className="pc_course_week_course_material_item"
                                onClick={this.playAudio(coursePlanItem)}
                                style={{background:"url('"+coursePlanItem.preVideo.getPreVideoStatus().url+"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItem.preVideo.getPreVideoStatus().color}}>预习视频</li>
                            <li className="pc_course_week_course_material_item" style={{background:"url('"+coursePlanItem.courseware.getCourseWareStatus().url+"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItem.courseware.getCourseWareStatus().color}}>讲义</li>
                            <li className="pc_course_week_course_material_item"
                                onClick={this.downLoadHomework(coursePlanItem)}
                                style={{background:"url('"+ coursePlanItem.homework.getStatusInfo().url +"') no-repeat top center",backgroundSize:"0.2rem",color:coursePlanItem.homework.getStatusInfo().color}}>作业</li>
                        </ul>
                        <div className="pc_course_week_course_enter_box">
                            <div className="pc_course_week_course_enter_course" onClick={this.enterCourse(coursePlanItem)} style={{background:coursePlanItem.learnStatus.getStatusInfo().background,color:coursePlanItem.learnStatus.getStatusInfo().pcColor}}>{coursePlanItem.learnStatus.getStatusInfo().pcName}</div>
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
                <div id="J_prismPlayer"></div>
            </div>
        );
    }
}