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
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();


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
        this.state = {
            open: false,
            value: now
        };
    }

    onOpenChange(open) {
        this.setState({
            open: open,
        });
    }

    onChange(value) {
        this.props.onChangeTime(this.props.weekCourseData.startTime,this.props.weekCourseData.endTime);
        this.setState({
            value,
        });
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

    render() {
        const state = this.state;
        const calendar = (
            <Calendar
                className="week-calendar"
                dateRender={this.dateRender.bind(this)}
                locale={zhCN}
                style={{zIndex: 1000}}
                // defaultValue={now}
                showDateInput={false}
            />);
        return (<div style={{width: 400, margin: 20,display:"flex",justifyContent:"center"}}>
            <div style={{
                boxSizing: 'border-box',
                position: 'relative',
                display: 'block',
                lineHeight: 1.5,
                marginBottom: 22,
            }}
            >
                <DatePicker
                    onOpenChange={this.onOpenChange.bind(this)}
                    open={this.state.open}
                    animation="slide-up"
                    calendar={calendar}
                    value={state.value}
                    onChange={this.onChange.bind(this)}
                >
                    {
                        ({value}) => {
                            this.props.weekCourseData.startTime = value.week(value.week()).startOf('week').format(format);
                            this.props.weekCourseData.endTime = value.week(value.week()).endOf('week').format(format);

                            return (
                                <div tabIndex="0" style={calendar_show}>
                                    <div >
                                        {this.props.weekCourseData.startTime}
                                    </div>
                                    <div>-</div>
                                    <div >
                                        {this.props.weekCourseData.endTime}
                                    </div>
                                </div>
                            );
                        }
                    }
                </DatePicker>
            </div>
        </div>)
    }
}
const calendar_show = {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    width:"1.91rem",
    fontSize:"0.16rem",
    color:"#000000",
    background:"url('../src/img/calendar_icon.png') no-repeat right center",
    backgroundSize:"0.21rem",
    paddingRight:"0.3rem"
};
