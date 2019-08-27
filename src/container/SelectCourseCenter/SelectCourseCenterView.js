/**
 * Created by Liudq on 2019-07-25
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {SelectCourseCenterHeaderView} from "./SelectCourseCenterHeaderView";
import {courseService} from "../../service/CourseService";
import {userService} from "../../service/UserService";
import {CourseProductList} from "./CourseProductList";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {HB} from "../../util/HB";
import selectCourseStyle from "./selectCourseStyle.css";

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
        });
        this.onGetMore();
    }
    componentWillUnmount() {
        window.onscroll = null;
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
        HB.ui.scrollToTheBottom(()=>{
            this.pagination.nextPage();
            this.updateCourseList();
        });
    }

    /**
     * 选择详细分类
     * @param specifyCourseType
     */
    onSelectSpecifyType(specifyCourseType){
        courseService.toggleSelectSpecifyType(specifyCourseType);
        this.setState({
            courseTypeList:courseService.courseType
        });
        this.onQueryCourseList();
    }

    /**
     * 按条件查询课程列表
     */
    onQueryCourseList(){
        this.pagination.to(1);
        this.updateCourseList();
    }
    onSelectAll(generalCourseType){
        courseService.toggleSelectAllSpecifyCourseType(generalCourseType);
        this.setState({
            courseTypeList:courseService.courseType
        });
        this.onQueryCourseList();
    }
    render() {
        return(
            <div>
                <div className="wrap"></div>
                <HeaderView  history={this.props.history} userInfo={userService.getUser().userInfo}/>
                <div className="select_course_center_main">
                    <div className="crumbs">
                        首页 > 选课中心
                    </div>
                    <SelectCourseCenterHeaderView
                        courseTypeList={this.state.courseTypeList}
                        onSelectSpecifyType={this.onSelectSpecifyType.bind(this)}
                        onSelectAll={this.onSelectAll.bind(this)}
                    />
                    <CourseProductList courseList={this.state.courseList}/>
                </div>
            </div>
        )
    }
}
