/**
 * Created by Liudq on 2019-07-29
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {courseService} from "../../service/CourseService";
import productCourseDetailStyle from './productCourseDetailStyle.css';
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";

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
        let productCourseTeacherNodes = this.state.course.getDetail().teacherInfoList.map((teacher,index)=>{
            return (
                <div key={index} className="course_product_detail_teacher_info">
                    <div className="course_product_detail_teacher_item_header_img">
                        <img src={teacher.headImgUrl||"../src/img/def_header_img.png"} alt="" className="course_product_detail_teacher_item_header_img_pic"/>
                    </div>
                    <div className="course_product_detail_teacher_name_box">
                        <div>主讲教师</div>
                        <div>{teacher.teacherName}</div>
                    </div>
                </div>
            )
        });
        return(
            <div>
                <div className="wrap"></div>
                <HeaderView userInfo={userService.getUser().userInfo}/>
                <div className="product_course_detail_main">
                    <div className="crumbs">
                        首页 > 选课中心 > {this.state.course.name}
                    </div>
                    <div className="product_course_detail">
                        <div className="product_course_detail_info">
                            <div className="product_course_detail_top">
                                <div className="product_course_detail_header">
                                    <div className="product_course_detail_header_teacher_info">
                                        <div>松鼠编程特级教师</div>
                                        <div>{this.state.course.getMajorSpeaker().teacherName}</div>
                                    </div>
                                </div>
                                <div className="product_course_detail_top_course_info_box">
                                    <div className="product_course_detail_top_course_info">
                                        <div className="product_course_detail_top_course_name">{this.state.course.getDetail().name}</div>
                                        <CourseTimeShowView
                                            style={{
                                                display:"flex",
                                                flexDirection: "row",
                                                fontSize: "0.14rem",
                                                marginTop:"0.18rem"
                                            }}
                                            showTimeStepEnd={true}
                                            timeType={"common"}
                                            timeStep={this.state.course.getDetail().timeList}
                                            startTime={this.state.course.getDetail().startTime}
                                            endTime={this.state.course.getDetail().endTime}
                                        />

                                        <ul className="product_course_detail_top_course_profits">
                                            <li className="product_course_detail_top_course_profit_item">1.在线直播授课</li>
                                            <li className="product_course_detail_top_course_profit_item">2.1v1专职教师辅导</li>
                                            <li className="product_course_detail_top_course_profit_item">3.无限时间回看</li>
                                        </ul>
                                    </div>
                                    <div className="product_course_detail_top_course_info_teacher_list">
                                        {productCourseTeacherNodes}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product_course_detail_right">
                            <div className="product_course_detail_pay_info">
                                <div className="product_course_detail_right_course_title">
                                    {this.state.course.getDetail().name}
                                </div>
                                <div className="product_course_detail_right_course_info">
                                    <div className="product_course_detail_right_course_info_box">
                                        <div className="product_course_detail_right_course_price_box">
                                            <div className="product_course_detail_right_course_sale_price">￥{this.state.course.getDetail().salePrice / 100}</div>
                                            <div className="product_course_detail_right_course_original_price">原价：123</div>
                                        </div>
                                        <div className="product_course_detail_right_course_end_time">报名截止时间：2019-10-10</div>
                                    </div>
                                </div>
                                <div className="product_course_detail_settle_box">
                                    <Link to={"/confirmOrder/" + `${this.productCourseNo}`} className="product_course_buy_btn">购买学习</Link>
                                    <div className="product_course_consult_btn">咨询</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}