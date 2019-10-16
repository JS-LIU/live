/**
 * Created by Liudq on 2019/9/11
 */
import {TimeManager} from "./TimeManager";

export class Coupon {
    constructor(couponInfo) {
        this.accountCouponNo = couponInfo.accountCouponNo;
        this.couponName = couponInfo.couponName;
        this.cash = couponInfo.cash;
        this.type = couponInfo.type;
        this.endTime = TimeManager.convertStampToYMD(couponInfo.endTime, "unix");
        this.limit = couponInfo.limit;
        this.couponStatus = couponInfo.couponStatus;
        this.mulityStatus = couponInfo.mulityStatus;
        this.preReduce = couponInfo.minCondition;
        this.selected = false;
        this.ifSaleGrant = couponInfo.ifSaleGrant;
        this.name = this.setCouponName(couponInfo.ifSaleGrant,this.cash);
    }

    setCouponName(ifSaleGrant,cash){
        if(ifSaleGrant === 1){
            return "满"+cash/100+"元可用";
        }else{
            return "代金券";
        }
    }
    toggleSelect(alreadyUsed, totalPrice) {
        if (this.isCanSelect(alreadyUsed, totalPrice)) {
            this.selected = !this.selected;
        }
    }
    isCanSelect(alreadyUsed, totalPrice) {
        return this.isSelect.after(this.isCanUse).after(this.isMaxUse).call(this,alreadyUsed, totalPrice);
    }
    isSelect() {
        if (this.selected) {
            return true;
        }
        return 'nextSuccessor';
    }
    isCanUse() {
        if (this.couponStatus === 0) {
            return false;
        }
        return 'nextSuccessor';
    }
    isMaxUse(alreadyUsed, totalPrice) {
        if (alreadyUsed < this.getMaxCanUse(totalPrice)) {
            return true;
        }
    }



    getMaxCanUse(totalPrice) {

        return this.calcCantMulity.after(this.calcCanMulity).call(this,totalPrice);
    }

    calcCantMulity() {
        if (this.mulityStatus === 0) {
            return 1;
        }
        return "nextSuccessor";
    }
    calcCanMulity(totalPrice) {
        if (this.preReduce) {
            return this.calcMaxCanUse(totalPrice);
        } else {
            return Infinity;
        }
    }
    calcMaxCanUse(totalPrice) {
        return Math.floor(totalPrice / this.preReduce);
    }

}