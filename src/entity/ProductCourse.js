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
        this.teacherInfoList = productInfo.teacherInfoList;
    }
}
