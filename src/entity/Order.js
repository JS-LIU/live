/**
 * Created by Liudq on 2019-07-30
 */
import {TimeManager} from "./TimeManager";

export class Order {
    constructor(orderInfo){
        this.orderNo = orderInfo.orderNo;
        this.payPrice = orderInfo.payPrice;
        this.payLastTime = orderInfo.payLastTime;
    }

    /**
     * 是否过期
     * @returns {boolean}
     */
    isOverDue(currentTimeStampBySec){
        return (currentTimeStampBySec > this.payLastTime);
    }
}