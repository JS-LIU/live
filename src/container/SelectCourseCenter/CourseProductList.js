/**
 * Created by Liudq on 2019-07-28
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import courseProductList from './courseProductList.css';
export class CourseProductList extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let courseNodes = this.props.courseList.map((course,index)=>{
            let teacherNodes = course.teacherInfoList.map((teacher,index)=>{
                return (
                    <div key={index}>
                        <img src={teacher.headImgUrl} alt=""/>
                        <div>{teacher.teacherName}</div>
                    </div>
                )
            });

            return(
                <div key={index}>
                    <Link to={"/productCourseDetail/"+`${course.goodNo}`}>
                        <div>{course.name}</div>
                        <div>{course.startTime}-{course.endTime}</div>
                        {teacherNodes}
                        <div>
                            <div>共{course.totalLessonNum}</div>
                            <div>¥{course.salePrice}元</div>
                        </div>
                    </Link>
                </div>
            )
        });
        return(
            <div className="course_list" onScrollCapture={this.props.onGetMore}>
                {courseNodes}
            </div>
        )
    }


}
