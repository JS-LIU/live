/**
 * Created by Liudq on 2019-07-30
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {orderService} from "../../service/OrderService";
import {courseService} from "../../service/CourseService";
import {payService} from "../../service/PayService";

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
        return(
            <div>
                {this.state.productCourse.name}
                <div>微信支付</div>
                <div>{this.state.productCourse.salePrice / 100}</div>
                <div onClick={this.createOrder.bind(this)}>立即购买</div>
            </div>
        )
    }
}
