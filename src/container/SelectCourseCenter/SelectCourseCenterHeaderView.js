/**
 * Created by Liudq on 2019-07-25
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class SelectCourseCenterHeaderView extends Component{
    constructor(props) {
        super(props);
    }
    onSelectSpecifyType(specifyCourse){
        return ()=>{
            this.props.onSelectSpecifyType(specifyCourse);
        }

    }
    render() {
        let generalNodes = this.props.courseTypeList.map((generalCourseType,index)=>{
            let specifyNodes = generalCourseType.specifyCourseTypeList.map((specifyCourseType,index)=>{
                return (
                    <span key={index} style={specifyCourseType.selected?selectedStyle:{}} onClick={this.onSelectSpecifyType(specifyCourseType)}>{specifyCourseType.name}</span>
                )
            });
            return (
                <div key={index}>
                    <span>{generalCourseType.name}</span>
                    {specifyNodes}
                </div>
            )
        });
        return(
            <div>
                {generalNodes}
            </div>
        )
    }
}
const selectedStyle = {
    color:"#399cfe"
};