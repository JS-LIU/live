/**
 * Created by Liudq on 2019-07-30
 */
import {TimeManager} from "./TimeManager";

export class Order {
    constructor(orderInfo){
        this.orderNo = orderInfo.orderNo;
        this.payPrice = orderInfo.payPrice;
        this.payLastTime = orderInfo.payLastTime;
        this.frequentlyStep = 2;
        this.lazyStep = 10;
        this.status = orderInfo.status;
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
    getOrderStatus(code){
        return Order.statusStrategy()[code];
    }
}