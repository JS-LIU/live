/**
 * Created by Liudq on 2019-08-05
 */
import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {baseUrl} from "../../config/config";
import footerStyle from './footerStyle.css';
import {HB} from "../../util/HB";

export class FooterView extends Component{
    constructor(props) {
        super(props);
    }
    backToTop(){
        HB.ui.scrollTop(0,400);
    }
    render() {
        return (
            <div className="common_footer" style={this.props.style}>
                <div className="common_footer_main">
                    <div className="common_footer_left">
                        <div className="common_footer_left_top">
                            <Link to="/vipCodeIntroduce/aboutUs" className="common_footer_left_top_link_item">关于我们</Link>
                            <Link to="/vipCodeIntroduce/policy" className="common_footer_left_top_link_item">隐私政策</Link>
                            <Link to="/vipCodeIntroduce/userProtocol" className="common_footer_left_top_link_item">用户协议</Link>
                        </div>
                        <div className="common_footer_left_bottom">
                            <div>
                                Copyright © 2018, VIPCODE Education and Technology Co., Ltd.（Beijing）All Rights Reserved.北京未科教育科技有限公司
                            </div>
                            <div>
                                京ICP备18000095号-1京公网安备 11010102003111号
                            </div>
                        </div>
                    </div>
                    <div className="common_footer_right">
                        <div className="common_footer_right_top">
                            <div className="common_footer_right_top_customer_service">
                                <div className="common_footer_right_top_customer_service_phone">客服电话：400-621-6161</div>
                                <div className="common_footer_right_top_customer_service_time">周一至周日 9:00-24:00（春节除外）</div>
                                <img src={baseUrl.getBaseUrl()+ "/src/img/back_to_top.png"}
                                     onClick={this.backToTop.bind(this)}
                                     alt=""
                                     className="back_to_top_btn"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
