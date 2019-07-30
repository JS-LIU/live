/**
 * Created by Liudq on 2019-07-29
 */

import {commonAjax} from "../config/config";
import {TimeManager} from "../entity/TimeManager";
import {userService} from "./UserService";
class OrderService {
    constructor(){
        let orderAjax = commonAjax.resource('/order/w/v1.0/:action');
        this.orderList = [];
        this._createOrder = function(postInfo){
            return orderAjax.save({action:'takeOrder'},postInfo,{name:"token",value:userService.getUser().token});
        }
    }
    createOrder(productCourse){
        return this._createOrder({
            goodNo:productCourse.goodNo,
            salePrice:productCourse.salePrice
        }).then((data)=>{
            console.log(data);
        })
    }
}
export let orderService = new OrderService();