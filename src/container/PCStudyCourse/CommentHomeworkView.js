/**
 * Created by Liudq on 2019/9/20
 */

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import commentHomeworkStyle from './commentHomeworkStyle.css';
export class CommentHomeworkView extends Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        if(this.props.commentInfo.courseType !== 3){
            new Aliplayer({
                id: "J_comment_homework_video",
                vid : this.props.commentInfo.aliVodId,
                playauth : this.props.commentInfo.playAuth,
                width:'6.2rem',
                height:'3.68rem',
                position:"absolute",
                controlBarVisibility:'hover',
                diagnosisButtonVisible:false,
                autoplay: true
            });
        }else{
            $LAB.script("http://static.vipcode.com/sdk/lib.min.js").wait(()=>{
                let scratchPlayer = new ScratchMobile({
                    canvas:"J_scratch_video"
                });
                scratchPlayer.loadProject(self.props.commentInfo.codePath, function(){
                    scratchPlayer.greenFlag();
                });
            });
        }
    }
    closeHomeworkDialog(){
        this.props.closeHomeworkDialog();
    }
    render() {
        return (
            <div className="comment_homework_dialog">
                <div className="comment_homework_wrap" />
                <div className="comment_homework_dialog_main">
                    <div className="comment_homework_dialog_main_title">
                        <div>{this.props.courseName}</div>
                        <div className="comment_homework_dialog_main_close_dialog_btn" onClick={this.closeHomeworkDialog.bind(this)}/>
                    </div>
                    <div className="comment_homework_dialog_main_scroll">
                        <div id="J_comment_homework_video" className="comment_homework_player" />
                        <canvas id="J_scratch_video" className="comment_homework_player"/>
                        {this.props.commentInfo.hasComment?<div className="comment_homework_info_list">
                                <span className="comment_homework_describe_title">作业简介</span>
                                <div className="comment_homework_info_text">{this.props.commentInfo.describe}</div>
                                <span className="comment_homework_auditContent_title">老师点评</span>
                                <div className="comment_homework_info_text">{this.props.commentInfo.auditContent}</div>
                            </div>
                            :null}
                    </div>
                </div>
            </div>
        );
    }

}