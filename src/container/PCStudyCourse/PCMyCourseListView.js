/**
 * Created by Liudq on 2019-08-16
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {HB} from "../../util/HB";
import {TimeManager} from "../../entity/TimeManager";
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";
import {courseService} from "../../service/CourseService";
import {PCOwnedCourseBottom} from './PCOwnedCourseBottom';
import pcMyCourseListStyle from "./pcMyCourseListStyle.css";
import {baseUrl} from "../../config/config";

export class PCMyCourseListView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ownedCourseList:[],
            learnStatusList:courseService.getOwnedCourseLearnStatusList().getList(),
        }
    }
    componentDidMount() {
        courseService.pagination.to(1);
        this.updateOwnedCourseList();
        this.onGetMore();
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

        }).catch(()=>{
            console.log("我是有底线的");
        });
    }
    onChangeLearnStatus(learnStatus){
        return ()=>{
            this.setState({
                learnStatusList:courseService.selectOwnedCourseLearnStatus(learnStatus)
            });
            courseService.pagination.to(1);
            this.updateOwnedCourseList();
        }
    }
    render() {
        let ownedCourseLearnStatusNodes = this.state.learnStatusList.map((learnStatus,index)=>{
            return (
                <div key={index}
                     onClick={this.onChangeLearnStatus(learnStatus)}
                     style={learnStatus.active?{background:"#c0c0c0",order:learnStatus.order}:{order:learnStatus.order}}
                     className="my_course_learn_status">
                    {learnStatus.name}
                </div>
            )
        });
        let ownedCourseListNodes = this.state.ownedCourseList.map((courseItem,index)=>{
            let ownedCourseModule = courseItem.getModule.before((repairParam)=>{
                repairParam = repairParam || {};
                repairParam.startTime = courseItem.courseInfo.getStartTimeToShow("unix");
                repairParam.endTime = courseItem.courseInfo.getEndTimeToShow("unix");
            }).call(courseItem,{});

            return (
                <Link to={"/studyCourseCenter/ownedCourseDetail/"+`${ownedCourseModule.id}`}
                      key={index}
                      className="pc_my_course_item">
                    <div className="my_owned_course_product_item_header"
                         style={{background:ownedCourseModule.type.background}}>
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
                        <div className="my_owned_course_week_course_item_info_teacher">
                            <div className="my_owned_course_week_course_item_info_teacher_header">
                                <img src={ownedCourseModule.teacherInfo.headImgUrl} alt=""
                                     className="my_owned_course_week_course_item_info_teacher_header_img"/>
                            </div>
                            <div className="my_owned_course_week_course_item_info_teacher_name">
                                <div>主讲</div>
                                <div>{ownedCourseModule.teacherInfo.teacherName}</div>
                            </div>
                        </div>
                        <div className="my_owned_course_week_course_item_info_teacher">
                            <div className="my_owned_course_week_course_item_info_teacher_header">
                                <img src={ownedCourseModule.assistantInfo.headImgUrl} alt=""
                                     className="my_owned_course_week_course_item_info_teacher_header_img"/>
                            </div>
                            <div className="my_owned_course_week_course_item_info_teacher_name">
                                <div>助教</div>
                                <div>{ownedCourseModule.assistantInfo.teacherName}</div>
                            </div>
                        </div>
                    </div>
                    <PCOwnedCourseBottom courseItem={ownedCourseModule}/>
                </Link>
            )
        });
        return (
            <div className="pc_my_course_main">
                <div className="my_course_box">
                    <div className="pc_my_course_main_header">
                        <div className="my_course_header_title">我的课程</div>
                        <div className="my_course_learnStatus_list">
                            {ownedCourseLearnStatusNodes}
                        </div>
                    </div>
                    <div className="pc_my_course_main_course_list">
                        {this.state.ownedCourseList.length > 0?ownedCourseListNodes:(<div className="my_course_no_course" style={{width:"100%"}}>暂无课程</div>)}
                    </div>
                </div>
            </div>
        );
    }
}