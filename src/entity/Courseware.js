/**
 * Created by Liudq on 2019-08-17
 */
export class Courseware {
    constructor(courseWareStatus,courseWareUrl){
        this.courseWareStatus = courseWareStatus;
        this.courseWareUrl = courseWareUrl;
    }
    static statusStrategy(){
        return {
            "0":{
                name:"不可查看",
                color:"#c7c7c7",
                url:"/src/img/pdf_icon_cant_read.png",
            },
            "1":{
                name:"可查看",
                color:"#000000",
                url:"/src/img/pdf_icon_can_read.png",
            }
        }
    }
    getCourseWareStatus(){
        return Courseware.statusStrategy()[this.courseWareStatus];
    }
}