/**
 * Created by Liudq on 2019-08-16
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {userService} from "../../service/UserService";
import {PCWeekCourseView} from './PCWeekCourseView';
import {PCMyCourseListView} from './PCMyCourseListView';
import {PCCourseRouteView} from "./PCCourseRouteView";
import {PCCourseDetailView} from "./PCCourseDetailView";
import {PCUserInfoView} from "./PCUserInfoView";
import pcStudyCourseStyle from "./pcStudyCourseStyle.css";
export class PCStudyCourseView extends Component{
    render() {
        return(
            <div className="pc_study_course_main">
                <PCCourseRouteView userInfo={userService.getUser().userInfo} />
                <div>
                    <Route path="/studyCourseCenter/week" component={PCWeekCourseView} />
                    <Route path="/studyCourseCenter/myCourseList" component={PCMyCourseListView} />
                    <Route path="/studyCourseCenter/ownedCourseDetail/:id" component={PCCourseDetailView} />
                    <Route path="/studyCourseCenter/userInfo" component={PCUserInfoView} />
                </div>
            </div>
        )
    }
}