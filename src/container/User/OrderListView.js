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
import {CourseTimeShowView} from "../../component/CourseTimeShow/CourseTimeShowView";
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
            console.log(list);
            this.setState({
                orderList:list,
                total:orderService.pagination.getTotalPage()
            })
        })
    }
    toPay(orderItem){
        return ()=>{
            console.log(orderItem);
            if(orderItem.status === 3005){
                // let url = "/confirmOrder?productCourseNo=''&orderNo="+orderItem.orderNo+"&requestWay=orderDetail";
                let url = `/confirmOrder?orderNo=${orderItem.orderNo}&requestWay=orderDetail`;
                this.props.history.push(url);
            }else if(orderItem.status === 3001){
                orderService.rePay(orderItem.orderNo).then((info)=>{
                    payService.createPay(info.data.payModels,info.data.payPrice);
                    this.props.history.replace("/pay");
                });
            }
        }
    }
    cancelOrder(orderItem){
        return ()=>{
            orderService.cancelOrder(orderItem).then(()=>{
                return orderService.getOrderList()
            }).then((list)=>{
                this.setState({
                    orderList:list,
                })
            }).catch((msg)=>{
                alert(msg);
            })
        }
    }
    getOrderStatus(orderItem){
        if(orderItem.status === 3004){
            return (
                <div>
                    <div className="order_list_pay_item">已过期</div>
                    <Link className="order_list_pay_item" to={"/user/orderDetail/"+`${orderItem.orderNo}`}>订单详情</Link>
                </div>
            )
        }else if(orderItem.status === 3003){
            return (
                <div>
                    <div className="order_list_pay_item">已取消</div>
                    <Link className="order_list_pay_item" to={"/user/orderDetail/" + `${orderItem.orderNo}`}>
                        订单详情
                    </Link>
                </div>
            )
        }else if(orderItem.status === 3002){
            return (
                <div>
                    <div className="order_list_pay_item">已支付</div>
                    <Link className="order_list_pay_item" to={"/user/orderDetail/" + `${orderItem.orderNo}`}>
                        订单详情
                    </Link>
                </div>
            )
        }
        else if(orderItem.status === 3001||orderItem.status === 3005){
            return (
                <div>
                    <div className="repay_now" onClick={this.toPay(orderItem)}>立即支付</div>
                    <div className="cancel_order" onClick={this.cancelOrder(orderItem)}>取消订单</div>
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
                let productModule = orderItem.orderCourse.getModule.before((repairParam) => {
                    repairParam = repairParam || {};
                    repairParam.showSellPrice = (orderItem.sellPrice / 100).toFixed(2);
                    repairParam.startTime = orderItem.orderCourse.courseInfo.getStartTimeToShow("unix");
                    repairParam.endTime = orderItem.orderCourse.courseInfo.getEndTimeToShow("unix");
                }).call(orderItem.orderCourse, {});
                orderItem.orderCourseModule = productModule;

                console.log(orderItem);
                return (
                    <div className="order_list_order_item" key={index}>
                        <div className="order_list_order_item_header">
                            <span>{TimeManager.convertStampToYMD(orderItem.orderCreateTime,"unix")}</span>
                            <span className="order_list_order_item_order_no">订单号：{orderItem.orderNo}</span>
                        </div>
                        <div className="order_list_order_item_center">
                            <div className="order_list_order_item_center_left">
                                <div className="order_list_order_item_center_left_info">
                                    <span className="order_list_order_item_center_left_info_name"
                                          style={{background:"url('"+orderItem.orderCourseModule.type.iconBackground +"') no-repeat left center",backgroundSize:"0.25rem"}}>{orderItem.orderCourseModule.courseName}</span>
                                    <CourseTimeShowView
                                        style={{
                                            display:"flex",
                                            flexDirection: "row",
                                            fontSize: "0.12rem",
                                            marginTop: "0.15rem",
                                            paddingLeft:"0.35rem"
                                        }}
                                        showTimeStepEnd={false}
                                        timeType={"unix"}
                                        timeStep={orderItem.orderCourseModule.timeList}
                                        startTime={orderItem.orderCourseModule.startTime}
                                        endTime={orderItem.orderCourseModule.endTime}
                                    />
                                </div>
                                <div className="order_list_order_item_center_left_price">
                                    ￥{orderItem.orderCourseModule.sellPrice / 100}
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