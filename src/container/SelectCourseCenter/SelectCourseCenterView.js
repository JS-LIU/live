/**
 * Created by Liudq on 2019-07-25
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {SelectCourseCenterHeaderView} from "./SelectCourseCenterHeaderView";
import {courseService} from "../../service/CourseService";
import {CourseProductList} from "./CourseProductList";


export class SelectCourseCenterView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            courseTypeList:[],
            courseList:[],
        };
        /**
         * 分页信息
         */
        this.pagination = courseService.getPagination();
    }
    componentDidMount() {
        courseService.getCourseType().then((list)=>{
            this.setState({
                courseTypeList:list
            });

            return courseService.getProductCourse()
        });
    }

    onSelectSpecifyType(specifyCourseType){
        courseService.toggleSelectSpecifyType(specifyCourseType);
        this.setState({
            courseTypeList:courseService.courseType
        })
    }

    render() {
        return(
            <div>
                <div>选课中心</div>
                <SelectCourseCenterHeaderView courseTypeList={this.state.courseTypeList} onSelectSpecifyType={this.onSelectSpecifyType.bind(this)}/>
                <CourseProductList courseList={this.state.courseList}/>
            </div>

        )
    }
}
