/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {StudyCourseCenterHeaderView} from "../../component/StudyCourseCenterHeaderView";
import {WeekCourseView} from "../WeekCourse/WeekCourseView";
import {MyCourseHeaderView} from "../../component/HeaderView/MyCourseHeaderView";
import {userService} from "../../service/UserService";
import {MyCourseListView} from '../MyCourse/MyCourseListView';
import {FooterView} from "../../component/FooterView/FooterView";
import studyCourseCenterStyle from './studyCourseCenterStyle.css';
export class StudyCourseCenterView extends Component{
    render() {
        return(
                <div>
                    <div className="wrap" />
                    <MyCourseHeaderView userInfo={userService.getUser().userInfo}/>
                    <div>
                        <Route path="/studyCourseCenter/week" component={WeekCourseView} />
                        <Route path="/studyCourseCenter/myCourseList" component={MyCourseListView} />
                    </div>
                    <FooterView />
                </div>
        )
    }

}