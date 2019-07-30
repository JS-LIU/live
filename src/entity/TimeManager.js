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
    static convertMinToSec(min){
        return min * 60;
    }
    static convertMinToMs(min){
        return min * 60 * 1000;
    }
    static convertSecToMs(sec){
        return sec * 1000;
    }
}
