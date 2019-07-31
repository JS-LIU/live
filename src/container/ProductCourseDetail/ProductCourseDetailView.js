/**
 * Created by Liudq on 2019-07-29
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {courseService} from "../../service/CourseService";

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
    render() {
        if(!this.state.course){
            return null;
        }
        return(
            <div>
                {this.state.course.getDetail().name}
                <Link to={"/confirmOrder/" + `${this.productCourseNo}`}>购买学习</Link>
            </div>
        )

    }
}