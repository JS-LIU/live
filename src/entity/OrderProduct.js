import {CourseType} from "./CourseType";
import {CourseInfo} from "./CourseInfo";
import {Teacher} from "./Teacher";

/**
 * Created by Liudq on 2019-08-04
 */
export class OrderProduct {
    constructor(productCourse) {
        this.courseInfo = new CourseInfo(productCourse);

        this.level = productCourse.level;
        this.series = productCourse.level;
        this.name = productCourse.name;
        this.salePrice = productCourse.salePrice;
        //    主讲人列表
        this.teacherList = productCourse.teacherList || [];
        this.assistantInfo = productCourse.assistantInfo;
        this.sellPrice = productCourse.sellPrice;
    }

    getMajorSpeaker() {
        return this.teacherList[0];
    }
    setTeacherInfo() {
        this.courseInfo.teacherInfo = new Teacher(this.getMajorSpeaker());
    }

    getModule(repairParam) {
        this.setTeacherInfo();
        return Object.assign({}, this.courseInfo.getModule(), {
            sellPrice: this.sellPrice,
            salePrice:this.salePrice,
        }, repairParam);
    }
}
