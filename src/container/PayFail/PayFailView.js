/**
 * Created by Liudq on 2019-08-04
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {orderService} from "../../service/OrderService";
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import payFailStyle from './payFailStyle.css';
export class PayFailView extends Component{
    constructor(props) {
        super(props);
        this.status = this.props.match.params.status;
    }
    reSelectCourse(){
        this.props.history.replace("/selectCourseCenter");
    }
    render() {
        return (
            <div>
                <div className="wrap"/>
                <HeaderView userInfo={userService.getUser().userInfo}/>
                <div className="pay_fail_main">
                    <div className="pay_fail_tips">
                        <div className="pay_fail_tips_top">
                            <div className="pay_fail_tips_title">支付失败</div>
                            <div className="pay_fail_tips_reason">很抱歉，订单{orderService.getOrder().getOrderStatus(this.status)}，请重新支付</div>
                        </div>
                        <div onClick={this.reSelectCourse} className="pay_fail_reselect_course_btn">重新报名</div>
                    </div>
                </div>

            </div>
        );
    }
}