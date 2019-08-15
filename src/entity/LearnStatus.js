/**
 * Created by Liudq on 2019-08-14
 */
export class LearnStatus {
    constructor(status){
        this.status = status;
    }
    static statusStrategy(){
        return {
            "0":{
                name:"未开课",
                background:"#FFFFFF",
                color:"#808080"
            },
            "1":{
                name:"正在学",
                background:"#61BF55",
                url:"#FFFFFF"
            },
            "2":{
                name:"已结束",
                background:"#FFFFFF",
                url:"#808080"
            }
        }
    }
    getStatusInfo(){
        return LearnStatus.statusStrategy()[this.status];
    }
}