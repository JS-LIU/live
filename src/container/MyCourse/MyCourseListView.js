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
import {baseUrl} from "../../config/config";
import {TeacherView} from "../../component/Teacher/TeacherView";

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
        HB.save.setStorage({redirect:"studyCourseCenter/myCourseList"});
    }
    setFooterStyle(){
        if(!HB.ui.hasScrollbar()){
            this.setState({
                footerStyle:{position:"fixed",bottom:"0"}
            })
        }else{
            this.setState({
                footerStyle:{position:"relative"}
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
            this.setState({
                learnStatusList:courseService.selectOwnedCourseLearnStatus(learnStatus)
            });
            this.updateOwnedCourseList();
        }
    }
    render() {
        let ownedCourseLearnStatusNodes = this.state.learnStatusList.map((learnStatus,index)=>{
            return (
                <div key={index}
                     onClick={this.onChangeLearnStatus(learnStatus)}
                     className="my_course_learn_status"
                     style={learnStatus.active?{background:"#c0c0c0"}:{}}>
                    {learnStatus.name}
                </div>
            )
        });
        let ownedCourseListNodes = this.state.ownedCourseList.map((courseItem,index)=>{
            let ownedCourseModule = courseItem.getModule.before((repairParam)=>{
                repairParam = repairParam || {};
                repairParam.startTime = courseItem.courseInfo.getStartTimeToShow("common");
                repairParam.endTime = courseItem.courseInfo.getEndTimeToShow("common");
            }).call(courseItem,{});
            return (
                <Link to={"/ownedCourseDetail/"+`${ownedCourseModule.id}`} key={index} className="my_course_item">
                    <div className="my_owned_course_product_item_header" style={{background:ownedCourseModule.type.background}}>
                        <img src={ownedCourseModule.type.url} alt="" className="my_owned_course_product_item_header_bg" />
                        <div className="my_owned_course_product_item_header_box">
                            <div className="my_owned_course_product_item_title">{ownedCourseModule.courseName}</div>
                            <CourseTimeShowView
                                style={{
                                    display:"flex",
                                    flexDirection: "row",
                                    fontSize: "0.12rem",
                                    color:"#FFFFFF",
                                    marginTop: "0.15rem",
                                    overflow: "hidden",
                                    textOverflow:"ellipsis",
                                    whiteSpace: "nowrap"
                                }}
                                showTimeStepEnd={false}
                                timeStep={ownedCourseModule.timeList}
                                startTime={ownedCourseModule.startTime}
                                endTime={ownedCourseModule.endTime}
                            />
                        </div>
                    </div>
                    <div className="my_owned_course_product_item_body">
                        <TeacherView
                            teacherStyle={{marginRight:"0.18rem"}}
                            teacherNameStyle={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "0.8rem"}}
                            teacherTitle={"主讲"}
                            headImgUrl={ownedCourseModule.teacherInfo.headImgUrl}
                            teacherName={ownedCourseModule.teacherInfo.teacherName}
                        />
                        <TeacherView
                            // teacherStyle={{marginLeft:"0.18rem"}}
                            teacherNameStyle={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "0.8rem"}}
                            teacherTitle={"助教"}
                            headImgUrl={ownedCourseModule.assistantInfo.headImgUrl}
                            teacherName={ownedCourseModule.assistantInfo.teacherName}
                        />
                    </div>
                    <OwnedCourseBottom courseItem={ownedCourseModule}/>
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
                            {this.state.ownedCourseList.length > 0?ownedCourseListNodes:(<div className="my_course_no_course" style={{width:"100%"}}>暂无课程</div>)}
                        </div>
                    </div>
                </div>
                <FooterView style={this.state.footerStyle}/>
            </div>
        );
    }
}