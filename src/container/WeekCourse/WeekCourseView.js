/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {CalenderView} from "../../component/CalenderView";
import {weekCourseData} from "./WeekCourseData";
import {courseService} from "../../service/CourseService";

export class WeekCourseView extends Component{
    handleChangeTime(){
        courseService.getOwnedCourseList(1,weekCourseData.startTime,weekCourseData.endTime).then((courseList)=>{
            console.log(courseList);
        });
    };
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return(
            <div>
                本周课程内容
                <CalenderView weekCourseData={weekCourseData} handleChangeTime={this.handleChangeTime.bind(this)}/>
            </div>
        )
    }

}
