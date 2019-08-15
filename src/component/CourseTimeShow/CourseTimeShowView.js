/**
 * Created by Liudq on 2019-08-13
 */
import React, {Component} from 'react';
import courseTimeShowStyle from './courseTimeShowStyle.css';
import {HB} from '../../util/HB';
import {TimeManager} from "../../entity/TimeManager";
export class CourseTimeShowView extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        let weekDayNodes = this.props.timeStep.map((weekItem,index)=>{
            let endTime = null;
            if(this.props.showTimeStepEnd){
                endTime = (
                    <div>-{weekItem.periodEndTime}</div>
                )
            }
            return (
                <div key={index} className="time_list_item">
                    <div>周{HB.valid.parseChinese(weekItem.week)[0]} {weekItem.periodStartTime}</div>
                    {endTime}
                </div>
            )
        });
        return (
            <div style={this.props.style}>
                <div>
                    {TimeManager.convertStampToMD(this.props.startTime,this.props.timeType)}-{TimeManager.convertStampToMD(this.props.endTime,this.props.timeType)}
                </div>
                <div className="time_list">
                    {weekDayNodes}
                </div>
            </div>
        );
    }
}