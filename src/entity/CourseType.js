/**
 * Created by Liudq on 2019-08-13
 */
export class CourseType {
    constructor(type){
        this.type = type;
        //  状态机
        // this.currentStatus = type;
    }
    static StatusManager(){
        return {
            "1":{
                name:"p",
                background:"#00b7ba",
                url:"/src/img/product_course_python_header_bg.png",
                iconBackground:"/src/img/icon_py.png",
                //  切换状态
                // cutNextStatus:()=>{
                //     this.currentStatus = CourseType.StatusManager()["2"];
                // }
            },
            "2":{
                name:"c",
                background:"#4161A6",
                url:"/src/img/product_course_c++_header_bg.png",
                iconBackground:"/src/img/icon_c.png"
            },
            "3":{
                name:"n",
                background:"#b178c8",
                url:"/src/img/product_course_noi_header_bg.png",
                iconBackground:"/src/img/icon_noip.png"
            }
        }
    }
    getTypeInfo(){
        return CourseType.StatusManager()[this.type];
    }
}