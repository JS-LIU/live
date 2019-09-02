/**
 * Created by Liudq on 2019-07-28
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import courseProductList from './courseProductListStyle.css';
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";
import {baseUrl} from "../../config/config";
import {TeacherView} from "../../component/Teacher/TeacherView";

export class CourseProductList extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let courseNodes = this.props.courseList.map((course,index)=>{
            let productModule = course.getModule.before((repairParam)=>{
                repairParam = repairParam || {};
                repairParam.startTime = course.courseInfo.getStartTimeToShow("unix");
                repairParam.endTime = course.courseInfo.getEndTimeToShow("unix");
            }).call(course,{});
            return(
                <div key={index} className="course_product_item">
                    <Link to={"/productCourseDetail/"+`${productModule.goodNo}`}>
                        <div className="course_product_item_header" style={{background:productModule.type.background}}>
                            <img src={productModule.type.url} alt="" className="course_product_item_header_bg" />
                            <div className="course_product_item_header_box">
                                <div className="course_product_item_title">{productModule.courseName}</div>
                                <CourseTimeShowView
                                    style={{
                                        display:"flex",
                                        flexDirection: "row",
                                        fontSize: "0.12rem",
                                        color:"#FFFFFF",
                                        marginTop: "0.15rem"
                                    }}
                                    showTimeStepEnd={false}
                                    // timeType={"unix"}
                                    timeStep={productModule.timeList}
                                    startTime={productModule.startTime}
                                    endTime={productModule.endTime}
                                />
                            </div>
                        </div>
                        <div className="course_product_item_body">
                            <TeacherView
                                teacherStyle={{marginLeft:"0.18rem"}}
                                teacherTitle={"主讲"}
                                headImgUrl={productModule.teacherInfo.headImgUrl}
                                teacherName={productModule.teacherInfo.teacherName}
                            />
                            <TeacherView
                                teacherStyle={{marginLeft:"0.18rem"}}
                                teacherTitle={"助教"}
                                headImgUrl={productModule.assistantInfo.headImgUrl}
                                teacherName={productModule.assistantInfo.teacherName}
                            />
                        </div>
                        <div className="course_product_item_footer">
                            <div className="course_product_item_footer_box">
                                <div className="course_product_item_footer_total_course">共计{productModule.totalLessonNum}课时</div>
                                <div className="course_product_item_footer_course_price">¥{productModule.salePrice / 100}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        });
        return(
            <div className="course_product_list">
                {courseNodes}
            </div>
        )
    }
}