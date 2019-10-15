/**
 * Created by Liudq on 2019-07-24
 */

/**
 * 基础代码来源 http://react-component.github.io/calendar/examples/week.html
 * moment.js使用教程
 */
import 'rc-calendar/assets/index.css';
import React, {Component} from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import 'moment/locale/en-gb';
import {baseUrl} from "../config/config";
import calenderViewStyle from './calenderViewStyle.css';

const format = 'YYYY-MM-DD';
const cn = location.search.indexOf('cn') !== -1;
const mdFormat = "MM.DD";



const style = `
.week-calendar {
  width: 386px;
}
.week-calendar .rc-calendar-tbody > tr:hover
.rc-calendar-date {
  background: #ebfaff;
}

.week-calendar .rc-calendar-tbody > tr:hover
.rc-calendar-selected-day .rc-calendar-date {
    background: #3fc7fa;
}

.week-calendar .week-calendar-sidebar {
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  width:100px;
  border-right: 1px solid #ccc;
}
.week-calendar .rc-calendar-panel {
  margin-left: 100px;
}
`;

export class CalenderView extends Component {
    constructor(props) {
        super(props);
        this.now = moment();
        this.state = {
            open: false,
            value: this.now
        };
        this.recordWeek = 0;
    }
    onOpenChange(open) {
        this.setState({
            open: open,
        });
    }

    onChange(value) {
        this.setState({
            value: value,
        });
        // this.props.weekData.startTime = value.week(value.week()).startOf('week').format(format);
        // this.props.weekData.endTime = value.week(value.week()).endOf('week').format(format);
        // this.props.onChangeTime();
        this.resetWeek(value);
    }

    dateRender(current) {
        const selectedValue = this.state.value;
        if (selectedValue && current.year() === selectedValue.year() &&
            current.week() === selectedValue.week()) {
            return (
                <div className="rc-calendar-selected-day">
                    <div className="rc-calendar-date">
                        {current.date()}
                    </div>
                </div>)
        }
        return (
            <div className="rc-calendar-date">
                {current.date()}
            </div>)
    }

    resetWeek(value){
        this.props.weekData.startTime = value.week(value.week()).startOf('week').format(format);
        this.props.weekData.endTime = value.week(value.week()).endOf('week').format(format);
        this.props.onChangeTime();
    }
    nextWeek(value){
        return ()=>{
            value.add(1, 'weeks');
            this.setState({
                value,
                open: false,
            });
            // this.onOpenChange(false);
            this.recordWeek++;
            this.resetWeek(value);
        }
    }
    lastWeek(value){
        return ()=>{
            value.add(-1, 'weeks');
            this.setState({
                value,
                open: false,
            });
            // this.recordWeek--;
            // this.onOpenChange(false);
            this.resetWeek(value);
        }
    }

    openCalender(){
        let open = !this.state.open;
        this.setState({
            open: open
        });
    }
    render() {
        const state = this.state;
        const calendar = (
            <Calendar
                className="week-calendar"
                dateRender={this.dateRender.bind(this)}
                locale={zhCN}
                style={{top:"0.3rem"}}
                showDateInput={false}
            />);
        return (
            <DatePicker
                // onOpenChange={this.onOpenChange.bind(this)}
                open={this.state.open}
                animation="slide-up"
                calendar={calendar}
                value={state.value}
                onChange={this.onChange.bind(this)}
            >
                {
                    ({value}) => {
                        this.props.weekData.startTime = value.week(value.week()).startOf('week').format(format);
                        this.props.weekData.endTime = value.week(value.week()).endOf('week').format(format);
                        return (
                            <div style={calendar_show}>
                                <div className="calender_last_week_btn" onClick={this.lastWeek(value)} />
                                <div className="week_show" onClick={this.openCalender.bind(this)}>
                                    <div>
                                        {value.week(value.week()).startOf('week').format(mdFormat)}
                                    </div>
                                    <div>-</div>
                                    <div>
                                        {value.week(value.week()).endOf('week').format(mdFormat)}
                                    </div>
                                </div>

                                <div className="calender_next_week_btn" onClick={this.nextWeek(value)} />
                            </div>
                        );
                    }
                }
            </DatePicker>)
    }
}

const calendar_show = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "1.91rem",
    fontSize: "0.16rem",
    color: "#000000",
    zIndex:"9999"
};
