/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactSwiper from 'reactjs-swiper';

import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {FooterView} from "../../component/FooterView/FooterView";
import HomeStyle from './HomeStyle.css';
export class HomeView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo:{},
            activeImgList:[{
                image: '/src/img/activeImg_1.png',
                title: 'vipCode',
                link: 'http://www.baidu.com'
            }],
        }
    }

    componentDidMount() {
        userService.getUserInfo().then(()=>{
            this.setState((state,props)=>{
                return {
                    userInfo:userService.getUser().userInfo
                }
            })
        });
    }
    render() {
        return(
            <div>
                <HeaderView userInfo={this.state.userInfo} />
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
                        <img src="/src/img/sec_2_video_play_btn.png" className="sec_2_video_play_btn" alt=""/>
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
                                <img src="/src/img/sec_4_left_live.png" alt="" className="sec_4_left_live"/>
                                <img src="/src/img/sec_4_left_1v1.png" alt="" className="sec_4_left_live"/>
                            </div>
                            <div className="sec_4_left_bottom">
                                <div>名师直播+1V1专职辅导</div>
                                <div>双师模式</div>
                            </div>
                        </div>
                        <div className="sec_4_content_item">
                            <div className="sec_4_content_img_list_right">
                                <img src="/src/img/sec_4_right_1.png" alt="" className="sec_4_right_live_1"/>
                                <img src="/src/img/sec_4_right_2.png" alt="" className="sec_4_right_live_2"/>
                                <img src="/src/img/sec_4_right_3.png" alt="" className="sec_4_right_live_3"/>
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
                       <li className="sec_5_content_item_1"></li>
                       <li className="sec_5_content_item_2"></li>
                       <li className="sec_5_content_item_3"></li>
                       <li className="sec_5_content_item_4"></li>
                    </ul>
                </div>
                <div className="sec_6">
                    <div className="sec_6_title">常见问题</div>
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