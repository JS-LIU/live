/**
 * Created by Liudq on 2019-08-17
 */
export class PreVideo {
    constructor(preVideoStatus,preVideoId){
        this.preVideoStatus = preVideoStatus;
        this.preVideoId = preVideoId;
    }
    static statusStrategy(){
        return {
            "0":{
                name:"不可查看",
                color:"#c7c7c7",
                url:"/src/img/pre_video_icon_cant_watch.png",
            },
            "1":{
                name:"可查看",
                color:"#000000",
                url:"/src/img/pre_video_icon_can_watch.png",
            }
        }
    }
    getPreVideoStatus(){
        return PreVideo.statusStrategy()[this.preVideoStatus];
    }
}