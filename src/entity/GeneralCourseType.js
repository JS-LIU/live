/**
 * Created by Liudq on 2019-07-25
 */
/**
 * 通用课程分类
 */
export class GeneralCourseType {
    constructor(generalCourseTypeInfo){
        this.name = generalCourseTypeInfo.name;
        this.type = generalCourseTypeInfo.type;
        this.specifyCourseTypeList = generalCourseTypeInfo.specifyCourseTypeList;
        this.selected = false;
    }
    select(){
        this.selected = !this.selected;
    }

}
