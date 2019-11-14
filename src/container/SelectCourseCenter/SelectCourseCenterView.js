/**
 * Created by Liudq on 2019-07-25
 */
import React, {Component} from 'react';
import {SelectCourseCenterHeaderView} from "./SelectCourseCenterHeaderView";
import {courseService} from "../../service/CourseService";
import {userService} from "../../service/UserService";
import {CourseProductList} from "./CourseProductList";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {HB} from "../../util/HB";
import {CompleteUserInfoView} from "../PCStudyCourse/CompleteUserInfoView";
import {FooterView} from "../../component/FooterView/FooterView";
import selectCourseStyle from "./selectCourseStyle.css";

export class SelectCourseCenterView extends Component{
    constructor(props) {
        super(props);
        let isNeedRepair = HB.url.getSearchKeyByLocationSearch(this.props.location.search,"isNeedRepair") || false;
        this.state = {
            courseTypeList:[],
            courseList:[],
            isNeedRepair:isNeedRepair,
            footerStyle:{position:"fixed",bottom:"0"}
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
        HB.save.setStorage({redirect:"selectCourseCenter"});
    }
    componentWillUnmount() {
        window.onscroll = null;
    }

    updateCourseList(){
        courseService.getProductCourse().then((courseList)=>{
            this.setState({
                courseList:courseList
            });
            this.setFooterStyle();
        });
    }
    setFooterStyle(){
        if(!HB.ui.hasScrollbar(350)){
            this.setState({
                footerStyle:{position:"fixed",bottom:"0"}
            })
        }else{
            this.setState({
                footerStyle:{position:"relative"}
            })
        }
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
        courseService.selectAllSpecifyCourseType(generalCourseType);
        this.setState({
            courseTypeList:courseService.courseType
        });
        this.onQueryCourseList();
    }
    fixedUserInfo(postInfo){
        userService.resetUserInfo(postInfo).then(()=>{
            this.setState({
                userInfo:userService.user.getUserInfo(),
                isNeedRepair:false
            });
        });
    }
    render() {
        return(
            <div>
                <div className="wrap" />
                {this.state.isNeedRepair?<CompleteUserInfoView fixedUserInfo={this.fixedUserInfo.bind(this)}/>:null}
                <HeaderView  history={this.props.history} userInfo={userService.user.getUserInfo()}/>
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
                <FooterView style={this.state.footerStyle}/>
            </div>
        )
    }
}
