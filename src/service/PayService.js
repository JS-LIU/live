/**
 * Created by Liudq on 2019-07-30
 */
import {Pay} from "../entity/Pay";

class PayService {
    constructor(){
        this.pay = null;
    }
    createPay(payModels,payPrice){
        this.pay = new Pay(payModels,payPrice);
    }
    getPay(){
        return this.pay;
    }
}

export let payService = new PayService();
