/**
 * Created by Liudq on 2019-08-04
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {orderService} from "../../service/OrderService";
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {HB} from '../../util/HB';
import paySuccessStyle from './paySuccessStyle.css';

export class PaySuccessView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orderProduct:orderService.getOrderProduct()
        }
    }
    componentDidMount() {
        HB.save.setStorage({redirect:"user"});
    }

    render() {
        return (
            <div>
                <div className="wrap"></div>
                <HeaderView history={this.props.history} title={"支付成功"} userInfo={userService.getUser().userInfo}/>
                <div className="pay_success_main">
                    <div className="pay_success_body_box">
                        <div className="pay_success_body_box_inner">
                            <div className="pay_success_body_box_inner_left">
                                <div className="pay_success_body_box_inner_left_pay_info">
                                    <div className="pay_success_body_box_inner_left_pay_info_title">恭喜您购买成功</div>
                                    <div>{this.state.orderProduct.name}</div>
                                </div>
                                <div className="pay_success_body_box_inner_left_links">
                                    <div className="pay_success_body_box_inner_left_link_list">
                                        <Link
                                            to="/studyCourseCenter/myCourseList"
                                            className="pay_success_body_box_inner_left_link_item">查看课程 ></Link>
                                        <Link to="/user/orderList" className="pay_success_body_box_inner_left_link_item">查看订单 ></Link>
                                        <Link to="/selectCourseCenter" className="pay_success_body_box_inner_left_link_item">继续选课 ></Link>
                                    </div>
                                    <Link to="/downLoad" className="pay_success_body_download_btn">下载客户端去上课</Link>
                                </div>
                            </div>
                            <div className="pay_success_body_box_inner_right">
                                <div>关注松鼠编程服务号，及</div>
                                <div>时获取上课提醒</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}