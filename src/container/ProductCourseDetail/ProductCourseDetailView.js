/**
 * Created by Liudq on 2019-07-29
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {courseService} from "../../service/CourseService";
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";
import {TimeManager} from "../../entity/TimeManager";
import {FooterView} from "../../component/FooterView/FooterView";
import {HB} from "../../util/HB";
import {baseUrl} from "../../config/config";
import productCourseDetailStyle from './productCourseDetailStyle.css';
import {TeacherView} from "../../component/Teacher/TeacherView";

export class ProductCourseDetailView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            course:null,
            isShowCourseDetail:true,
            isShowProblem:false,
            footerStyle:null,
            isShowAliPlay:false
        };
        this.productCourseNo = this.props.match.params.productCourseNo;
    }
    playAudio(course){
        return ()=>{
            this.setState({
                isShowAliPlay:true
            });
            courseService.getVideoView(course.detail.videoId).then((data)=>{
                new Aliplayer({
                    id: "J_prismPlayer",
                    vid : data.data.aliVodId,
                    playauth : data.data.playAuth,
                    width:'8.96rem',
                    height:'5rem',
                    controlBarVisibility:'hover',
                    diagnosisButtonVisible:false,
                    autoplay: true
                });
            })
        }
    }
    closeAudio(){
        this.setState({
            isShowAliPlay:false
        });
    }
    componentDidMount() {
        this.updateProductCourseDetail();
    }
    updateProductCourseDetail(){
        courseService.getOrCreateProductCourseDetail(this.productCourseNo).then((course)=>{
            let productModule = course.getModule.before((repairParam)=>{
                repairParam = repairParam || {};
                repairParam.startTime = course.courseInfo.getStartTimeToShow("unix");
                repairParam.endTime = course.courseInfo.getEndTimeToShow("unix");
                repairParam.sellEndTime = course.getSellEndTimeToShow("unix");
            }).call(course,{});
            this.setState({
                course:productModule
            });
            // this.setFooterStyle();
        });
    }
    switchCourseDetail(courseItem){
        return ()=>{
            this.props.history.replace("/productCourseDetail/" + courseItem.goodNo);
            this.productCourseNo = courseItem.goodNo;
            this.updateProductCourseDetail();
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
        }else{
            this.setState({
                footerStyle:{position:"relative"}
            })
        }
    }
    //  todo 这里应该调后台接口但是后台没接口
    onBuyCourse(){
        if(userService.login.isLogin()){
            let url = `/confirmOrder?productCourseNo=${this.productCourseNo}`;
            this.props.history.push(url);
        }else{
            this.props.history.push("/login/login");
        }
    }
    render() {
        if(!this.state.course){
            return null;
        }
        let profitNodes = this.state.course.featureList.map((featureItem,index)=>{
            return (
                <li key={index} className="product_course_detail_top_course_profit_item">{featureItem}</li>
            )
        });
        let courseComboNodes = this.state.course.suggestGoods.map((courseItem,index)=>{
            return (
                <a className="suggest_goods_item" key={index} onClick={this.switchCourseDetail(courseItem)}>
                    {courseItem.name}
                </a>
            )
        });
        let courseDetail = this.state.course.goodDetailList.map((imgItem,index)=>{
            return (
                <img src={imgItem} alt="" key={index} className="product_detail_img"/>
            )
        });
        return(
            <div>
                <div className="wrap" />
                <HeaderView history={this.props.history} userInfo={userService.user.getUserInfo()}/>
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
                                        <div>{this.state.course.teacherInfo.teacherName}老师</div>
                                    </div>
                                    <div className="product_course_detail_header_course_video">
                                        <a className="product_course_detail_header_course_video_btn" onClick={this.playAudio(this.state.course)}/>
                                    </div>
                                </div>
                                <div className="product_course_detail_top_course_info_box">
                                    <div className="product_course_detail_top_course_info">
                                        <div className="product_course_detail_top_course_name" >{this.state.course.courseName}</div>
                                        <CourseTimeShowView
                                            style={{
                                                display:"flex",
                                                flexDirection: "row",
                                                fontSize: "0.14rem",
                                                marginTop:"0.18rem",
                                                width:"4.8rem"
                                            }}
                                            showTimeStepEnd={true}
                                            timeType={"unix"}
                                            timeStep={this.state.course.timeList}
                                            startTime={this.state.course.startTime}
                                            endTime={this.state.course.endTime}
                                        />

                                        <ul className="product_course_detail_top_course_profits">
                                            {profitNodes}
                                        </ul>
                                    </div>
                                    <div className="product_course_detail_top_course_info_teacher_list">
                                        <div className="course_product_detail_teacher_info">
                                            <div className="course_product_detail_teacher_item_header_img">
                                                <img src={this.state.course.teacherInfo.headImgUrl} alt="" className="course_product_detail_teacher_item_header_img_pic"/>
                                            </div>
                                            <div className="course_product_detail_teacher_name_box">
                                                <div>主讲教师</div>
                                                <a title={this.state.course.teacherInfo.teacherName} style={{width:"0.56rem",height:"0.21rem",overflow:"hidden"}}>{this.state.course.teacherInfo.teacherName}老师</a>
                                            </div>
                                        </div>
                                        <div className="course_product_detail_teacher_info">
                                            <div className="course_product_detail_teacher_item_header_img">
                                                <img src={this.state.course.assistantInfo.headImgUrl} alt="" className="course_product_detail_teacher_item_header_img_pic"/>
                                            </div>
                                            <div className="course_product_detail_teacher_name_box">
                                                <div>助教</div>
                                                <div>{this.state.course.assistantInfo.teacherName}</div>
                                            </div>
                                        </div>
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
                                    <img src={this.state.course.commonQuestionUrl} alt="" className="product_detail_img"/>
                                </div>
                            ):null}
                        </div>

                        <div className="product_course_detail_right">
                            <div className="product_course_detail_pay_info">
                                <div className="product_course_detail_right_course_title">
                                    {this.state.course.courseName}
                                </div>
                                <div className="product_course_detail_right_course_info">
                                    <div className="product_course_detail_right_course_info_box">
                                        <div className="product_course_detail_right_course_price_box">
                                            <div className="product_course_detail_right_course_sale_price">￥{this.state.course.salePrice / 100}</div>
                                            <div className="product_course_detail_right_course_original_price">原价：{this.state.course.originPrice / 100}</div>
                                        </div>
                                        <div className="product_course_detail_right_course_end_time">报名截止时间：{this.state.course.sellEndTime}</div>
                                    </div>
                                </div>
                                <div className="product_course_detail_right_course_buy_only">
                                    <div className="product_course_detail_right_course_buy_only_title">单独购买</div>
                                    <a className="product_course_detail_right_course_buy_only_course">
                                        {this.state.course.courseName}
                                    </a>
                                </div>
                                {this.state.course.suggestGoods.length > 0 ? (
                                    <div className="product_course_detail_right_course_buy_combo_list">
                                        <div className="product_course_detail_right_course_buy_only_title">建议课程</div>
                                        {courseComboNodes}
                                    </div>):null}
                                <div className="product_course_detail_settle_box">
                                    <a className="product_course_buy_btn" onClick={this.onBuyCourse.bind(this)}>购买学习</a>
                                    <a className="product_course_consult_btn">咨询</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterView style={this.state.footerStyle}/>
                {this.state.isShowAliPlay?
                    <div className="video_player_box">
                        <div className="video_player_wrapper" />
                        <div className="video_player_close_btn" onClick={this.closeAudio.bind(this)} />
                        <div id="J_prismPlayer" className="audio_player" />
                    </div>
                    :null}
            </div>
        )
    }
}