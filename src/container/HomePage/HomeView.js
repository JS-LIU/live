/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {FooterView} from "../../component/FooterView/FooterView";
import {baseUrl} from "../../config/config";
import HomeStyle from './HomeStyle.css';
import {HB} from "../../util/HB";
import {HomeViewDialogView} from "./HomeViewDialogView";
import {CompleteUserInfoView} from "../PCStudyCourse/CompleteUserInfoView";
import {courseService} from "../../service/CourseService";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className="sec_8_child_img_next_btn"
            onClick={onClick} />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className="sec_8_child_img_prev_btn"
            onClick={onClick} />
    );
}
export class HomeView extends Component{
    constructor(props) {
        super(props);
        let isNeedRepair = HB.url.getSearchKeyByLocationSearch(this.props.location.search,"isNeedRepair") || false;
        this.sec_1_swiper_params = {
            dots: true,
            customPaging: function(i) {
                return (
                    <div className="slider_dot" />
                );
            },
            dotsClass: "slider_dot_line",
            autoplay: true,
            arrows:false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        this.sec_5_swiper_params = {
            dots: true,
            customPaging: function(i) {
                return (
                    <div className="slider_dot" />
                );
            },
            dotsClass: "slider_dot_line",
            arrows:false,
            autoplay: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        this.sec_8_swiper_params = {
            dots: true,
            customPaging: function(i) {
                return (
                    <div className="slider_dot" />
                );
            },
            dotsClass: "slider_dot_line",
            arrows:true,
            autoplay: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow:  <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        this.state = {
            userInfo:userService.user.getUserInfo(),
            cooperationList:[
                {cn:"sec_5_content_item_1",companyName:(<div style={{display:"flex",flexDirection:"column",alignItems:"center",fontSize:"0.14rem",paddingTop:"0.16rem"}}>
                        <div>中国计算机学会</div>
                        <div>CCF会员单位</div>
                </div>),id:0},
                {cn:"sec_5_content_item_2",companyName:(<div style={{display:"flex",flexDirection:"column",alignItems:"center",fontSize:"0.14rem",paddingTop:"0.16rem"}}><div>创新工场人工智能</div><div>研究院技术支持</div></div>),id:1},
                {cn:"sec_5_content_item_3",companyName:(<div style={{display:"flex",flexDirection:"column",alignItems:"center",fontSize:"0.14rem",paddingTop:"0.16rem"}}><div>美国计算机行业</div><div>学会金牌会员</div></div>),id:2},
                {cn:"sec_5_content_item_4",companyName:(<div style={{display:"flex",flexDirection:"column",alignItems:"center",fontSize:"0.14rem",paddingTop:"0.16rem"}}><div>中国人工智能学会</div><div>会员单位</div></div>),id:3},
            ],
            problemList:[{
                question:"问：不满意如何退费？",
                answer: (<div>
                            <div>一、体验课9.9元特价课，不支持退费；</div>
                            <div>二、正课学员：</div>
                            <div>2次及以内学员，可以申请全额退费；</div>
                            <div>3次及以上学员，可以申请退费，退费需扣除已消耗课时费；</div>
                            <div>退费金额=缴费金额-已耗课时*缴费金额/课时数</div>
                        </div>)
            },{
                question:"问：课程可以分期付款吗？",
                answer: "松鼠编程课程学费可以分期付款；宝妈可以在支付时选择信用卡支付、或者分期乐、酷分期等分期产品。"
            },{
                question:"问：一节课多长时间？",
                answer: "松鼠编程每课时 50分钟，每次课包含2课时；其中加上助教课前、课后辅导时间；每次课大约两小时。"
            },{
                question:"问：能否调课/调老师？",
                answer: "无论是对老师课程不满意抑或因为自身原因；需要调换老师的，皆可调换下一个班级或者同期其他班级。"
            },{
                question:"问：不知道家里的设备能否上课？",
                answer: (
                    <div>
                        <div>下载客户端；客户端会自动提示进行设备检测；检测成功即可具备上课条件；</div>
                        <div>如检测不成功可拨打400-621-6161进行免费技术支持</div>
                    </div>
                )
            }],
            advantage:[{
                pic:baseUrl.getBaseUrl() + "/src/img/sec_6_pic_1.png",
                text:"有趣有用有效的学习案例，尽享编程之乐",
                hideText:"精选编程项目案例",
                isActive:false,
            },{
                pic:baseUrl.getBaseUrl() + "/src/img/sec_6_pic_2.png",
                text:"师生摄像头、屏幕、课件等屏幕实时共享",
                hideText:"在线直播互动",
                isActive:false,
            },{
                pic:baseUrl.getBaseUrl() + "/src/img/sec_6_pic_3.png",
                text:"学习进度、表现、成绩定时推送随时查询",
                hideText:"学习报告",
                isActive:false,
            },{
                pic:baseUrl.getBaseUrl() + "/src/img/sec_6_pic_4.png",
                text:"引进AI智能巡班系统，课堂表现大数据分析",
                hideText:"AI智能巡班质检",
                isActive:false,
            },{
                pic:baseUrl.getBaseUrl() + "/src/img/sec_6_pic_5.png",
                text:"独家在线学习平台，听课与编程协作同步进行",
                hideText:"班级团队协作",
                isActive:false,
            },{
                pic:baseUrl.getBaseUrl() + "/src/img/sec_6_pic_6.png",
                text:"独家研发配套教材，全面强化学习效果",
                hideText:"课程配套讲义教材",
                isActive:false,
            }],
            prizeNodes:[
                baseUrl.getBaseUrl() + "/src/img/tencent_prize.png",
                baseUrl.getBaseUrl() + "/src/img/wangyi_prize.png",
                baseUrl.getBaseUrl() + "/src/img/pencil_prize.png",
            ],
            planList:[
                {
                    key:"python",
                    background:"#05AEB1",
                    titleText:"Python人工智能编程基础",
                    contentInfo:()=>{
                        return (<div className="sec_4_dialog_content">
                            <div className="sec_4_dialog_line">
                                <div className="sec_4_dialog_line_num sec_4_content_python_color">1.</div>
                                <div className="sec_4_dialog_line_text sec_4_content_python_color">系统学习Python语法，掌握函数、数据抓取及可视化处理，初步完成语音、图像等人工智能程序。</div>
                            </div>
                            <div className="sec_4_dialog_line">
                                <div className="sec_4_dialog_line_num sec_4_content_python_color">2.</div>
                                <div className="sec_4_dialog_line_info">
                                    <div className="sec_4_dialog_line_text sec_4_content_python_color">蓝桥杯Python创意编程组初赛至国赛；</div>
                                    <div className="sec_4_dialog_line_text sec_4_content_python_color">全国各省市Python程序设计比赛（根据各地区情况）；</div>
                                    <div className="sec_4_dialog_line_text sec_4_content_python_color">全国中小学生电脑制作活动；</div>
                                    <div className="sec_4_dialog_line_text sec_4_content_python_color">全国青少年创意编程比赛（初中组）</div>
                                </div>
                            </div>
                        </div>)
                    }
                },
                {
                    key:"cpp",
                    background:"#39579A",
                    titleText:"Python人工智能编程基础",
                    contentInfo:()=>{
                        return (<div className="sec_4_dialog_content">
                            <div className="sec_4_dialog_line">
                                <div className="sec_4_dialog_line_num sec_4_content_cpp_color">1.</div>
                                <div className="sec_4_dialog_line_text sec_4_content_cpp_color">系统学习Python语法，掌握函数、数据抓取及可视化处理，初步完成语音、图像等人工智能程序。</div>
                            </div>
                            <div className="sec_4_dialog_line">
                                <div className="sec_4_dialog_line_num sec_4_content_cpp_color">2.</div>
                                <div className="sec_4_dialog_line_info">
                                    <div className="sec_4_dialog_line_text sec_4_content_cpp_color">蓝桥杯Python创意编程组初赛至国赛；</div>
                                    <div className="sec_4_dialog_line_text sec_4_content_cpp_color">全国各省市Python程序设计比赛（根据各地区情况）；</div>
                                    <div className="sec_4_dialog_line_text sec_4_content_cpp_color">全国中小学生电脑制作活动；</div>
                                    <div className="sec_4_dialog_line_text sec_4_content_cpp_color">全国青少年创意编程比赛（初中组）</div>
                                </div>
                            </div>
                        </div>)
                    }
                },
                {
                    key:"noip",
                    background:"#A96DBE",
                    titleText:"Python人工智能编程基础",
                    contentInfo:()=>{
                        return (<div className="sec_4_dialog_content">
                            <div className="sec_4_dialog_line">
                                <div className="sec_4_dialog_line_num sec_4_content_noip_color">1.</div>
                                <div className="sec_4_dialog_line_text sec_4_content_noip_color">系统学习Python语法，掌握函数、数据抓取及可视化处理，初步完成语音、图像等人工智能程序。</div>
                            </div>
                            <div className="sec_4_dialog_line">
                                <div className="sec_4_dialog_line_num sec_4_content_noip_color">2.</div>
                                <div className="sec_4_dialog_line_info">
                                    <div className="sec_4_dialog_line_text sec_4_content_noip_color">蓝桥杯Python创意编程组初赛至国赛；</div>
                                    <div className="sec_4_dialog_line_text sec_4_content_noip_color">全国各省市Python程序设计比赛（根据各地区情况）；</div>
                                    <div className="sec_4_dialog_line_text sec_4_content_noip_color">全国中小学生电脑制作活动；</div>
                                    <div className="sec_4_dialog_line_text sec_4_content_noip_color">全国青少年创意编程比赛（初中组）</div>
                                </div>
                            </div>
                        </div>)
                    }
                }
            ],
            isShowPlanItem:false,
            isNeedRepair:isNeedRepair,
            isShowActiveBottom:false,
            isShowVideo:false
        }
    }

    componentDidMount() {
        HB.save.setStorage({redirect:"home"});
        let self = this;
        window.onscroll = function(){
            if(HB.ui.getScrollTop() > 500){
                self.setState({
                    isShowActiveBottom:true
                })
            }else{
                self.setState({
                    isShowActiveBottom:false
                })
            }
        }

    }
    componentWillUnmount() {
        window.onscroll = null;
    }

    // makeCooperationUnActive(){
    //     for(let i = 0 ;i < this.state.cooperationList.length;i++){
    //         this.state.cooperationList[i].active = false;
    //     }
    //     return this.state.cooperationList;
    // }
    // setCooperationActive(item) {
    //     return () => {
    //         this.makeCooperationUnActive();
    //         item.active = true;
    //         this.setState({
    //             cooperationList:this.state.cooperationList
    //         })
    //     }
    // }
    // setCooperationActiveUnActive(){
    //     this.makeCooperationUnActive();
    //     this.setState({
    //         cooperationList:this.state.cooperationList
    //     })
    // }
    showMorePlan(planItem){
        return ()=>{
            this.showItem = this.state.planList.find((item,index)=>{
                return item.key === planItem;
            });

            this.setState({
                isShowPlanItem:true
            })
        }
    }
    closePlanItem(){
        this.setState({
            isShowPlanItem:false
        })
    }
    showSubAdvantage(advantageItem){
        return ()=>{
            advantageItem.isActive = true;
            this.setState({
                advantage:this.state.advantage
            })
        }
    }
    hideSubAdvantage(){
        for(let i = 0;i < this.state.advantage.length;i++){
            this.state.advantage[i].isActive = false;
        }
        this.setState({
            advantage:this.state.advantage
        })
    }
    fixedUserInfo(postInfo){
        userService.resetUserInfo(postInfo).then(()=>{
            this.setState({
                userInfo:userService.user.getUserInfo(),
                isNeedRepair:false
            });
        });
    }
    showVideo(){
        this.setState({
            isShowVideo:true
        });
        courseService.getVideoView(517).then((data)=>{
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
    closeAudio(){
        this.setState({
            isShowVideo:false
        });
    }
    render() {
        let cooperationNodes = this.state.cooperationList.map((item,i)=>{
            return (
                <li key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",height:"2rem"}}>
                    <div
                        className={item.cn}
                        style={item.active?{backgroundColor:"#FAFAFA"}:{backgroundColor:"#FFFFFF"}}
                        >
                    </div>
                    {item.companyName}
                </li>
            )
        });
        let prizeNodes = this.state.prizeNodes.map((item,i)=>{
            return (
                <div className="prize_item" key={i}>
                    <img src={item} alt="" className="prize_item_pic"/>
                </div>
            )
        });
        let problemNodes = this.state.problemList.map((item,i)=>{
            return (
                <li className="home_question_item" key={i}>
                    <div className="home_question_title">{item.question}</div>
                    <div className="home_question_answer">
                        {item.answer}
                    </div>
                </li>
            )
        });
        let advantageNodes = this.state.advantage.map((advantageItem,index)=>{
            return (
                <div key={index}
                     className="sec_6_item_box"
                     onMouseEnter={this.showSubAdvantage(advantageItem)}
                     onMouseLeave={this.hideSubAdvantage.bind(this)}>
                    <img src={advantageItem.pic} alt="" className="sec_6_pic"/>
                    <div className={`toggle_box ${advantageItem.isActive ? "toggle_box_toggle_animation":null}`}>
                        <div className="toggle_box_top">{advantageItem.hideText}</div>
                        <div className="toggle_box_bottom">{advantageItem.text}</div>
                    </div>
                </div>
            )
        });

        return(
            <div>
                {this.state.isShowPlanItem?<HomeViewDialogView planItem={this.showItem} closePlanItem={this.closePlanItem.bind(this)}/>:null}
                {this.state.isNeedRepair?<CompleteUserInfoView fixedUserInfo={this.fixedUserInfo.bind(this)}/>:null}
                <HeaderView history={this.props.history} userInfo={this.state.userInfo} headerStyle={{position:"fixed",top:"0"}}/>
                <div className="sec_1">
                    <Slider {...this.sec_1_swiper_params}>
                        <Link className="home_head_img_box">
                            <img src={baseUrl.getBaseUrl() + "/src/img/activeImg_1.png"} className="home_head_img" alt=""/>
                        </Link>
                        <Link className="home_head_img_box">
                            <img src={baseUrl.getBaseUrl() + "/src/img/activeImg_2.png"} className="home_head_img" alt=""/>
                        </Link>
                    </Slider>
                </div>
                <div className="sec_2">
                    <div className="sec_2_title">
                        <div className="sec_2_title_text">“贴身”双师，在家学习省心更放心</div>
                        <div className="sec_title_line" />
                    </div>
                    <div className="sec_2_video_box_top">
                        <div className="sec_2_video_box">
                            <img src={baseUrl.getBaseUrl() + "/src/img/sec_2_video_play_btn.png"}
                                 onClick={this.showVideo.bind(this)}
                                 className="sec_2_video_play_btn" alt=""/>
                        </div>
                        <div className="sec_2_video_box_top_right">
                            <div className="sec_2_video_box_top_right_title">金牌团队-一线专职编程教师直播授课</div>
                            <div className="sec_2_video_box_top_right_detail">未科编程网校的直播授课讲师全部来自计算机或教育领域专业教师、一线竞赛教练。他们擅长编程，更擅长教会孩子编程。</div>
                            <div className="sec_2_video_box_top_right_tag_list">
                                <div className="sec_2_video_box_top_right_tag_list_item">边学边练</div>
                                <div className="sec_2_video_box_top_right_tag_list_item">PBL项目式教学</div>
                                <div className="sec_2_video_box_top_right_tag_list_item">课后无限回放</div>
                            </div>
                        </div>
                    </div>
                    <div className="sec_2_video_box_bottom">
                        <div className="sec_2_video_box_bottom_left">
                            <div className="sec_2_video_box_top_right_title">贴心辅导-专属辅导老师实时答疑</div>
                            <div className="sec_2_video_box_top_right_detail">课前温馨提醒引导预习，课中互动讨论在线答疑，课后及时回报家长学情，实时解决各种问题。</div>
                            <div className="sec_2_video_box_top_right_tag_list">
                                <div className="sec_2_video_box_top_right_tag_list_item">1对1课后辅导</div>
                                <div className="sec_2_video_box_top_right_tag_list_item">课堂划重点</div>
                            </div>
                        </div>
                        <div className="sec_2_video_box_bottom_right" />
                    </div>
                </div>
                <div className="sec_4">
                    <div className="sec_4_title">
                        <div className="sec_4_title_text">有效计划、帮孩子掌控未来</div>
                        <div className="sec_title_line" ></div>
                    </div>
                    <div className="sec_4_content">
                        <div className="python_text_box">
                            <div className="sec_4_content_text_top">
                                <div className="sec_4_content_text_num sec_4_content_python_color">1.</div>
                                <div className="sec_4_content_text sec_4_content_python_color">系统学习Python语法，掌握函数、数据抓取及可视化处理，初步完成语音、图像等人工智能程序。</div>
                            </div>
                            <div className="sec_4_content_text_bottom">
                                <div className="sec_4_content_text_num sec_4_content_python_color">2.</div>
                                <div className="sec_4_content_text_bottom_info">
                                    <div className="sec_4_content_text sec_4_content_python_color">蓝桥杯Python创意编程组初赛至国赛全国各省市Python程序设计比赛</div>
                                    <div className="sec_4_content_more sec_4_content_python_color sec_4_content_more_line" onClick={this.showMorePlan('python')}>查看更多</div>
                                </div>
                            </div>
                        </div>
                        <div className="cpp_text_box">
                            <div className="sec_4_content_text_top">
                                <div className="sec_4_content_text_num sec_4_content_cpp_color">1.</div>
                                <div className="sec_4_content_text sec_4_content_cpp_color">系统学习C++语法，学会循环控制和数据处理。掌握函数、内存指针和数据结构。</div>
                            </div>
                            <div className="sec_4_content_text_bottom">
                                <div className="sec_4_content_text_num sec_4_content_cpp_color">2.</div>
                                <div className="sec_4_content_text_bottom_info">
                                    <div className="sec_4_content_text sec_4_content_cpp_color">全国青少年信息学CSP-J/S资格认证</div>
                                    <div className="sec_4_content_more sec_4_content_cpp_color sec_4_content_more_line" onClick={this.showMorePlan('cpp')}>查看更多</div>
                                </div>
                            </div>
                        </div>
                        <div className="noip_text_box">
                            <div className="sec_4_content_text_top">
                                <div className="sec_4_content_text_num sec_4_content_noip_color">1.</div>
                                <div className="sec_4_content_text sec_4_content_noip_color">熟练掌握竞赛算法和数据结构，学习深入算法、图论，强化搜索和动态规划等算法训练。</div>
                            </div>
                            <div className="sec_4_content_text_bottom">
                                <div className="sec_4_content_text_num sec_4_content_noip_color">2.</div>
                                <div className="sec_4_content_text_bottom_info">
                                    <div className="sec_4_content_text sec_4_content_noip_color">全国青少年信息学CSP-J/S资格认证</div>
                                    <div className="sec_4_content_more sec_4_content_noip_color sec_4_content_more_line" onClick={this.showMorePlan('noip')}>查看更多</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sec_5">
                    <div className="sec_5_title">
                        <div className="sec_5_title_text">顶尖老师、让学员出类拔萃</div>
                        <div className="sec_title_line" />
                    </div>
                </div>
                <div className="sec_5_bottom">
                    <Slider {...this.sec_5_swiper_params}>
                        <div className="sec_5_teacher_box">
                            <div className="sec_5_teacher_img_box">
                                <img src={baseUrl.getBaseUrl() + "/src/img/teacher_header_1.png"} className="sec_5_teacher_img" alt=""/>
                                <div className="sec_5_teacher_info">
                                    <div className="sec_5_teacher_name_info">
                                        <div className="sec_5_teacher_name">苏航</div>
                                        <div className="sec_5_teacher_position">c++/竞赛讲师</div>
                                    </div>
                                    <div className="sec_5_teacher_title_list">
                                        <div className="sec_5_teacher_title">计算机博士</div>
                                        <div className="sec_5_teacher_title">ACM指导教师</div>
                                    </div>
                                    <div className="sec_5_teacher_info_text">
                                        北京工业大学计算机学院硕士生导师，主讲计算机专业课程，发表高水平论文十余篇，曾主持国家自然科学基金青年基金项目。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="sec_5_teacher_img_box">
                                <img src={baseUrl.getBaseUrl() + "/src/img/teacher_header_2.png"} className="sec_5_teacher_img" alt=""/>
                                <div className="sec_5_teacher_info">
                                    <div className="sec_5_teacher_name_info">
                                        <div className="sec_5_teacher_name">齐润博</div>
                                        <div className="sec_5_teacher_position">Python讲师</div>
                                    </div>
                                    <div className="sec_5_teacher_title_list">
                                        <div className="sec_5_teacher_title">剑桥教师</div>
                                        <div className="sec_5_teacher_title">STEAM教育专家</div>
                                    </div>
                                    <div className="sec_5_teacher_info_text">
                                        多年从事国际学校双语计算机教学及课程研发，精通K12计算机全英文教学，所教学生均考入世界前50顶尖大学攻读计算机相关专业。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="sec_5_teacher_img_box">
                                <img src={baseUrl.getBaseUrl() + "/src/img/teacher_header_4.png"} className="sec_5_teacher_img" alt=""/>
                                <div className="sec_5_teacher_info">
                                    <div className="sec_5_teacher_name_info">
                                        <div className="sec_5_teacher_name">李丽红</div>
                                        <div className="sec_5_teacher_position">C++/竞赛讲师</div>
                                    </div>
                                    <div className="sec_5_teacher_title_list">
                                        <div className="sec_5_teacher_title">北邮名师</div>
                                        <div className="sec_5_teacher_title">NOIP金牌教练</div>
                                    </div>
                                    <div className="sec_5_teacher_info_text">
                                        15年编程实战，带队比赛经验丰富，北京邮电大学本硕毕业，擅长调动学生情绪积极思考，提高学生学习兴趣，讲课过程深入浅出，课堂气氛活泼生动。
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="sec_5_teacher_img_box">
                                <img src={baseUrl.getBaseUrl() + "/src/img/teacher_header_3.png"} className="sec_5_teacher_img" alt=""/>
                                <div className="sec_5_teacher_info">
                                    <div className="sec_5_teacher_name_info">
                                        <div className="sec_5_teacher_name">蒋新云</div>
                                        <div className="sec_5_teacher_position">C++/竞赛讲师</div>
                                    </div>
                                    <div className="sec_5_teacher_title_list">
                                        <div className="sec_5_teacher_title">北工大毕业</div>
                                        <div className="sec_5_teacher_title">资深少儿编程教育专家</div>
                                    </div>
                                    <div className="sec_5_teacher_info_text">
                                        原知名上市教育集团少儿编程总设计师。敬畏技术，喜爱孩子，专注课堂模型的探索和创新，启发孩子好奇心，培养能力。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
                <div className="sec_6">
                    <div className="sec_6_title">
                        <div className="sec_6_title_text">沉浸式课堂，让孩子更爱学习</div>
                        <div className="sec_title_line" />
                    </div>
                    <ul className="sec_6_problem_list" >
                        {advantageNodes}
                    </ul>
                </div>
                <div className="sec_8">
                    <div className="sec_8_title">
                        <div className="sec_8_title_text">破茧成蝶，真实未科学员</div>
                        <div className="sec_title_line" />
                    </div>
                </div>
                <div className="sec_8_slider_box">
                    <div className="sec_8_slider">
                        <Slider {...this.sec_8_swiper_params}>
                            <div className="sec_8_teacher_img_box">
                                <img src={baseUrl.getBaseUrl() + "/src/img/child_pic_1.png"} className="sec_8_child_img" alt=""/>
                                <div className="sec_8_child_info">
                                    <div className="sec_5_teacher_name_info">
                                        <div className="sec_5_teacher_name">周昊宇</div>
                                        <div className="sec_5_teacher_position">C++学员</div>
                                    </div>
                                    <div className="sec_8_teacher_info_text">
                                        <div>常州市局前街小学 四年级</div>
                                        <div>常州市小学生“程序设计小能手”二等奖</div>
                                        <div>江苏省“信息与未来”比赛省级二等奖</div>
                                    </div>
                                </div>
                            </div>
                            <div className="sec_8_teacher_img_box">
                                <img src={baseUrl.getBaseUrl() + "/src/img/child_pic_2.png"} className="sec_8_child_img" alt=""/>
                                <div className="sec_8_child_info">
                                    <div className="sec_5_teacher_name_info">
                                        <div className="sec_5_teacher_name">林一鸣</div>
                                        <div className="sec_5_teacher_position">Python学员</div>
                                    </div>
                                    <div className="sec_8_teacher_info_text">
                                        <div>石狮市第三实验小学 五年级</div>
                                        <div>福建省中小学电脑制作活动三等奖</div>
                                        <div>石狮市中小学电脑制作活动一等奖</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className="sec_9">
                    <div className="sec_8_title">
                        <div className="sec_8_title_text">关于 未科编程</div>
                        <div className="sec_title_line" ></div>
                    </div>
                    <div className="sec_9_sub_title">
                        <div>
                            未科编程-中小学生编程网校是北京未科教育公司旗下产品、与VIPCODE-1对1、VIPCODE-小班课同属未科公司旗下
                        </div>
                        <div>
                            在线青少儿编程品牌；未科教育：是用科技推动 教育公平。我们期望通过标准化的编程课程、可视化的编程工具和先进
                        </div>
                        <div>
                            的在线教学系统，让每个孩子都有机会学习更简单、更有趣的编程课，改变孩子未来。
                        </div>
                    </div>
                    <div className="cooperation_list">
                        {cooperationNodes}
                    </div>
                    <div className="prize_info_list">
                        {prizeNodes}
                    </div>
                </div>
                <div className="sec_7">
                    <div className="sec_7_enjoy_btn" />
                </div>
                {this.state.isShowActiveBottom?<div className="quick_buy_course_link_box">
                    <div className="quick_buy_course_text">
                        <span>显示优惠：</span>
                        <span>9.9</span>
                        <span>元试学一期班</span>
                    </div>
                    <div className="quick_buy_course_btn">立即学习</div>
                </div>:null}
                {this.state.isShowVideo?<div className="video_player_box">
                    <div className="video_player_wrapper" />
                    <div className="video_player_close_btn" onClick={this.closeAudio.bind(this)} />
                    <div id="J_prismPlayer" className="audio_player" />
                    </div>:null}

                <FooterView/>
            </div>
        )
    }
}