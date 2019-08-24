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
import {TimeManager} from "../../entity/TimeManager";
import {FooterView} from "../../component/FooterView/FooterView";
import {HB} from "../../util/HB";

export class ProductCourseDetailView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            course:null,
            isShowCourseDetail:true,
            isShowProblem:false,
            footerStyle:null
        };
        this.productCourseNo = this.props.match.params.productCourseNo;
    }

    componentDidMount() {
        courseService.getOrCreateProductCourseDetail(this.productCourseNo).then((course)=>{
            this.setState({
                course:course
            });
            this.setFooterStyle();
        });
    }
    switchCourseDetail(courseItem){
        return ()=>{
            console.log(courseItem);
            this.props.history.replace("/productCourseDetail/" + courseItem.goodNo);
            this.productCourseNo = courseItem.goodNo;
            courseService.getOrCreateProductCourseDetail(this.productCourseNo).then((course)=>{
                this.setState({
                    course:course
                });
                this.setFooterStyle();
            });
        }
    }
    switchToDetail(){
        this.setState({
            isShowCourseDetail:true,
            isShowProblem:false
        })
    }
    switchToProblem(){
        this.setState({
            isShowCourseDetail:false,
            isShowProblem:true
        })
    }
    setFooterStyle(){
        if(!HB.ui.hasScrollbar()){
            this.setState({
                footerStyle:{position:"fixed",bottom:"0"}
            })
        }
    }
    //  todo 这里应该调后台接口但是后台没接口
    onBuyCourse(){
        if(userService.login.isLogin(userService.getUser())){
            this.props.history.push("/confirmOrder/" + `${this.productCourseNo}`);
        }else{
            this.props.history.push("/login/login");
        }
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
        let profitNodes = this.state.course.getDetail().featureList.map((featureItem,index)=>{
            return (
                <li key={index} className="product_course_detail_top_course_profit_item">{featureItem}</li>
            )
        });
        let courseComboNodes = this.state.course.getDetail().suggestGoods.map((courseItem,index)=>{
            return (
                <a className="suggest_goods_item" key={index} onClick={this.switchCourseDetail(courseItem)}>
                    {courseItem.name}
                </a>
            )
        });
        let courseDetail = this.state.course.getDetail().goodDetailList.map((imgItem,index)=>{
            return (
                <img src={imgItem} alt="" key={index} className="product_detail_img"/>
            )
        });
        let courseProblem = this.state.course.getDetail().commonQuestions.map((problemItem,index)=>{
            return (
                <div className="common_question_item" key={index}>
                    <div className="common_question_item_title">问：{problemItem.title}</div>
                    <div className="common_question_item_answer">答：{problemItem.answer}</div>
                </div>
            )

        });

        return(
            <div>
                <div className="wrap" />
                <HeaderView />
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
                                            timeType={"unix"}
                                            timeStep={this.state.course.getDetail().timeList}
                                            startTime={this.state.course.getDetail().startTime}
                                            endTime={this.state.course.getDetail().endTime}
                                        />

                                        <ul className="product_course_detail_top_course_profits">
                                            {profitNodes}
                                        </ul>
                                    </div>
                                    <div className="product_course_detail_top_course_info_teacher_list">
                                        {productCourseTeacherNodes}
                                    </div>
                                </div>
                            </div>
                            <div className="product_course_detail_bottom">
                                <div className="product_course_detail_bottom_title">
                                    <div className="product_course_detail_bottom_title_item" onClick={this.switchToDetail.bind(this)}>课程详情</div>
                                    <div className="product_course_detail_bottom_title_item" onClick={this.switchToProblem.bind(this)}>常见问题</div>
                                </div>
                            </div>
                            {this.state.isShowCourseDetail?(
                                    <div className="product_detail_img_list">
                                        {courseDetail}
                                    </div>
                                ):null}
                            {this.state.isShowProblem?(
                                <div className="product_detail_problem_list">
                                    {courseProblem}
                                </div>
                            ):null}
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
                                            <div className="product_course_detail_right_course_original_price">原价：{this.state.course.getDetail().originPrice / 100}</div>
                                        </div>
                                        <div className="product_course_detail_right_course_end_time">报名截止时间：{TimeManager.convertStampToYMD(this.state.course.getDetail().sellEndTime,"unix")}</div>
                                    </div>
                                </div>
                                <div className="product_course_detail_right_course_buy_only">
                                    <div className="product_course_detail_right_course_buy_only_title">单独购买</div>
                                    <div className="product_course_detail_right_course_buy_only_course">
                                        {this.state.course.name}
                                    </div>
                                </div>
                                {this.state.course.getDetail().suggestGoods.length > 0 ? (
                                    <div className="product_course_detail_right_course_buy_combo_list">
                                        <div className="product_course_detail_right_course_buy_only_title">建议课程</div>
                                        {courseComboNodes}
                                    </div>):null}
                                <div className="product_course_detail_settle_box">
                                    <a className="product_course_buy_btn" onClick={this.onBuyCourse.bind(this)}>购买学习</a>
                                    <div className="product_course_consult_btn">咨询</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterView style={this.state.footerStyle}/>
            </div>
        )
    }
}