/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {StudyCourseCenterHeaderView} from "../../component/StudyCourseCenterHeaderView";
import {WeekCourseView} from "../WeekCourse/WeekCourseView";
import {MyCourseHeaderView} from "../../component/HeaderView/MyCourseHeaderView";
import {userService} from "../../service/UserService";
import studyCourseCenterStyle from './studyCourseCenterStyle.css';
import {MyCourseListView} from '../MyCourse/MyCourseListView';
export class StudyCourseCenterView extends Component{
    render() {
        return(
                <div>
                    <div className="wrap"></div>
                    <MyCourseHeaderView userInfo={userService.getUser().userInfo}/>
                    <div>
                        <Route path="/studyCourseCenter/week" component={WeekCourseView} />
                        <Route path="/studyCourseCenter/myCourseList" component={MyCourseListView} />
                    </div>
                </div>
        )
    }

}