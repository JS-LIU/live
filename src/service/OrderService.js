/**
 * Created by Liudq on 2019-07-29
 */

import {commonAjax} from "../config/config";
import {TimeManager} from "../entity/TimeManager";
import {userService} from "./UserService";
import {Order} from "../entity/Order";
import {payService} from './PayService';

class OrderService {
    constructor(){
        let orderAjax = commonAjax.resource('/order/w/v1.0/:action');
        this.orderList = [];
        this._createOrder = function(postInfo){
            return orderAjax.save({action:'createOrder'},postInfo,{name:"token",value:userService.getUser().token});
        };
        this.order = null;
    }
    createOrder(productCourse){
        return this._createOrder({
            goodNo:productCourse.goodNo,
            salePrice:productCourse.salePrice
        }).then((data)=>{
            this.order = new Order(data.data);
            return new Promise((resolve, reject)=>{
                resolve({order:this.order,payModels:data.data.payModels})
            });
        })
    }
    getOrder(){
        return this.order;
    }
}
export let orderService = new OrderService();