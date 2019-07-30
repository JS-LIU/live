/**
 * Created by Liudq on 2019-07-29
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {courseService} from "../../service/CourseService";
import {orderService} from "../../service/OrderService";

export class ProductCourseDetailView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            course:null
        };
        this.productCourseNo = this.props.match.params.productCourseNo;
    }
    componentDidMount() {

        courseService.getProductCourseDetail(this.productCourseNo).then((course)=>{
            this.setState({
                course:course
            })
        });

    }
    createOrder(){
        orderService.createOrder(this.state.course);
    }
    render() {
        if(!this.state.course){
            return null;
        }
        return(
            <div>

                {this.state.course.getDetail().name}
                <div  onClick={this.createOrder.bind(this)}>购买学习</div>
            </div>
        )

    }
}