/**
 * Created by Liudq on 2019-08-17
 */
import {baseUrl} from "../config/config";

export class Courseware {
    constructor(courseWareStatus,courseWareUrl){
        this.courseWareStatus = courseWareStatus;
        this.courseWareUrl = courseWareUrl;
    }
    static StatusManager(){
        return {
            "0":{
                name:"不可查看",
                color:"#c7c7c7",
                url:baseUrl.getBaseUrl() + "/src/img/pdf_icon_cant_read.png",
            },
            "1":{
                name:"可查看",
                color:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/pdf_icon_can_read.png",
            }
        }
    }
    getCourseWareStatus(){
        return Courseware.StatusManager()[this.courseWareStatus];
    }
}