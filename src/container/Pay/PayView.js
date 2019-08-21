/**
 * Created by Liudq on 2019-07-30
 */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {payService} from "../../service/PayService";
import {orderService} from "../../service/OrderService";
import QRcode from 'qrcode.react';
import {TimeManager} from "../../entity/TimeManager";
import payStyle from './payStyle.css';
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";

export class PayView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: null,
            payInfo: null,
            orderStatus: "",
            countDown: ""
        }
    }

    componentDidMount() {
        this.setState({
            orderInfo: orderService.getOrder(),
            payInfo: payService.getPay(),
        });
        let self = this;
        orderService.queryOrderStatus(TimeManager.currentTimeStampBySec(),
            function(status){
                self.props.history.replace('/paySuccess/' + `${status}`);
            }, function(status){
                self.props.history.replace('/payFail/' + `${status}`);
            });
        this.startCountDown();
    }

    startCountDown() {
        this.t = setInterval(() => {
            this.setState({
                countDown: TimeManager.getCountDownTime(orderService.getOrder().payLastTime - TimeManager.currentTimeStampBySec())
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.t);
        orderService.stopQueryOrderStatus();
    }

    render() {
        if (!this.state.orderInfo && !this.state.payInfo) {
            return null
        }
        return (
            <div>
                <HeaderView userInfo={userService.getUser().userInfo}/>
                <div className="pay_body">
                    <div className="pay_body_header">
                        <div className="pay_body_top">
                            <div className="orderInfoLeft">
                                <div className="pay_body_top_title_box">
                                    <p>
                                        <span>订单提交成功，请您尽快付款！ 订单号：</span>
                                        <span className="orderNum">{this.state.orderInfo.orderNo}</span>
                                    </p>
                                    <p>
                                        <span>订单将为你保留</span>
                                        <span className="order_count_down_text">{this.state.countDown}</span>
                                        <span>分钟, 请抓紧时间支付</span>
                                    </p>
                                </div>
                            </div>
                            <div className="order_price">应付金额： ￥{this.state.orderInfo.payPrice / 100}</div>
                        </div>
                    </div>
                    <div className="pay_body_info_box">
                        <ul className="pay_body_pay_way">
                            <li>微信支付</li>
                            <li>支付宝支付</li>
                        </ul>
                        <div className="pay_qrCode_box">
                            <QRcode style={{
                                width: "2.6rem",
                                height: "2.6rem",
                                padding: "0.15rem",
                                border: "0.01rem solid #61BF55"
                            }} value={this.state.payInfo.payUrl}/>
                            <div className="pay_qrCode_tips_text">
                                <div>请使用微信扫一扫</div>
                                <div>扫描二维码支付</div>
                            </div>
                            <div className="already_pay_btn">我已支付</div>
                            <div className="already_pay_btn_bg"/>
                        </div>
                    </div>
                    {/*<div>{this.state.orderInfo.orderNo}</div>*/}
                    {/*<div>{this.state.payInfo.payUrl}</div>*/}
                    {/*<QRcode value={this.state.payInfo.payUrl}/>*/}
                    {/*<div>{this.state.orderStatus}</div>*/}
                </div>

            </div>
        )
    }

}
