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
            this.pagination.to(1);
            this.updateCourseList();
        })
    }
    updateCourseList(){
        courseService.getProductCourse().then((courseList)=>{
            this.setState({
                courseList:courseList
            });
        });
    }

    /**
     * 获取更多
     */
    onGetMore(){
        this.pagination.nextPage();
        this.updateCourseList();
    }

    /**
     * 选择详细分类
     * @param specifyCourseType
     */
    onSelectSpecifyType(specifyCourseType){
        courseService.toggleSelectSpecifyType(specifyCourseType);
        this.setState({
            courseTypeList:courseService.courseType
        })
    }

    /**
     * 按条件查询课程列表
     */
    onQueryCourseList(){
        this.pagination.to(1);
        this.updateCourseList();
    }
    render() {
        return(
            <div>
                <div>选课中心</div>
                <SelectCourseCenterHeaderView
                    courseTypeList={this.state.courseTypeList}
                    onSelectSpecifyType={this.onSelectSpecifyType.bind(this)}
                    onQueryCourse={this.onQueryCourseList.bind(this)}
                />
                <CourseProductList courseList={this.state.courseList} onGetMore={this.onGetMore.bind(this)}/>
            </div>

        )
    }
}
