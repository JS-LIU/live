/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";

export class SelectCourseCenterHeaderView extends Component{
    render() {
        return(
            <div>
                <Link to="/selectCourseCenter/week">本周课程</Link>
            </div>
        )

    }

}