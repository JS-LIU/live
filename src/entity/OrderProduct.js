/**
 * Created by Liudq on 2019-08-04
 */
export class OrderProduct {
    constructor(productCourse){

        this.id = productCourse.id;
        this.goodNo = productCourse.goodNo;
        this.type = productCourse.type;
        this.level = productCourse.level;
        this.name = productCourse.name;
        this.startTime = productCourse.startTime;
        this.endTime = productCourse.endTime;
        this.totalLessonNum = productCourse.totalLessonNum;
        this.salePrice = productCourse.salePrice;
        //    主讲人列表
        this.teacherInfoList = productCourse.teacherInfoList;
    }
}
