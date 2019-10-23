/**
 * Created by Liudq on 2019-07-29
 */

import {commonAjax} from "../config/config";
import {TimeManager} from "../entity/TimeManager";
import {userService} from "./UserService";
import {Order} from "../entity/Order";
import {OrderProduct} from "../entity/OrderProduct";
import {Pagination} from "../entity/Pagination";
import {SearchOrderStatus} from "../entity/SearchOrderStatus";
import {SettleManager} from "../entity/SettleManager";
import {orderRepository} from '../repository/OrderRepository';
class OrderService {
    constructor(){
        this.orderList = [];
        this.searchOrderStatus = new SearchOrderStatus();
        this.order = null;
        this.orderProduct = null;
        this.pagination = new Pagination(1,10);
    }
    preOrderStrategy(goodNo, orderNo) {
        return {
            "orderDetail": (goodNo, orderNo) => {
                return orderRepository.orderDetail({
                    orderNo: orderNo
                }).then((data) => {
                    return this.createPreOrderInfo(data);
                })
            },
            "preOrder": (goodNo, orderNo) => {
                return orderRepository.preOrder({
                    goodNo:goodNo
                }).then((data) => {
                    console.log("createPreOrderInfo:",data);
                    return this.createPreOrderInfo(data);
                })
            }
        }
    }
    createPreOrderInfo(data) {
        return new Promise((resolve, reject) => {
            if(data.code!==0){
                reject(data);
            }else{
                this.settleManager = new SettleManager(data.data.sellPrice, data.data.couponList, data.data.account);
                this.order = new Order(data.data);
                this.createOrderProduct(this.order.orderCourse);
                resolve({
                    settleManager: this.settleManager,
                    order: this.order,
                });
            }
        })
    }
    preOrder(preOrderAction, goodNo, orderNo) {
        return this.preOrderStrategy()[preOrderAction].call(this, goodNo, orderNo)
    }
    takeOrder() {
        let userCoupons = this.settleManager.couponManager.getUseCouponAccountCouponNoList();
        return orderRepository.takeOrder({
            orderNo: this.order.orderNo,
            account: this.settleManager.account.getAllowDeltaMax(),
            userCoupons: userCoupons,
            salePrice: this.settleManager.calcRealPay()
        })
    }
    toggleSelectCoupon(accountCouponNo) {
        this.settleManager.couponManager.toggleSelectCoupon(accountCouponNo, this.settleManager.sellPrice);
        return new Promise((resolve, reject) => {
            resolve(this.settleManager)
        })
    }
    toggleUseBalance() {
        this.settleManager.account.toggleUseBalance();
        return new Promise((resolve, reject) => {
            resolve(this.settleManager)
        })
    }


    createOrder(productCourse){
        return orderRepository.createOrder({
            goodNo:productCourse.goodNo,
            salePrice:productCourse.salePrice
        }).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(parseInt(data.code) === 0){
                    this.createOrderProduct(productCourse);
                    this.order = new Order(data.data);
                    resolve({order:this.order,payModels:data.data.payModels})
                }else{
                    reject(data.message);
                }
            });
        })
    }
    reCreateOrder(orderInfo){
        return orderRepository.reCreateOrder({
            orderNo:orderInfo.orderNo
        }).then((data)=>{
            return new Promise((resolve,reject)=>{
                if(parseInt(data.code) === 0){
                    this.createOrderProduct(orderInfo.orderProduct);
                    this.order = new Order(Object.assign(data.data,orderInfo.orderProduct));
                    resolve({order:this.order,payModels:data.data.payModels})
                }else{
                    reject(data.message);
                }
            });

        })
    }
    /**
     * 创建订单商品
     */
    createOrderProduct(orderProduct){
        this.orderProduct =  orderProduct;
        return this.orderProduct;
    }
    getOrderProduct(){
        return this.orderProduct;
    }
    getOrder(){
        return this.order;
    }

    /**
     * 查询订单状态
     * @param currentTimeStampBySec
     * @param success
     * @param fail
     */
    queryOrderStatus(currentTimeStampBySec,success, fail){
        let queryStep = this.order.frequentlyStep;
        let boundOfFrequently = this.order.getBoundOfFrequently(currentTimeStampBySec);
        this.queryTiming(queryStep,currentTimeStampBySec,boundOfFrequently,success, fail);

    }
    stopQueryOrderStatus(){
        clearInterval(this.timing);
    }
    /**
     * 查询定时器
     * @param queryStep
     * @param currentTimeStampBySec
     * @param boundOfFrequently
     * @param success
     * @param fail
     */
    queryTiming(queryStep,currentTimeStampBySec,boundOfFrequently,success, fail){

        this.timing = setInterval(()=>{
            queryStep = this.getQueryStep(currentTimeStampBySec,boundOfFrequently,queryStep);
            orderRepository.queryOrderStatus({
                orderNo:this.order.orderNo
            }).then((data)=>{
                this.order.updateOrderStatus(data.data.orderStatus);
                currentTimeStampBySec = TimeManager.currentTimeStampBySec();
                if(this.order.getOrderStatus(data.data.orderStatus) === "已支付"){
                    success(data.data.orderStatus);
                }
                if(this.order.getOrderStatus(data.data.orderStatus) === "已取消"||this.order.getOrderStatus(data.data.orderStatus) === "已过期"){
                    fail(data.data.orderStatus)
                }
            });
        }, queryStep * 1000)
    }

    /**
     * 定时器频率
     * @param currentTimeStampBySec
     * @param boundOfFrequently
     * @param queryStep
     * @returns {number}
     */
    getQueryStep(currentTimeStampBySec,boundOfFrequently,queryStep){
        if(currentTimeStampBySec > boundOfFrequently && queryStep !== this.order.lazyStep){
            queryStep = this.order.lazyStep;
            this.stopQueryOrderStatus();
            this.queryTiming(queryStep,TimeManager.currentTimeStampBySec(),boundOfFrequently);
        }
        if(this.order.isOverDue(TimeManager.currentTimeStampBySec())){
            this.stopQueryOrderStatus();
        }
        return queryStep;
    }
    //  剩余过期时间
    getRemainTime(currentTimeStampBySec){
        return this.order.getRemainTime();
    }

    /**
     * 按条件查询订单列表
     * @returns {*}
     */
    getOrderList(){
        return orderRepository.getOrderList({
            orderStatus:this.searchOrderStatus.getCurrentSearchOrderStatus().status,
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size
        }).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.data && data.data.list){
                    console.log(data.data.list);
                    this.orderList = this.createOrderList(data.data.list);
                    this.pagination.setTotalSize(data.data.total);
                    resolve(this.orderList);
                }else{
                    reject("没有订单");
                }
            });
        })
    }

    /**
     * 创建订单列表
     * @param orderList
     * @returns {undefined}
     */
    createOrderList(orderList) {
        this.orderList = [];
        for(let i = 0;i < orderList.length;i++){
            this.orderList.push(new Order(orderList[i]));
        }
        return this.orderList;
    }

    queryOrderDetail(orderNo){
        return orderRepository.orderDetail({
            orderNo:orderNo
        }).then((data)=>{
            let order = this.findOrCreateOrderByOrderNo(orderNo);
            order.setDetail(data.data);
            return new Promise((resolve, reject)=>{
                resolve(order);
            })
        });
    }
    findOrCreateOrderByOrderNo(orderNo){
        let order = this.orderList.find((orderItem,index)=>{
            return orderItem.orderNo === orderNo
        });
        if(order){
            return order;
        }else{
            return new Order({orderNo:orderNo});
        }
    }
    cancelOrder(orderItem){
        return orderRepository.cancelOrder({
            orderNo:orderItem.orderNo
        }).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code === 0){
                    resolve(data.data);
                }else{
                    reject(data.message);
                }
            })
        })
    }
    rePay(orderNo) {
        this.order = this.findOrCreateOrderByOrderNo(orderNo);
        this.createOrderProduct(this.order.orderCourse);
        return orderRepository.rePay({
            orderNo: orderNo
        }).then((data)=>{
            this.order.payLastTime = data.data.payLastTime;
            return new Promise((resolve, reject)=>{
                resolve(data);
            })
        })
    }
}
export let orderService = new OrderService();