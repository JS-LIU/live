/**
 * Created by Liudq on 2019-08-07
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {orderService} from "../../service/OrderService";
import ReactPaginate from 'react-paginate';
import orderListStyle from "./orderListStyle.css";
import {TimeManager} from "../../entity/TimeManager";
import {payService} from "../../service/PayService";
export class OrderListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList:null,
            total:1
        }
    }
    componentWillUnmount() {
        orderService.pagination.to(1);
    }

    componentDidMount() {
        //  设计暂时只有全部订单
        orderService.getOrderList().then((list)=>{
            this.setState({
                orderList:list,
                total:orderService.pagination.getTotalPage()
            })
        })
    }
    toPay(orderItem){
        return ()=>{
            orderService.reCreateOrder(orderItem).then((info)=>{
                payService.createPay(info.payModels);
                this.props.history.replace("/pay");
            });

        }
    }
    cancelOrder(orderItem){
        return ()=>{
            orderService.cancelOrder(orderItem).then(()=>{
                this.onChangePage(orderService.pagination.pageNum)
            }).catch((msg)=>{
                alert(msg);
            })
        }
    }
    getOrderStatus(orderItem){
        if(orderItem.status === 3004){
            return (
                <div>
                    <div>已过期</div>
                    <Link to={"/orderDetail/"+`${orderItem.orderNo}`}>订单详情</Link>
                </div>
            )
        }else if(orderItem.status === 3003){
            return (
                <div>
                    <div>已取消</div>
                    <Link to={"/orderDetail/" + `${orderItem.orderNo}`}>
                        查看订单
                    </Link>
                </div>
            )
        }else if(orderItem.status === 3002){
            return (
                <div>
                    <div>已支付</div>
                    <Link to={"/orderDetail/" + `${orderItem.orderNo}`}>
                        查看订单
                    </Link>
                </div>
            )
        }
        else if(orderItem.status === 3001){
            return (
                <div>
                    <div onClick={this.toPay(orderItem)}>去支付</div>
                    <div onClick={this.cancelOrder(orderItem)}>取消订单</div>
                </div>
            )
        }
    }
    getOrderItemNodes(){
        if(!this.state.orderList){
            return (
                <div className="order_list_no_item">
                    暂无订单
                </div>
            )
        }else{
            return this.state.orderList.map((orderItem,index)=>{
                return (
                    <div className="order_list_order_item" key={index}>
                        <div className="order_list_order_item_header">
                            <span>{TimeManager.convertStampToYMD(orderItem.orderCreateTime,"unix")}</span>
                            <span className="order_list_order_item_order_no">订单号：{orderItem.orderNo}</span>
                        </div>
                        <div className="order_list_order_item_center">
                            <div className="order_list_order_item_center_left">
                                <div className="order_list_order_item_center_left_info">
                                    <span className="order_list_order_item_center_left_info_name">{orderItem.orderCourse.name}</span>
                                    {/*<span className="order_list_order_item_center_left_info_time">{orderItem.orderCourse.weeks[0].week}</span>*/}
                                </div>
                                <div className="order_list_order_item_center_left_price">
                                    ￥{orderItem.orderCourse.sellPrice / 100}
                                </div>
                            </div>
                            <div className="order_list_order_item_center_right">
                                {this.getOrderStatus(orderItem)}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    onChangePage(currentPage){
        console.log(currentPage);
        orderService.pagination.to(currentPage.selected+1);
        orderService.getOrderList().then((list)=>{
            this.setState({
                orderList:list,
            })
        });
    }
    render() {
        return (
            <div className="order_list_box">
                <div className="order_list_box_title">我的订单</div>
                <div className="order_list">
                    {this.getOrderItemNodes()}
                    <ReactPaginate
                        containerClassName={"pagination_box"}
                        pageCount={this.state.total}
                        onPageChange={this.onChangePage.bind(this)}
                        marginPagesDisplayed={1}
                        previousLabel={'上一页'}
                        nextLabel={'下一页'}
                        previousClassName={"page_btn"}
                        nextClassName={"page_btn"}
                        pageClassName={"page_item"}
                        activeLinkClassName={"page_item_active"}
                    />
                </div>
            </div>
        );
    }

}