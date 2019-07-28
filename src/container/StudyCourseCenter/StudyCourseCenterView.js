/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {StudyCourseCenterHeaderView} from "../../component/StudyCourseCenterHeaderView";
import {WeekCourseView} from "../WeekCourse/WeekCourseView";

export class StudyCourseCenterView extends Component{
    render() {
        return(
            <Router>
                <div>
                    <StudyCourseCenterHeaderView />
                    <Redirect to="/studyCourseCenter/week" />
                    <Route path="/studyCourseCenter/week" component={WeekCourseView} />

                </div>
            </Router>
        )
    }

}