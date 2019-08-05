/**
 * Created by Liudq on 2019-07-24
 */
export class TimeManager {
    constructor(){
        this.activeTime = [];
    }
    //  将时间转换为时间戳 ("yyyy-mm-dd hh:mm:ss")
    static convertToTimeStampBySec(date){
        return new Date(date).getTime() / 1000;
    }
    //  当前时间戳
    static currentTimeStampBySec(){
        return Date.parse(new Date()) / 1000;
    }
    //  分钟转换秒
    static convertMinToSec(min){
        return min * 60;
    }

    //  秒转换分钟
    static convertSecToMin(sec){
        return parseInt(sec / 60);
    }
    //  剩余秒
    static convertRemainSec(sec){
        return sec % 60;
    }
    //  倒计时
    static getCountDownTime(sec) {
        return TimeManager.convertSecToMin(sec) + ":" + TimeManager.paddingZero(TimeManager.convertRemainSec(sec));
    }
    //  补领
    static paddingZero(paddingTarget){
        return (paddingTarget < 10 ? '0' + paddingTarget : paddingTarget);
    }
}
