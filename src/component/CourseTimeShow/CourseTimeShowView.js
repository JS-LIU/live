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
            // weekItem.week = (weekItem.week === 0? 7:weekItem.week);
            let endTime = null;
            if(this.props.showTimeStepEnd){
                endTime = (
                    <div>-{weekItem.periodEndTime}</div>
                )
            }
            return (
                <div key={index} className="time_list_item">
                    <div>周{weekItem.week} {weekItem.periodStartTime}</div>
                    {endTime}
                </div>
            )
        });
        // TimeManager.convertStampToMD(this.props.startTime,this.props.timeType);
        return (
            <div style={this.props.style}>
                <div>
                    {this.props.startTime}-{this.props.endTime}
                </div>
                <div className="time_list">
                    {weekDayNodes}
                </div>
            </div>
        );
    }
}