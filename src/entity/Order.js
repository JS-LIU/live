/**
 * Created by Liudq on 2019-07-30
 */
import {TimeManager} from "./TimeManager";
import {OrderProduct} from "./OrderProduct";
import {Teacher} from "./Teacher";


export class Order {
    constructor(orderInfo){
        this.orderNo = orderInfo.orderNo;
        this.payPrice = orderInfo.payPrice;
        this.payLastTime = orderInfo.payLastTime;
        this.status = orderInfo.status||orderInfo.orderStatus;
        this.sellPrice = orderInfo.sellPrice;
        this.orderCreateTime = orderInfo.orderCreateTime;
        this.frequentlyStep = 2;
        this.lazyStep = 10;
        //  todo 现在order对商品是1对1 1对多的时候改成list
        this.orderCourse = this.createOrderCourse(orderInfo);
        this.orderDetail = null;
    }
    createOrderCourse(productInfo){
        if(productInfo.timeList){
            return new OrderProduct({
                timeList:productInfo.timeList,
                name:productInfo.goodName,
                level:productInfo.series,
                sellPrice:productInfo.sellPrice,
                salePrice: productInfo.salePrice,
                startTime:productInfo.startTime,
                endTime:productInfo.endTime,
                type:productInfo.goodType,
                teacherList: [this.setTeacherByOrderDetail(productInfo)],
                assistantInfo:this.setAssistantInfo(productInfo),
                goodNo:productInfo.goodNo
            });
        }
        return null;
    }
    updateOrderInfo(orderDetail){
        this.payPrice = orderDetail.salePrice;
        this.payLastTime = orderDetail.payLastTime;
        this.status = orderDetail.orderStatus;
        this.sellPrice = orderDetail.sellPrice;
        this.orderCreateTime = orderDetail.orderCreateTime;
    }
    setDetail(orderDetail){
        this.updateOrderInfo(orderDetail);
        this.orderCourse = this.createOrderCourse(orderDetail);
        // this.updateOrderCourseModule();
        this.orderDetail = orderDetail;
        this.setPayTime();
        this.setPayType();
        this.setSalePrice();
        this.setSellPrice();
        this.setReducePrice();
    }

    setTeacherByOrderDetail(productInfo){
        let teacherInfo = null;
        if(productInfo.teacherList){
            teacherInfo = productInfo.teacherList[0]
        }else{
            teacherInfo = productInfo.teacherInfo;
        }
        return new Teacher(teacherInfo);
    }
    setAssistantInfo(productInfo){
        return new Teacher(productInfo.assistant || {});
    }
    /**
     * 是否过期
     * @returns {boolean}
     */
    isOverDue(currentTimeStampBySec){
        return (currentTimeStampBySec > this.payLastTime);
    }

    /**
     * 剩余时间
     */
    getRemainTime(currentTimeStampBySec){
        return currentTimeStampBySec - this.payLastTime;
    }

    /**
     * 获取频繁查询的边界
     */
    getBoundOfFrequently(currentTimeStampBySec){
        return currentTimeStampBySec + 60 < this.payLastTime ? currentTimeStampBySec + 60:this.payLastTime;
    }
    static statusStrategy(){
        return {
            "3001":"未支付",
            "3002":"已支付",
            "3003":"已取消",
            "3004":"已过期"
        }
    }
    getOrderStatus(){
        return Order.statusStrategy()[this.status];
    }

    setPayTime() {
        if(this.status !== 3002){
            this.orderDetail.payTime = this.getOrderStatus(this.status);
        }else{
            // console.log(this.orderDetail.payTime)
            let d = TimeManager.timeStampToDate(this.orderDetail.payTime, "common");
            this.orderDetail.payTime = d.Y + "-" + d.M + "-" + d.D + " " + d.h + ":" + d.m + ":" + d.s
        }
    }


    setPayType() {
        if(this.status !== 3002){
            this.orderDetail.payType = this.getOrderStatus(this.status);
        }else{
            this.orderDetail.payType = "微信支付";
        }
    }

    setSalePrice() {
        console.log("status:==",this.status);
        if (this.status !== 3002) {
            this.orderDetail.salePrice = "0.00";
        } else {
            this.orderDetail.salePrice = (this.orderDetail.salePrice / 100).toFixed(2);
        }


    }

    setSellPrice() {
        this.orderDetail.sellPrice = (this.orderDetail.sellPrice / 100).toFixed(2);
    }
    setReducePrice(){
        if (this.status !== 3002) {
            return this.orderDetail.reducePrice = "0.00";
        } else {
            this.orderDetail.reducePrice = parseFloat(this.orderDetail.sellPrice) - parseFloat(this.orderDetail.salePrice);
        }

    }
    updateOrderStatus(status){
        this.status = status;
    }
    getModule(){
        return {
            orderNo :this.orderNo,
            payPrice :this.payPrice,
            payLastTime :this.payLastTime,
            status: this.getOrderStatus(),
            payType: this.orderDetail.payType,
            sellPrice :this.orderDetail.sellPrice,
            salePrice: this.orderDetail.salePrice,
            orderCreateTime :this.orderCreateTime,
            payTime: this.orderDetail.payTime,
            reducePrice: this.orderDetail.reducePrice
        }
    }
}