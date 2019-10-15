/**
 * Created by Liudq on 2019/10/11
 */
import React, {Component} from 'react';
import homeViewDialogViewStyle from './homeViewDialogViewStyle.css';
export class HomeViewDialogView extends Component{
    constructor(props) {
        super(props);
    }
    closePlanItem(){
        this.props.closePlanItem()
    }
    render() {
        return(
            <div className="plan_item_dialog">
                <div className="plan_item_dialog_wrap"></div>
                <div className="plan_item_dialog_content">
                    <div className="close_plan_item_dialog" onClick={this.closePlanItem.bind(this)}></div>
                    <div className="plan_item_dialog_title" style={{background:this.props.planItem.background}}>
                        <div className="plan_item_dialog_title_text_sub">学习目标</div>
                        <div className="plan_item_dialog_title_text">{this.props.planItem.titleText}</div>
                    </div>
                    {this.props.planItem.contentInfo()}
                </div>
            </div>
        )
    }
}