/**
 * Created by Liudq on 2019-07-30
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {payService} from "../../service/PayService";
import {orderService} from "../../service/OrderService";
import QRcode from 'qrcode.react';
export class PayView extends Component{
    constructor(props){
        super(props);
        this.state = {
            orderInfo:null,
            payInfo:null
        }
    }
    componentDidMount() {
        this.setState({
            orderInfo:orderService.getOrder(),
            payInfo:payService.getPay()
        })
    }

    render() {
        console.log(this.state.orderInfo);
        console.log(this.state.payInfo);
        if(!this.state.orderInfo && !this.state.payInfo){
            return null
        }
        return(
            <div>
                <div>{this.state.orderInfo.orderNo}</div>
                <div>{this.state.payInfo.payUrl}</div>
                <QRcode value={this.state.payInfo.payUrl}/>
            </div>
        )
    }

}
