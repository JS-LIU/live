/**
 * Created by Liudq on 2019-08-13
 */
import {CourseType} from "./CourseType";
import {TimeManager} from "./TimeManager";
import {HB} from "../util/HB";
import {LearnStatus} from "./LearnStatus";
import {PreVideo} from "./PreVideo";
import {Courseware} from "./Courseware";
import {Homework} from "./Homework";
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
        this.preVideo = new PreVideo(ownedCoursePlanItemInfo.preVideoStatus,ownedCoursePlanItemInfo.preVideoId);
        this.preVideoStatus = ownedCoursePlanItemInfo.preVideoStatus;
        this.preVideoId = ownedCoursePlanItemInfo.preVideoId;
        this.courseware = new Courseware(ownedCoursePlanItemInfo.coursewareStatus,ownedCoursePlanItemInfo.coursewareUrl);
        this.coursewareStatus = ownedCoursePlanItemInfo.coursewareStatus;
        this.coursewareUrl = ownedCoursePlanItemInfo.coursewareUrl;

        this.homework = new Homework({
            homeworkDownloadStatus:ownedCoursePlanItemInfo.homeworkDownloadStatus||ownedCoursePlanItemInfo.userHomeworkStatus,
            homeworkName:ownedCoursePlanItemInfo.homeworkName,
            homeworkUrl:ownedCoursePlanItemInfo.homeworkUrl
        });
        this.homeworkDownloadStatus = ownedCoursePlanItemInfo.homeworkDownloadStatus;
        this.homeworkName = ownedCoursePlanItemInfo.homeworkName;
        this.homeworkUrl = ownedCoursePlanItemInfo.homeworkUrl;
        this.lectureNotesStatus = ownedCoursePlanItemInfo.lectureNotesStatus;
        this.materialList = ownedCoursePlanItemInfo.lectureNotesStatus;
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