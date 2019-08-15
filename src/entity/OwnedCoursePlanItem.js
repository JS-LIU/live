/**
 * Created by Liudq on 2019-08-13
 */
import {CourseType} from "./CourseType";
import {TimeManager} from "./TimeManager";
import {HB} from "../util/HB";
import {LearnStatus} from "./LearnStatus";

export class OwnedCoursePlanItem {
    constructor(ownedCoursePlanItemInfo){
        this.id = ownedCoursePlanItemInfo.id;
        this.classTime = ownedCoursePlanItemInfo.classTime;
        this.sessionName = ownedCoursePlanItemInfo.sessionName;
        this.type = new CourseType(ownedCoursePlanItemInfo.type);
        this.level = ownedCoursePlanItemInfo.level;
        this.teacherInfo = ownedCoursePlanItemInfo.teacherInfo;
        this.assistantInfo = ownedCoursePlanItemInfo.assistantInfo;
        this.userHomeworkStatus = ownedCoursePlanItemInfo.userHomeworkStatus;
        this.learnStatus = new LearnStatus(ownedCoursePlanItemInfo.learnStatus);
        this.videoViewStatus = ownedCoursePlanItemInfo.videoViewStatus;
        this.videoId = ownedCoursePlanItemInfo.videoId;
        this.preVideoStatus = ownedCoursePlanItemInfo.preVideoStatus;
        this.preVideoId = ownedCoursePlanItemInfo.preVideoId;
        this.coursewareStatus = ownedCoursePlanItemInfo.coursewareStatus;
        this.coursewareUrl = ownedCoursePlanItemInfo.coursewareUrl;
    }
    getShowTime(){
        let date = TimeManager.timeStampToDate(this.classTime,"common");
        let M = date.M + ".";
        let D = date.D;
        let w = "周" + HB.valid.parseChinese(date.w)[0]+" ";
        let h = date.h+":";
        let m = date.m;
        return M + D + w + h + m;
    }
}