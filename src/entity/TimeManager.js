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

}
