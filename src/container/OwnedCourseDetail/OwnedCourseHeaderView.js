/**
 * Created by Liudq on 2019-08-10
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {RingProgressView} from "../../component/RingProgress/RingProgressView";

export class OwnedCourseHeaderView extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="owned_course_plan_header">
                <RingProgressView
                    unit={"rem"}
                    size={"0.88"}
                    borderWidth={"0.06"}
                    borderBg={"rgba(255,255,255,1)"}
                    progressBorderBg={"rgba(220,255,234,1)"}
                    nowProgress={this.props.ownedCourse.finishLessonNum}
                    totalProgress={this.props.ownedCourse.totalLessonNum}
                />

            </div>
        );
    }


}
