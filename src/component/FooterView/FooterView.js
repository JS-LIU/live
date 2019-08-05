/**
 * Created by Liudq on 2019-08-05
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import footerStyle from './footerStyle.css';

export class FooterView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            style:{}
        }
    }
    componentDidMount() {
        this.setState({
            style:this.props.style
        })
    }

    render() {
        return (
            <div className="common_footer" style={this.state.style}>
                <div className="common_footer_main">
                    <div className="common_footer_left">
                        <div className="common_footer_left_top">
                            <Link className="common_footer_left_top_link_item">关于我们</Link>
                            <Link className="common_footer_left_top_link_item">关于我们</Link>
                            <Link className="common_footer_left_top_link_item">关于我们</Link>
                            <Link className="common_footer_left_top_link_item">关于我们</Link>
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
                            </div>
                        </div>


                    </div>
                </div>



            </div>
        );
    }


}
