/**
 * Created by Liudq on 2019-08-10
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {courseService} from "../../service/CourseService";
import {OwnedCourseHeaderView} from "./OwnedCourseHeaderView";

export class OwnedCourseDetailView extends Component{
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

    render() {
        if(!this.state.ownedCourse){
            return null;
        }
        let OwnedCoursePlanNodes = this.state.ownedCourse.getCoursePlanList().map((coursePlanItem,index)=>{
            return (
                <div key={index}>
                    {coursePlanItem.name}
                </div>
            )
        });
        return (
            <div>
                <div className="wrap" />
                <div className="owned_course_plan_main">
                    <div className="crumbs">
                        首页 > 我的课程 > {this.state.ownedCourse.courseName}
                    </div>
                    <div className="owned_course_plan_list">
                        <OwnedCourseHeaderView ownedCourse={this.state.ownedCourse}/>
                        {OwnedCoursePlanNodes}
                    </div>
                </div>

            </div>
        );
    }

}