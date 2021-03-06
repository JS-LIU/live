/**
 * Created by Liudq on 2019-08-13
 */
import {baseUrl} from "../config/config";

export class CourseType {
    constructor(type){
        this.type = type;
        //  状态机
        // this.currentStatus = type;
    }
    static StatusManager(){
        return {
            "1":{
                id:1,
                name:"p",
                background:"#00b7ba",
                url:baseUrl.getBaseUrl() + "/src/img/product_course_python_header_bg.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/icon_py.png",
                //  切换状态
                // cutNextStatus:()=>{
                //     this.currentStatus = CourseType.StatusManager()["2"];
                // }
            },
            "2":{
                id:2,
                name:"c",
                background:"#4161A6",
                url:baseUrl.getBaseUrl() + "/src/img/product_course_c++_header_bg.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/icon_c.png"
            },
            "3":{
                id:3,
                name:"s",
                background:"#ffba31",
                url:baseUrl.getBaseUrl() + "/src/img/product_course_noi_header_bg.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/icon_s.png"
            }
        }
    }
    getTypeInfo(){
        return CourseType.StatusManager()[this.type];
    }
}