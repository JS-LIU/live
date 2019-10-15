/**
 * Created by Liudq on 2019/9/4
 */
import React, {Component} from 'react';
import pcPreSessionVideoStyle from './pcPreSessionVideoStyle.css'
export class PCPreSessionVideoDialogView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showAnalysis:false,
            previewTopicList:this.props.preSessionVideo.previewTopicList,
            isCanSelected:false
        };
        this.myAnswerList=[];
    }
    componentDidMount() {
        new Aliplayer({
            id: "J_prismPlayer",
            vid : this.props.preSessionVideo.aliVodId,
            playauth : this.props.preSessionVideo.playAuth,
            width:'6.2rem',
            height:'3.68rem',
            position:"absolute",
            controlBarVisibility:'hover',
            diagnosisButtonVisible:false,
            autoplay: true
        });
    }
    closeDialog(){
        this.props.closeDialog();
    }
    confirmAnswer(){
        let previewTopicList =  this.state.previewTopicList;
        for(let i = 0;i <previewTopicList.length;i++){
            previewTopicList[i].correct = parseInt(previewTopicList[i].topicAnswer) === this.myAnswerList[i];
        }
        this.setState({
            showAnalysis:true,
            previewTopicList:previewTopicList,
            isCanSelected:true
        })
    }
    selectAnswer(subjectIndex,answerIndex){
        return ()=>{
            this.myAnswerList[subjectIndex] = answerIndex + 1;
        }
    }
    render() {
        let letter = ["A","B","C","D","E","F","G","H","I"];
        let subjectNodes = this.state.previewTopicList.map((subjectItem,index)=>{
            let optionNodes = subjectItem.topicOptionList.map((optionItem,j)=>{
                return (
                    <ul className="option_item_list" key={j}>
                        <li className="option_item_list_item">
                            <input
                                type="radio"
                                name={subjectItem.id}
                                className="option_item_list_item_num"
                                value={j}
                                disabled={this.state.isCanSelected}
                                onChange={this.selectAnswer(index,j)}
                            />
                            <div className="option_item_list_item_index">{letter[j]}</div>
                            <div className="option_item_list_item_content">{optionItem.option}</div>
                            {this.state.showAnalysis?<div className="option_item_list_item_analysis">解析：{optionItem.analyse}</div>:null}
                        </li>
                    </ul>
                )
            });
            return (
                <div className="subject_item" key={index}>
                    <div className="subject_question">
                        <div className="subject_question_item">
                            <div>{index+1}.</div>
                            <div>{subjectItem.topicName}</div>
                        </div>
                        {this.state.showAnalysis?(subjectItem.correct?<div className="correct_show">正确</div>:<div className="incorrect_show">错误</div>):null}
                    </div>
                    {optionNodes}
                </div>
            )
        });
        return (
            <div className="pc_pre_session_dialog">
                <div className="pc_pre_session_dialog_wrap" />
                <div className="pc_pre_session_dialog_main">
                    <div className="pc_pre_session_dialog_main_title">
                        <div>{this.props.courseName}</div>
                        <div className="pc_pre_session_dialog_main_close_dialog_btn" onClick={this.closeDialog.bind(this)}/>
                    </div>
                    <div className="pc_pre_session_dialog_main_scroll">
                        <div id="J_prismPlayer" className="pc_subject_audio_player" />
                        <div className="pc_pre_session_dialog_subject_list">
                            <span className="pc_pre_session_dialog_subject_list_title">选择题</span>
                            {subjectNodes}
                            <div className="confirm_pre_session_btn" onClick={this.confirmAnswer.bind(this)}>提交答案</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
