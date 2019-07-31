/**
 * Created by Liudq on 2019-07-28
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import courseProductList from './courseProductList.css';
import product_course_python_header_bg from "../../img/product_course_python_header_bg.png";
export class CourseProductList extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let courseNodes = this.props.courseList.map((course,index)=>{
            let teacherNodes = course.teacherInfoList.map((teacher,index)=>{
                return (
                    <div key={index} className="course_product_item_body_teacher_item">
                        <div className="course_product_item_body_teacher_item_pic_box">
                            <img src={teacher.headImgUrl} alt="" className="course_product_item_body_teacher_item_header_img"/>
                        </div>
                        <div className="course_product_item_body_teacher_info">
                            <div className="course_product_item_body_teacher_info_job">主讲</div>
                            <div className="course_product_item_body_teacher_info_name">{teacher.teacherName}</div>
                        </div>
                    </div>
                )
            });
            console.log(course.bgStyle);
            return(
                <div key={index} className="course_product_item">
                    <Link to={"/productCourseDetail/"+`${course.goodNo}`}>
                        <div className="course_product_item_header" style={{
                            background:"#00b7ba url(../../img/product_course_python_header_bg.png) no-repeat cover"
                        }}>
                            <div className="course_product_item_header_box">
                                <div className="course_product_item_title">{course.name}</div>
                                <div className="course_product_item_time">{course.startTime}-{course.endTime}</div>
                            </div>
                        </div>
                        <div className="course_product_item_body">
                            {teacherNodes}
                        </div>
                        <div className="course_product_item_footer">
                            <div className="course_product_item_footer_box">
                                <div className="course_product_item_footer_total_course">共计{course.totalLessonNum}课时</div>
                                <div className="course_product_item_footer_course_price">¥{course.salePrice / 100}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        });
        return(
            <div className="course_product_list" onScrollCapture={this.props.onGetMore}>
                {courseNodes}
            </div>
        )
    }
}