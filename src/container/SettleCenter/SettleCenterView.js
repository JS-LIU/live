/**
 * Created by Liudq on 2019-07-30
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {orderService} from "../../service/OrderService";
import {courseService} from "../../service/CourseService";
import {payService} from "../../service/PayService";
import {HB} from "../../util/HB";
import settleCenterStyle from './settleCenterStyle.css';
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";

export class SettleCenterView extends Component{
    constructor(props) {
        super(props);
        let locationSearch = this.props.location.search;
        this.productCourseNo = HB.url.getSearchKeyByLocationSearch(locationSearch,"productCourseNo");
        this.requestWay = HB.url.getSearchKeyByLocationSearch(locationSearch,"requestWay")||"preOrder";
        this.orderNo = HB.url.getSearchKeyByLocationSearch(locationSearch,"orderNo");
        this.productCourse = courseService.findProductCourseByCourseNo(this.productCourseNo);
        this.state = {
            useCouponList:[],
            couponList: [],
            canUseCouponList: [],
            balance: 0,
            realPay: 0,
            order: {},
            orderCourse:null,
            couponReduceCash:"",
            useBalance:true,
            showCouponList:false,
        }
    }
    componentDidMount() {
        orderService.preOrder(this.requestWay, this.productCourseNo, this.orderNo).then((preOrderInfo)=>{
            let settleManager = preOrderInfo.settleManager;
            let orderCourse = preOrderInfo.order.orderCourse.getModule.before((repairParam)=>{
                repairParam.startTime = preOrderInfo.order.orderCourse.courseInfo.getStartTimeToShow("unix");
                repairParam.endTime = preOrderInfo.order.orderCourse.courseInfo.getStartTimeToShow("unix");
                repairParam.showSellPrice = (preOrderInfo.order.orderCourse.sellPrice / 100).toFixed(2)
            }).call(preOrderInfo.order.orderCourse,{});
            console.log("orderCourse:====",orderCourse);
            this.setState({
                useCouponList: settleManager.couponManager.getDefCouponList(),
                canUseCouponList: settleManager.couponManager.canUseCouponList,
                balance: (settleManager.getMaxCanUseBalance() / 100).toFixed(2),
                realPay: (settleManager.calcRealPay() / 100).toFixed(2),
                couponReduceCash: (settleManager.getCouponReduceCash() / 100).toFixed(2),
                orderCourse: orderCourse,
                order: preOrderInfo.order,
                couponList: settleManager.couponManager.couponList
            });
        });
        this.setState({
            productCourse:this.productCourse
        });
    }
    createOrder(){
        orderService.createOrder(this.state.productCourse).then((info)=>{
            payService.createPay(info.payModels);
            this.props.history.push('/pay')
        }).catch((msg)=>{
            alert(msg)
        })
    }
    onToggleUseBalance(){
        orderService.toggleUseBalance().then((settleManager)=>{
            this.setState({
                useBalance: (settleManager.account.useBalance/100).toFixed(2),
                balance: (settleManager.getMaxCanUseBalance()/100).toFixed(2),
                realPay: (settleManager.calcRealPay()/100).toFixed(2),
            })
        });
    }
    onSelectCoupon(accountCouponNo){
        return ()=>{
            orderService.toggleSelectCoupon(accountCouponNo).then((settleManager)=>{
                this.setState({
                    useCouponList: settleManager.couponManager.couponList,
                    realPay: (settleManager.calcRealPay()/100).toFixed(2),
                    couponReduceCash: (settleManager.getCouponReduceCash()/100).toFixed(2),
                    couponList: settleManager.couponManager.couponList
                })
            });
        }

    }
    render() {
        if(!this.state.orderCourse){
            return null;
        }
        let couponList = this.state.couponList.map((couponItem,index)=>{
            return (<div className="coupon"
                         onClick={this.onSelectCoupon(couponItem.accountCouponNo)}
                         key={index}>
                {couponItem.selected?<div className="selected_coupon">
                    <div className="coupon_price">￥{couponItem.cash / 100}</div>
                    <div className="coupon_name">{couponItem.name}</div>
                    <div className="coupon_end_time">有效期至{couponItem.endTime}</div>
                    <div className="coupon_sub_limit">仅适用于正课</div>
                </div>:null}
                {!couponItem.selected?<div className="unselected_coupon">
                    <div className="coupon_price">￥{couponItem.cash / 100}</div>
                    <div className="coupon_name">{couponItem.name}</div>
                    <div className="coupon_end_time">有效期至{couponItem.endTime}</div>
                    <div className="coupon_sub_limit">仅适用于正课</div>
                </div>:null}
                {couponItem.couponStatus === 0?<div className="cant_use_coupon">
                    <div className="coupon_price">￥{couponItem.cash / 100}</div>
                    <div className="coupon_name">{couponItem.name}</div>
                    <div className="coupon_end_time">有效期至{couponItem.endTime}</div>
                    <div className="coupon_sub_limit">仅适用于正课</div>
                </div>:null}
            </div>)
        });
        return(
            <div>
                <div className="wrap" />
                <HeaderView history={this.props.history} title={"结算中心"} userInfo={userService.user.getUserInfo()}/>
                <div className="settle_main">
                    <div className="settle_course_title">课程信息</div>
                    <div className="product_course_pay_info">
                        <div className="product_course_pay_info_box">
                            <ul className="settle_product_course_info">
                                <li>课程名称：{this.state.orderCourse.courseName}</li>
                                <li>授课老师：{this.state.orderCourse.teacherInfo.teacherName}</li>
                                <CourseTimeShowView
                                    style={{
                                        display:"flex",
                                        flexDirection: "row",
                                        fontSize: "0.14rem",
                                        color:"#000000",
                                    }}
                                    showTimeStepEnd={true}
                                    timeStep={this.state.orderCourse.timeList}
                                    startTime={this.state.orderCourse.startTime}
                                    endTime={this.state.orderCourse.endTime}
                                />
                            </ul>
                            <div className="settle_product_course_info_price">课程价格：{this.state.orderCourse.showSellPrice}</div>
                        </div>
                    </div>
                    <div className="settle_coupon_list_box">
                        <div className="settle_coupon_title">代金券</div>
                        <div className="settle_coupon_list">
                            {couponList}
                        </div>
                    </div>
                    <div className="settle_pay_title">订单结算</div>
                    <div className="settle_info_box">
                        <ul className="settle_info_list">
                            <li className="settle_info_item">
                                <div>商品金额：</div>
                                <div>￥{this.state.orderCourse.showSellPrice}</div>
                            </li>
                            <li className="settle_info_item">
                                <div>优惠减免：</div>
                                <div>￥{this.state.couponReduceCash}</div>
                            </li>
                            <li className="settle_info_item">
                                <div>合计：</div>
                                <div>￥{this.state.realPay}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="settle_real_price_box">
                        <div className="settle_real_price_info">
                            <div className="settle_real_price_title">实付款：</div>
                            <div className="settle_real_price">￥{this.state.realPay}</div>
                        </div>
                    </div>
                    <div className="create_order_btn_box">
                        <div onClick={this.createOrder.bind(this)} className="create_order_btn">提交订单</div>
                    </div>
                </div>
            </div>
        )
    }
}
