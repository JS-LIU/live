/**
 * Created by Liudq on 2019-07-26
 */
import {CourseType} from "./CourseType";

export class ProductCourse {
    constructor(productInfo){
        this.id = productInfo.id;
        this.goodNo = productInfo.goodNo;
        // this.type = productInfo.type;
        this.level = productInfo.level;
        this.name = productInfo.name;
        this.startTime = productInfo.startTime;
        this.endTime = productInfo.endTime;
        this.totalLessonNum = productInfo.totalLessonNum;
        this.salePrice = productInfo.salePrice;
        this.timeList = productInfo.timeList;
        //    主讲人列表
        this.teacherInfoList = productInfo.teacherInfoList;
        this.type = new CourseType(productInfo.type);
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
        this.detail.suggestGoods = this.detail.suggestGoods || [];
        return this.detail;
    }
}
