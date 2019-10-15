/**
 * Created by Liudq on 2019/9/21
 */
import React, {Component} from 'react';
import showLectureStyle from './showLectureStyle.css';
export class ShowLectureView extends Component{
    constructor(props) {
        super(props);
    }
    closeLectureDialog(){
        this.props.closeLectureDialog();
    }
    render() {
        return (
            <div className="lecture_dialog">
                <div className="lecture_wrap" />
                <div className="lecture_main">
                    <div className="lecture_main_main_title">
                        <div>{this.props.courseName}</div>
                        <div className="lecture_main_close_dialog_btn" onClick={this.closeLectureDialog.bind(this)}/>
                    </div>
                    <iframe src={this.props.lectureUrl} className="lecture_frame"/>
                </div>
            </div>
        );
    }
}