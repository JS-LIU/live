/**
 * Created by Liudq on 2019-08-04
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {orderService} from "../../service/OrderService";
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {HB} from "../../util/HB";
import payFailStyle from './payFailStyle.css';
export class PayFailView extends Component{
    constructor(props) {
        super(props);
        // this.status = this.props.match.params.status;
    }
    reSelectCourse(){
        this.props.history.replace("/selectCourseCenter");
    }
    componentDidMount() {
        HB.save.setStorage({redirect:"user"});
    }

    render() {
        return (
            <div>
                <div className="wrap"/>
                <HeaderView userInfo={userService.user.getUserInfo()}/>
                <div className="pay_fail_main">
                    <div className="pay_fail_tips">
                        <div className="pay_fail_tips_top">
                            <div className="pay_fail_tips_title">支付失败</div>
                            <Link to="/user/orderList" className="pay_fail_tips_reason">很抱歉，已超过订单支付时间限制，请从重新报名</Link>
                        </div>
                        <div onClick={this.reSelectCourse.bind(this)} className="pay_fail_reselect_course_btn">重新报名</div>
                    </div>
                </div>

            </div>
        );
    }
}