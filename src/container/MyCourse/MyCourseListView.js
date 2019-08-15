/**
 * Created by Liudq on 2019-08-08
 */

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {HB} from "../../util/HB";
import {TimeManager} from "../../entity/TimeManager";
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";
import {courseService} from "../../service/CourseService";
import {OwnedCourseBottom} from './OwnedCourseBottom';
import myCourseListStyle from "./myCourseListStyle.css";
import {FooterView} from "../../component/FooterView/FooterView";
export class MyCourseListView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ownedCourseList:[],
            learnStatusList:courseService.getOwnedCourseLearnStatusList().getList(),
            footerStyle:null
        }
    }
    componentDidMount() {
        courseService.pagination.to(1);
        this.updateOwnedCourseList();
        this.onGetMore();

    }
    setFooterStyle(){
        console.log(HB.ui.hasScrollbar());
        if(!HB.ui.hasScrollbar()){
            this.setState({
                footerStyle:{position:"fixed",bottom:"0"}
            })
        }
    }
    componentWillUnmount() {
        window.onscroll = null;
    }
    onGetMore(){
        HB.ui.scrollToTheBottom(()=>{
            courseService.pagination.nextPage();
            this.updateOwnedCourseList();
        });
    }
    updateOwnedCourseList(){
        courseService.getAllOwnedCourseList().then((courseList)=>{
            this.setState({
                ownedCourseList:courseList,
            });
            this.setFooterStyle()

        }).catch(()=>{
            console.log("我是有底线的");
        });
    }
    onChangeLearnStatus(learnStatus){
        return ()=>{
            this.updateOwnedCourseList(learnStatus);
            this.setState({
                learnStatusList:courseService.selectOwnedCourseLearnStatus(learnStatus.id)
            })
        }
    }
    render() {
        let ownedCourseLearnStatusNodes = this.state.learnStatusList.map((learnStatus,index)=>{
            return (
                <div key={index} onClick={this.onChangeLearnStatus(learnStatus)} className="my_course_learn_status">
                    {learnStatus.name}
                </div>
            )

        });
        let ownedCourseListNodes = this.state.ownedCourseList.map((courseItem,index)=>{
            return (
                <Link to={"/ownedCourseDetail/"+`${courseItem.id}`} key={index} className="my_course_item">
                    <div className="my_owned_course_product_item_header" style={{background:courseItem.type.getTypeInfo().background}}>
                        <img src={courseItem.type.getTypeInfo().url} alt="" className="my_owned_course_product_item_header_bg" />
                        <div className="my_owned_course_product_item_header_box">
                            <div className="my_owned_course_product_item_title">{courseItem.courseName}</div>
                            <CourseTimeShowView
                                style={{
                                    display:"flex",
                                    flexDirection: "row",
                                    fontSize: "0.12rem",
                                    color:"#FFFFFF",
                                    marginTop: "0.15rem"
                                }}
                                showTimeStepEnd={false}
                                timeType={"common"}
                                timeStep={courseItem.timeList}
                                startTime={courseItem.startTime}
                                endTime={courseItem.endTime}
                            />
                        </div>
                    </div>
                    <div className="my_owned_course_product_item_body">
                        <div className="my_owned_course_week_course_item_info_teacher">
                            <div className="my_owned_course_week_course_item_info_teacher_header">
                                <img src={courseItem.teacherInfo.headImgUrl || "../src/img/def_header_img.png"} alt=""
                                     className="my_owned_course_week_course_item_info_teacher_header_img"/>
                            </div>
                            <div className="my_owned_course_week_course_item_info_teacher_name">
                                <div>主讲</div>
                                <div>{courseItem.teacherInfo.name || "暂未分配"}</div>
                            </div>
                        </div>
                        <div className="my_owned_course_week_course_item_info_teacher">
                            <div className="my_owned_course_week_course_item_info_teacher_header">
                                <img src={courseItem.assistantInfo.headImgUrl || "../src/img/def_header_img.png"} alt=""
                                     className="my_owned_course_week_course_item_info_teacher_header_img"/>
                            </div>
                            <div className="my_owned_course_week_course_item_info_teacher_name">
                                <div>助教</div>
                                <div>{courseItem.assistantInfo.name || "暂未分配"}</div>
                            </div>
                        </div>
                    </div>
                    <OwnedCourseBottom courseItem={courseItem}/>
                </Link>
            )
        });
        return (
            <div>
                <div className="my_course_main">
                    <div className="crumbs">首页 > 我的课程</div>
                    <div className="my_course_box">

                        <div className="my_course_main_header">
                            <div className="my_course_header_title">我的课程</div>
                            <div className="my_course_learnStatus_list">
                                {ownedCourseLearnStatusNodes}
                            </div>
                        </div>
                        <div className="my_course_main_course_list">
                            {ownedCourseListNodes}
                        </div>
                    </div>
                </div>
                <FooterView style={this.state.footerStyle}/>
            </div>
        );
    }
}