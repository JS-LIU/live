/**
 * Created by Liudq on 2019/11/4
 */
import React, {Component} from 'react';
import aboutUsStyle from './aboutUsStyle.css';
import {baseUrl} from "../../config/config";
export class AboutUsView extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="about_us_main">
                <div className="about_us_main_sec_1" />
                <div className="about_us_main_sec_2">
                    <div className="about_us_title">
                        <div>关于我们</div>
                        <div className="about_us_title_line" />
                    </div>
                    <p className="about_us_text">
                        微课编程-中小学生编程网校是北京未科教育公司旗下产品、与VIPCODE-1对1、VIPCODE-小班课同属未科公司旗下在线青少儿编程品牌；未科教育：是用科技推动 教育公平。我们期望通过标准化的编程课程、可视化的编程工具和先进的在线教学系统，让每个孩子都有机会学习更简单、更有趣的编程课，改变孩子未来。
                    </p>
                </div>
                <div className="about_us_main_sec_3">
                    <div className="about_us_title">
                        <div>投资人推荐</div>
                        <div className="about_us_title_line" />
                    </div>
                    <div className="likaifu_ad">
                        <div className="likaifu_introduce">未科编程会帮孩子增强他们的编程能力，学会用编程方法来思考，让他们能够更科学地、更有逻辑地分析解决问题，这才是在人工智能时代，立于不败之地的核心能力。</div>
                        <div className="likaifu_info">
                            <img src={baseUrl.getBaseUrl() + "/src/img/likaifu_signature.png"} className="likaifu_signature" alt=""/>
                            <div className="likaifu_ceo">
                                <div>创新工场董事长兼CEO</div>
                                <div>未科编程投资人</div>
                            </div>
                            <img src={baseUrl.getBaseUrl() +"/src/img/chuangxingongchang_logo.png"} className="chuangxingongchang_logo" alt=""/>
                        </div>
                    </div>
                    <div className="xuxiaoping_ad">
                        <div className="xuxiaoping_introduce">VIPCODE让编程学习更简单，让孩子快乐学编程，为中国孩子的未来打开一条无限可能的通道。</div>
                        <div className="xuxiaoping_info">
                            <img src={baseUrl.getBaseUrl() + "/src/img/xuxiaoping_signature.png"} className="likaifu_signature" alt=""/>
                            <div className="xuxiaoping_ceo">
                                <div>真格基金创始人</div>
                                <div>未科编程投资人</div>
                            </div>
                            <img src={baseUrl.getBaseUrl() +"/src/img/zhengejijin_logo.png"} className="chuangxingongchang_logo" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="about_us_main_sec_4">
                    <div className="about_us_title">
                        <div>所获荣誉</div>
                        <div className="about_us_title_line" />
                    </div>
                    <div className="honor_list">
                        <div className="prize_item">
                            <img src={ baseUrl.getBaseUrl() + "/src/img/tencent_prize.png"} alt="" className="prize_item_pic"/>
                        </div>
                        <div className="prize_item">
                            <img src={baseUrl.getBaseUrl() + "/src/img/wangyi_prize.png"} alt="" className="prize_item_pic"/>
                        </div>
                        <div className="prize_item">
                            <img src={baseUrl.getBaseUrl() + "/src/img/pencil_prize.png"} alt="" className="prize_item_pic"/>
                        </div>
                    </div>
                </div>
                <div className="about_us_main_sec_5">
                    <div className="about_us_title">
                        <div>合作机构</div>
                        <div className="about_us_title_line" />
                    </div>
                    <div className="cooperate_org_list">
                        <div className="cooperate_org_item">
                            <img src={baseUrl.getBaseUrl() + "/src/img/CCF.png"} className="ccf_pic" alt=""/>
                            <div className="ccf_title">
                                <div>中国计算机学会</div>
                                <div>CCF会员单位</div>
                            </div>
                        </div>
                        <div className="cooperate_org_item">
                            <img src={baseUrl.getBaseUrl() + "/src/img/chuangxingongchang_org.png"} className="chuangxingongchang_org_pic" alt=""/>
                            <div className="chuangxingongchang_logo_title">
                                <div>创新工场人工智能研究院</div>
                                <div>技术合作</div>
                            </div>
                        </div>
                        <div className="cooperate_org_item">
                            <img src={baseUrl.getBaseUrl() + "/src/img/comptia.png"} className="comptia_pic" alt=""/>
                            <div className="comptia_title">
                                <div>美国计算机行业学会</div>
                                <div>金牌会员</div>
                            </div>
                        </div>
                        <div className="cooperate_org_item">
                            <img src={baseUrl.getBaseUrl() + "/src/img/AAI.png"} className="aai_pic" alt=""/>
                            <div className="aai_title">
                                <div>中国计算机学会</div>
                                <div>CCF会员单位</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

