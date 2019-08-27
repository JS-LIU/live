/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactSwiper from 'reactjs-swiper';

import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {FooterView} from "../../component/FooterView/FooterView";
import {baseUrl} from "../../config/config";
import HomeStyle from './HomeStyle.css';

export class HomeView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeImgList:[{
                image: baseUrl.getBaseUrl()+'/src/img/activeImg_1.png',
                title: 'vipCode',
                link: 'http://www.baidu.com'
            }],
            cooperationList:[
                {cn:"sec_5_content_item_1",active:false,companyName:(<div style={{display:"flex",flexDirection:"column",alignItems:"center",fontSize:"0.14rem",paddingTop:"0.16rem"}}>
                        <div>中国计算机学会</div>
                        <div>CCF会员单位</div>
                </div>),id:0},
                {cn:"sec_5_content_item_2",active:false,companyName:(<div style={{display:"flex",flexDirection:"column",alignItems:"center",fontSize:"0.14rem",paddingTop:"0.16rem"}}><div>中国计算机学会</div><div>CCF会员单位</div></div>),id:1},
                {cn:"sec_5_content_item_3",active:false,companyName:(<div style={{display:"flex",flexDirection:"column",alignItems:"center",fontSize:"0.14rem",paddingTop:"0.16rem"}}><div>中国计算机学会</div><div>CCF会员单位</div></div>),id:2},
                {cn:"sec_5_content_item_4",active:false,companyName:(<div style={{display:"flex",flexDirection:"column",alignItems:"center",fontSize:"0.14rem",paddingTop:"0.16rem"}}><div>中国计算机学会</div><div>CCF会员单位</div></div>),id:3},
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
            }]
        }
    }

    componentDidMount() {
    }
    makeCooperationUnActive(){
        for(let i = 0 ;i < this.state.cooperationList.length;i++){
            this.state.cooperationList[i].active = false;
        }
        return this.state.cooperationList;
    }
    setCooperationActive(item) {
        return () => {
            this.makeCooperationUnActive();
            item.active = true;
            this.setState({
                cooperationList:this.state.cooperationList
            })
        }
    }
    setCooperationActiveUnActive(){
        this.makeCooperationUnActive();
        this.setState({
            cooperationList:this.state.cooperationList
        })
    }
    render() {
        let cooperationNodes = this.state.cooperationList.map((item,i)=>{
            return (
                <li key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",height:"2rem"}}>
                    <div
                        className={item.cn}
                        style={item.active?{backgroundColor:"#FAFAFA"}:{backgroundColor:"#FFFFFF"}}
                        onMouseEnter={this.setCooperationActive(item)}
                        onMouseLeave={this.setCooperationActiveUnActive.bind(this)}>
                    </div>
                    {item.active?item.companyName:""}
                </li>
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
        return(
            <div>
                <HeaderView history={this.props.history} userInfo={userService.getUser().userInfo}/>
                <ReactSwiper
                    swiperOptions={{
                    preloadImages: true,
                    autoplay: 4000,
                    autoplayDisableOnInteraction: false
                }}
                    showPagination
                    items={this.state.activeImgList}
                    className="active_swiper" />
                <div className="sec_2">
                    <div className="sec_2_title">
                        有效计划、帮孩子掌控未来
                    </div>
                    <div className="sec_2_video_box">
                        <div className="sec_2_video_play_btn_bg"/>
                        <img src={baseUrl.getBaseUrl() + "/src/img/sec_2_video_play_btn.png"} className="sec_2_video_play_btn" alt=""/>
                    </div>
                    <ul className="sec_2_intro_list">
                        <li className="sec_2_intro_list_item_py">
                            <div className="sec_2_intro_list_item_title">Python人工智能课程</div>
                            <span className="sec_2_intro_list_item_sub_title_py">人工智能必修课</span>
                            <div className="sec_2_intro_list_item_sub_title">使用人工智能时代广泛的编程语言Python，教授孩子更多的源码编程技巧，让孩子逐步适应源码编考问题，奠定。</div>
                        </li>
                        <li className="sec_2_intro_list_item_c">
                            <div className="sec_2_intro_list_item_title">C++基础系统课程</div>
                            <span className="sec_2_intro_list_item_sub_title_c">信息学备战</span>
                            <div className="sec_2_intro_list_item_sub_title">使用人工智能时代广泛的编程语言Python，教授孩子更多的源码编程技巧，让孩子逐步适应源码编程的方思考问题。</div>
                        </li>
                        <li className="sec_2_intro_list_item_noip">
                            <div className="sec_2_intro_list_item_title">NOIP信息学冲刺课程</div>
                            <span className="sec_2_intro_list_item_sub_title_noip">信息学备战</span>
                            <div className="sec_2_intro_list_item_sub_title">使用人工智能时代广泛的编程语言Python，教授孩子更多的源码编程技巧，让孩子逐步适应源码编程的方思考问题。</div>
                        </li>
                    </ul>
                </div>
                <div className="sec_3">

                </div>
                <div className="sec_4">
                    <div className="sec_4_title">
                        科学方法、让学习事半功倍
                    </div>
                    <div className="sec_4_content">
                        <div className="sec_4_content_item">
                            <div className="sec_4_content_img_list_left">
                                <img src={baseUrl.getBaseUrl()+"/src/img/sec_4_left_live.png"} alt="" className="sec_4_left_live"/>
                                <img src={baseUrl.getBaseUrl() + "/src/img/sec_4_left_1v1.png"} alt="" className="sec_4_left_live"/>
                            </div>
                            <div className="sec_4_left_bottom">
                                <div>名师直播+1V1专职辅导</div>
                                <div>双师模式</div>
                            </div>
                        </div>
                        <div className="sec_4_content_item">
                            <div className="sec_4_content_img_list_right">
                                <img src={baseUrl.getBaseUrl() + "/src/img/sec_4_right_1.png"} alt="" className="sec_4_right_live_1"/>
                                <img src={baseUrl.getBaseUrl() + "/src/img/sec_4_right_2.png"} alt="" className="sec_4_right_live_2"/>
                                <img src={baseUrl.getBaseUrl() + "/src/img/sec_4_right_3.png"} alt="" className="sec_4_right_live_3"/>
                            </div>
                            <div className="sec_4_left_bottom">
                                <div>课前预习视频+课后复习讲义、项目作业</div>
                                <div>多维度环节设计</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sec_5">
                    <div className="sec_5_title">
                        松鼠编程 技术合作
                    </div>
                    <ul className="sec_5_content">
                       {/*<li className="sec_5_content_item_1"></li>*/}
                       {/*<li className="sec_5_content_item_2"></li>*/}
                       {/*<li className="sec_5_content_item_3"></li>*/}
                       {/*<li className="sec_5_content_item_4"></li>*/}
                        {cooperationNodes}
                    </ul>
                </div>
                <div className="sec_6">
                    <div className="sec_6_title">常见问题</div>
                    <div className="sec_6_problem_list_box">
                        <ul className="sec_6_problem_list" style={{width:(this.state.problemList.length*4.14-0.4)+"rem"}}>
                            {problemNodes}
                        </ul>
                    </div>
                </div>
                <div className="sec_7">
                    <div className="sec_7_enjoy_btn">
                        ￥9.9试学一期班（8课时）
                    </div>
                </div>
                <FooterView/>
            </div>
        )
    }
}