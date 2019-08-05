/**
 * Created by Liudq on 2019-07-26
 */
export class ProductCourse {
    constructor(productInfo){
        this.id = productInfo.id;
        this.goodNo = productInfo.goodNo;
        this.type = productInfo.type;
        this.level = productInfo.level;
        this.name = productInfo.name;
        this.startTime = productInfo.startTime;
        this.endTime = productInfo.endTime;
        this.totalLessonNum = productInfo.totalLessonNum;
        this.salePrice = productInfo.salePrice;
        //    主讲人列表
        this.teacherInfoList = productInfo.teacherInfoList;
        this.bgStyle = this.setBg();
    }
    getMajorSpeaker(){
        return this.teacherInfoList[0];
    }
    /**
     * 补全详情
     */
    repairDetail(detail){
        this.detail = detail;
    }
    getDetail(){
        return this.detail;
    }
    getStartTimeByShow(){

    }
    getEndTimeByShow(){

    }
    setBg(){
        return ProductCourse.bgStrategy()[this.type];
    }
    static bgStrategy() {
        return {
            "1":{
                bgKey:"python",
                bg:"#00b7ba",
                url:"src/img/product_course_python_header_bg.png"
            },
            "2":{
                bgKey:"c++",
                bg:"#4161A6",
                url:"src/img/product_course_c++_header_bg.png"
            },
            "3":{
                bgKey:"noi",
                bg:"#b178c8",
                url:"src/img/product_course_noi_header_bg.png"
            }
        }
    }
}
