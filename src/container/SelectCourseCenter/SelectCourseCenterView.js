/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {SelectCourseCenterHeaderView} from "../../component/SelectCourseCenterHeaderView";
import {WeekCourseView} from "../WeekCourse/WeekCourseView";

export class SelectCourseCenterView extends Component{
    render() {
        return(
            <Router>
                <div>
                    <SelectCourseCenterHeaderView />
                    <Redirect to="/selectCourseCenter/week" />
                    <Route path="/selectCourseCenter/week" component={WeekCourseView} />

                </div>
            </Router>
        )
    }

}