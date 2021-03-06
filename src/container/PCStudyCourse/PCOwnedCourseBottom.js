/**
 * Created by Liudq on 2019-08-13
 */
import React, {Component} from 'react';
import {RingProgressView} from "../../component/RingProgress/RingProgressView";
export class PCOwnedCourseBottom extends Component{
    constructor(props) {
        super(props);

    }
    getBottom(courseItem){
        return (
            <div className="my_owned_course_product_item_footer_total_course_proceed">
                <RingProgressView
                    unit={"rem"}
                    size={"0.2"}
                    borderWidth={"0.04"}
                    borderBg={"#E8E8E8"}
                    progressBorderBg={"#61BF55"}
                    nowProgress={courseItem.finishLessonNum}
                    totalProgress={courseItem.totalLessonNum}
                />
                <div className="my_owned_course_product_item_footer_total_course_proceed_text">
                    {courseItem.learnStatus.name === "正在学"?"已完成"+courseItem.finishLessonNum+"/"+courseItem.totalLessonNum+"节课":courseItem.learnStatus.name}</div>
            </div>
        )
    }

    render() {
        return (
            <div className="my_owned_course_product_item_footer">
                <div className="my_owned_course_product_item_footer_total_course">
                    {/*已完成{courseItem.finishLessonNum}/{courseItem.totalLessonNum}节课*/}
                    {this.getBottom(this.props.courseItem)}
                </div>
            </div>
        );
    }


}