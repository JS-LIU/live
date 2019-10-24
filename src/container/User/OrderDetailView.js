/**
 * Created by Liudq on 2019-08-12
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {orderService} from "../../service/OrderService";
import {TimeManager} from "../../entity/TimeManager";
import orderDetailStyle from './orderDetailStyle.css';
import {baseUrl} from "../../config/config";
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";
import {HB} from '../../util/HB';

export class OrderDetailView extends Component{
    constructor(props) {
        super(props);
        this.orderNo = this.props.match.params.orderNo;
        this.state = {
            orderInfo: null
        }
    }
    componentDidMount() {
        orderService.queryOrderDetail(this.orderNo).then((orderInfo)=>{
            orderInfo.orderCourseModule = orderInfo.orderCourse.getModule.before((repairParam)=>{
                repairParam.startTime = orderInfo.orderCourse.courseInfo.getStartTimeToShow("common");
                repairParam.endTime = orderInfo.orderCourse.courseInfo.getEndTimeToShow("common");
            }).call(orderInfo.orderCourse,{});
            this.setState({
                orderInfo:orderInfo
            });
        });
        // HB.save.setStorage({redirect:"orderDetail/",orderNo:this.orderNo});
    }
    render() {
        if(!this.state.orderInfo){
            return null;
        }
        return (
            <div>
                <div className="order_detail_main">
                    <div className="order_detail_title">我的订单</div>
                    <div className="order_detail_product">
                        <div className="order_detail_product_header">
                            <div className="order_detail_product_header_payTime">
                                {TimeManager.convertStampToYMD(this.state.orderInfo.orderCreateTime,"unix")}
                            </div>
                            <div className="order_detail_product_header_orderNo">
                                订单号：{this.state.orderInfo.orderNo}
                            </div>
                        </div>
                        <div className="order_detail_product_info">
                            <div className="order_detail_product_info_left">
                                <div className="order_detail_product_info_left_top">
                                    <div className="order_detail_product_info_left_top_name" style={{background:"url('"+this.state.orderInfo.orderCourseModule.type.iconBackground +"') no-repeat left center",backgroundSize:"0.25rem"}}>{this.state.orderInfo.orderCourse.name}</div>
                                    <CourseTimeShowView
                                        style={{
                                            display:"flex",
                                            flexDirection: "row",
                                            fontSize: "0.12rem",
                                            marginTop: "0.15rem",
                                            paddingLeft:"0.35rem"
                                        }}
                                        showTimeStepEnd={false}
                                        timeType={"unix"}
                                        timeStep={this.state.orderInfo.orderCourseModule.timeList}
                                        startTime={this.state.orderInfo.orderCourseModule.startTime}
                                        endTime={this.state.orderInfo.orderCourseModule.endTime}
                                    />
                                </div>
                                <div className="order_detail_product_info_left_bottom">
                                    <div className="order_detail_product_info_left_bottom_teacher_list">
                                        <div className="order_detail_product_info_left_bottom_teacher">
                                            <div className="order_detail_product_teacher_header">
                                                <img src={this.state.orderInfo.orderCourseModule.teacherInfo.headImgUrl} className="order_detail_product_teacher_pic" alt=""/>
                                            </div>
                                            <div className="order_detail_product_teacher_info">
                                                <div className="order_detail_product_teacher_info_position">
                                                    主讲
                                                </div>
                                                <div className="order_detail_product_teacher_info_teacher_name">
                                                    {this.state.orderInfo.orderCourseModule.teacherInfo.teacherName}老师
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order_detail_product_info_left_bottom_teacher" style={{marginLeft:"0.35rem"}}>
                                            <div className="order_detail_product_teacher_header">
                                                <img src={this.state.orderInfo.orderCourseModule.assistantInfo.headImgUrl} className="order_detail_product_teacher_pic" alt=""/>
                                            </div>
                                            <div className="order_detail_product_teacher_info">
                                                <div className="order_detail_product_teacher_info_position">
                                                    助教
                                                </div>
                                                <div className="order_detail_product_teacher_info_teacher_name">
                                                    {this.state.orderInfo.orderCourseModule.assistantInfo.teacherName}老师
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="course_price">课程价格：￥{this.state.orderInfo.orderCourseModule.sellPrice / 100}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="order_info_list">
                        <li className="order_info_list_item">付款时间：{this.state.orderInfo.orderDetail.payTime}</li>
                        <li className="order_info_list_item">商品总价：{this.state.orderInfo.orderCourseModule.sellPrice / 100}</li>
                        <li className="order_info_list_item">付款方式：{this.state.orderInfo.orderDetail.payType}</li>
                        <li className="order_real_price">实付金额：￥{this.state.orderInfo.orderDetail.sellPrice}</li>
                    </ul>
                </div>
            </div>
        );
    }
}