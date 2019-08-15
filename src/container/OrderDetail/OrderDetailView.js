/**
 * Created by Liudq on 2019-08-12
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {orderService} from "../../service/OrderService";

export class OrderDetailView extends Component{
    constructor(props) {
        super(props);
        this.orderNo = this.props.match.params.orderNo;
        this.state = {
            orderInfo:null
        }
    }
    componentDidMount() {
        orderService.queryOrderDetail(this.orderNo).then((orderInfo)=>{
            this.setState({
                orderInfo:orderInfo
            })
        })
    }

    render() {
        return (
            <div>
                <div className="wrap"></div>
                <div className="order_detail_main">
                    <div className="order_detail_title">我的订单</div>
                    <div className="order_detail_product">
                        <div className="order_detail_product_header">
                            <div className="order_detail_product_header_payTime">
                                {this.state.orderInfo.payTime}
                            </div>
                            <div className="order_detail_product_header_orderNo">
                                订单号：{this.state.orderInfo.orderNo}
                            </div>
                        </div>
                        <div className="order_detail_product_info">
                            <div className="order_detail_product_info_left">
                                <div className="order_detail_product_info_left_top">
                                    <div>{this.state.orderInfo.goodName}</div>
                                    <div>{this.state.orderInfo.weeks[0]}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}