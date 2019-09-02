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
            productCourse:null
        }
    }
    componentDidMount() {

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
    render() {
        if(!this.state.productCourse){
            return null;
        }
        // let teacherNodes = this.state.productCourse.teacherInfoList.map((teacher,index)=>{
        //     return (
        //         <span className="settle_product_course_teacher_name" key={index}>{teacher.teacherName}</span>
        //     )
        // });
        let productCourseModule = this.productCourse.getModule.before((repairParam)=>{
            repairParam.startTime = this.productCourse.courseInfo.getStartTimeToShow("unix");
            repairParam.endTime = this.productCourse.courseInfo.getEndTimeToShow("unix");
        }).call(this.productCourse,{});
        return(
            <div>
                <div className="wrap" />
                <HeaderView history={this.props.history} title={"结算中心"} userInfo={userService.getUser().userInfo}/>
                <div className="settle_main">
                    <div className="settle_course_title">课程信息</div>
                    <div className="product_course_pay_info">
                        <div className="product_course_pay_info_box">
                            <ul className="settle_product_course_info">
                                <li>课程名称：{productCourseModule.courseName}</li>
                                <li>授课老师：{productCourseModule.teacherInfo.teacherName}</li>
                                <CourseTimeShowView
                                    style={{
                                        display:"flex",
                                        flexDirection: "row",
                                        fontSize: "0.14rem",
                                        color:"#000000",
                                    }}
                                    showTimeStepEnd={true}
                                    timeStep={productCourseModule.timeList}
                                    startTime={productCourseModule.startTime}
                                    endTime={productCourseModule.endTime}
                                />
                            </ul>
                            <div className="settle_product_course_info_price">课程价格：{productCourseModule.salePrice / 100}</div>
                        </div>
                    </div>

                    <div className="settle_pay_title">订单结算</div>
                    <div className="settle_info_box">
                        <ul className="settle_info_list">
                            <li className="settle_info_item">
                                <div>商品金额：</div>
                                <div>￥{productCourseModule.salePrice / 100}</div>
                            </li>
                            <li className="settle_info_item">
                                <div>优惠减免：</div>
                                <div>￥0.00</div>
                            </li>
                            <li className="settle_info_item">
                                <div>合计：</div>
                                <div>￥{productCourseModule.salePrice / 100}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="settle_real_price_box">
                        <div className="settle_real_price_info">
                            <div className="settle_real_price_title">实付款：</div>
                            <div className="settle_real_price">￥{productCourseModule.salePrice / 100}</div>
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
