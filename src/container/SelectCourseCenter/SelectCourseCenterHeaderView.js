/**
 * Created by Liudq on 2019-07-25
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import selectCourseTypeListStyle from './selectCourseTypeListStyle.css'

export class SelectCourseCenterHeaderView extends Component{
    constructor(props) {
        super(props);
    }
    onSelectSpecifyType(specifyCourse){
        return ()=>{
            this.props.onSelectSpecifyType(specifyCourse);
        }
    }
    onSelectAll(generalCourseType){
        return ()=>{
            this.props.onSelectAll(generalCourseType);
        }
    }
    render() {
        let generalNodes = this.props.courseTypeList.map((generalCourseType,index)=>{
            let specifyNodes = generalCourseType.specifyCourseTypeList.map((specifyCourseType,index)=>{
                return (
                    <span key={index} className="select_course_center_specify_type" style={specifyCourseType.selected?selectedStyle:{}} onClick={this.onSelectSpecifyType(specifyCourseType)}>{specifyCourseType.name}</span>
                )
            });
            return (
                <div key={index} className="select_course_center_type_line">
                    <div className="select_course_center_general_type">{generalCourseType.name}</div>
                    <div className="select_course_center_specify_line">
                        <span className="select_course_center_specify_type" onClick={this.onSelectAll(generalCourseType)} style={generalCourseType.selected?selectedStyle:{}}>所有</span>
                        {specifyNodes}
                    </div>
                </div>
            )
        });
        return(
            <div className="select_course_center_type">
                <div className="select_course_center_type_list_box">
                    {generalNodes}
                </div>

            </div>
        )
    }
}
const selectedStyle = {
    color:"#FFC200",
};