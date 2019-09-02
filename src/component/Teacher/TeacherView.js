/**
 * Created by Liudq on 2019/9/2
 */
import React, {Component} from 'react';
import teacherStyle from './teacherStyle.css';
export class TeacherView extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="teacher" style={this.props.teacherStyle}>
                <div className="teacher_pic_box">
                    <img src={this.props.headImgUrl}
                         alt=""
                         className="teacher_header_img"/>
                </div>
                <div className="teacher_info">
                    <div className="teacher_info_job">{this.props.teacherTitle}</div>
                    <div className="teacher_info_name" style={this.props.teacherNameStyle}>{this.props.teacherName}</div>
                </div>
            </div>
        );
    }
}