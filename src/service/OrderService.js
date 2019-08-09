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

class OrderService {
    constructor(){
        let orderAjax = commonAjax.resource('/order/w/v1.0/:action');

        this.orderList = [];
        this._createOrder = function(postInfo){
            return orderAjax.save({action:'createOrder'},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._queryOrderStatus = function(postInfo){
            return orderAjax.save({action:"queryOrderStatus"},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._getOrderList = function(postInfo){
            return orderAjax.save({action:"pageOrder"},postInfo,{name:"token",value:userService.getUser().token});
        };

        this.searchOrderStatus = new SearchOrderStatus();
        this.order = null;
        this.orderProduct = null;
        this.pagination = new Pagination(1,3);
    }
    createOrder(productCourse){
        return this._createOrder({
            goodNo:productCourse.goodNo,
            salePrice:productCourse.salePrice
        }).then((data)=>{
            this.createOrderProduct(productCourse);
            this.order = new Order(data.data);
            return new Promise((resolve, reject)=>{
                resolve({order:this.order,payModels:data.data.payModels})
            });
        })
    }

    /**
     * 创建订单商品
     */
    createOrderProduct(productCourse){
        this.orderProduct =  new OrderProduct(productCourse);
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
            this._queryOrderStatus({
                orderNo:this.order.orderNo
            }).then((data)=>{
                currentTimeStampBySec = TimeManager.currentTimeStampBySec();
                console.log(data.data.orderStatus);
                console.log(this.order.getOrderStatus(data.data.orderStatus));
                if(this.order.getOrderStatus(data.data.orderStatus) === "已支付"){
                    console.log("已支付");
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
            clearInterval(this.timing);
            this.queryTiming(queryStep,TimeManager.currentTimeStampBySec(),boundOfFrequently);
        }
        if(this.order.isOverDue(TimeManager.currentTimeStampBySec())){
            clearInterval(this.timing);
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
        return this._getOrderList({
            orderStatus:this.searchOrderStatus.getCurrentSearchOrderStatus().status,
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size
        }).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.data && data.data.list){
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
}
export let orderService = new OrderService();