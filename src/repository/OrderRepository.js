import {commonAjax} from "../config/config";
import {userService} from "../service/UserService";

/**
 * Created by Liudq on 2019/10/8
 */
import {platform} from "../config/config";

export class OrderRepository {
    constructor(){
        this.orderAjax = commonAjax.resource('/order/:platform/:version/:action');
        // this.miniOrderAjax = commonAjax.resource('/order/x/v1.0/:action');
        // this._preOrder = function(postInfo){
        //     return miniOrderAjax.save({action:"preOrder"},postInfo,{name:"token",value:userService.login.token})
        // };
        // this._preOrder = function(postInfo) {
        //     return orderAjax.save({
        //         action: "preOrder"
        //     }, postInfo, {
        //         name: "token",
        //         value: userService.login.token
        //     })
        // };
        // this._rePay = function(postInfo) {
        //     return orderAjax.save({
        //         action: "payment"
        //     }, postInfo, {
        //         name: "token",
        //         value: userService.login.token
        //     })
        // }
        // this._orderDetail = function(postInfo) {
        //     return miniOrderAjax.save({
        //         action: "orderDetail"
        //     }, postInfo, {
        //         name: "token",
        //         value: userService.getUser().token
        //     })
        // }

        // this._createOrder = function(postInfo){
        //     return orderAjax.save({action:'createOrder'},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._reCreateOrder = function(postInfo){
        //     return orderAjax.save({action:"paymentOrder"},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._cancelOrder = function(postInfo){
        //     return orderAjax.save({action:"cancelOrder"},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._queryOrderStatus = function(postInfo){
        //     return orderAjax.save({action:"queryOrderStatus"},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._getOrderList = function(postInfo){
        //     return orderAjax.save({action:"pageOrder"},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._queryOrderDetail = function(postInfo){
        //     return orderAjax.save({action:"queryOrderDetail"},postInfo,{name:"token",value:userService.login.token});
        // };



    }
    preOrder(postInfo){
        return this.orderAjax.save({platform:platform,version:"v1.1",action:"preOrder"},postInfo,{name:"token",value:userService.login.token})
    }
    //  触发3005的重新支付
    orderDetail(postInfo){
        return this.orderAjax.save({platform:platform,version:"v1.1",action:'orderDetail'},postInfo,{name:"token",value:userService.login.token})
    }
    //  3001使用该接口
    rePay(postInfo){
        return this.orderAjax.save({platform:platform,version:"v1.1",action:"payment"},postInfo,{name:"token",value:userService.login.token});
    }
    createOrder(postInfo){
        return this.orderAjax.save({platform:platform,version:"v1.1",action:'createOrder'},postInfo,{name:"token",value:userService.login.token})
    }
    reCreateOrder(postInfo){
        return this.orderAjax.save({platform:platform,version:"v1.1",action:"paymentOrder"},postInfo,{name:"token",value:userService.login.token});
    }
    cancelOrder(postInfo){
        return this.orderAjax.save({platform:platform,version:"v1.1",action:"cancelOrder"},postInfo,{name:"token",value:userService.login.token});
    }
    queryOrderStatus(postInfo){
        return this.orderAjax.save({platform:platform,version:"v1.0",action:"queryOrderStatus"},postInfo,{name:"token",value:userService.login.token});
    }
    getOrderList(postInfo){
        return this.orderAjax.save({platform:platform,version:"v1.1",action:"pageOrder"},postInfo,{name:"token",value:userService.login.token});
    }
    queryOrderDetail(postInfo){
        return this.orderAjax.save({platform:platform,version:"v1.1",action:"queryOrderDetail"},postInfo,{name:"token",value:userService.login.token});
    }
}
export let orderRepository = new OrderRepository();