/**
 * Created by Liudq on 2019-07-23
 */
import {commonAjax} from "../config/config";
import {User} from "../entity/User";
class CourseService {
    constructor(){
        let ajax = commonAjax.resource('/course/c/v1.0/:action');
        this._getOwnedCourseList = function(postInfo){
            return ajax.save({action:'login'},postInfo);
        };
        this.ownedCourseList = [];

        // this.calender = new Calender();
    }

    getOwnedCourseList(pageNum,currentTime){
        return this._getOwnedCourseList({
            pageNum:pageNum,
            pageSize:5,
            // startTime:this.calender.getWeekStartTime(currentTime),
            // endTime:this.calender.getWeekEndTime(currentTime)
        })
    }
}