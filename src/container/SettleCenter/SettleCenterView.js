/**
 * Created by Liudq on 2019-07-30
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {orderService} from "../../service/OrderService";
import {courseService} from "../../service/CourseService";
import {payService} from "../../service/PayService";
import settleCenterStyle from './settleCenterStyle.css';
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";

export class SettleCenterView extends Component{
    constructor(props) {
        super(props);
        this.productCourseNo = this.props.match.params.productCourseNo;
        this.productCourse = courseService.findProductCourseByCourseNo(this.productCourseNo);
        this.state = {
            productCourse:this.productCourse
        }
    }
    componentDidMount() {
        this.setState({
            productCourse:this.productCourse
        });
    }
    createOrder(){
        orderService.createOrder(this.productCourse).then((info)=>{
            payService.createPay(info.payModels);
            this.props.history.push('/pay')
        });
    }
    render() {
        if(!this.state.productCourse){
            return null;
        }
        let teacherNodes = this.state.productCourse.teacherInfoList.map((teacher,index)=>{
            return (
                <span className="settle_product_course_teacher_name" key={index}>{teacher.teacherName}</span>
            )
        });
        return(
            <div>
                <div className="wrap"></div>
                <HeaderView userInfo={userService.getUser().userInfo}/>
                <div className="settle_main">
                    <div className="settle_course_title">课程信息</div>
                    <div className="product_course_pay_info">
                        <div className="product_course_pay_info_box">
                            <ul className="settle_product_course_info">
                                <li>课程名称：{this.state.productCourse.name}</li>
                                <li>授课老师：{teacherNodes}</li>
                                <CourseTimeShowView
                                    style={{
                                        display:"flex",
                                        flexDirection: "row",
                                        fontSize: "0.14rem",
                                        color:"#000000",
                                    }}
                                    showTimeStepEnd={true}
                                    timeType={"common"}
                                    timeStep={this.state.productCourse.timeList}
                                    startTime={this.state.productCourse.startTime}
                                    endTime={this.state.productCourse.endTime}
                                />
                                {/*<li>上课时间：{this.state.productCourse.startTime}~{this.state.productCourse.endTime}</li>*/}
                            </ul>
                            <div className="settle_product_course_info_price">课程价格：{this.state.productCourse.salePrice / 100}</div>
                        </div>
                    </div>

                    <div className="settle_pay_title">订单结算</div>
                    <div className="settle_info_box">
                        <ul className="settle_info_list">
                            <li className="settle_info_item">
                                <div>商品金额：</div>
                                <div>￥{this.state.productCourse.salePrice / 100}</div>
                            </li>
                            <li className="settle_info_item">
                                <div>优惠减免：</div>
                                <div>￥0.00</div>
                            </li>
                            <li className="settle_info_item">
                                <div>合计金额：</div>
                                <div>￥{this.state.productCourse.salePrice / 100}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="settle_real_price_box">
                        <div className="settle_real_price_info">
                            <div className="settle_real_price_title">实付款：</div>
                            <div className="settle_real_price">￥{this.state.productCourse.salePrice / 100}</div>
                        </div>
                    </div>
                    <div className="create_order_btn_box">
                        <div onClick={this.createOrder.bind(this)} className="create_order_btn">立即购买</div>
                    </div>
                </div>
            </div>
        )
    }
}
