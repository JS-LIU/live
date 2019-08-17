/**
 * Created by Liudq on 2019-07-23
 */
import {CourseType} from "./CourseType";
import {LearnStatus} from './LearnStatus';
import {OwnedCoursePlanItem} from "./OwnedCoursePlanItem";
/**
 * 已经购买过的课程
 */
export class OwnedCourse {
    constructor(courseInfo) {
        this.id = courseInfo.id;
        this.courseName = courseInfo.courseName;
        this.timeList = courseInfo.timeList;
        this.startTime = courseInfo.startTime;
        this.endTime = courseInfo.endTime;
        this.teacherInfo = courseInfo.teacherInfo||{};
        this.assistantInfo = courseInfo.assistantInfo||{};
        this.level = courseInfo.level;
        this.type = new CourseType(courseInfo.type);
        this.learnStatus = new LearnStatus(courseInfo.learnStatus);
        this.finishLessonNum = courseInfo.finishLessonNum;
        this.totalLessonNum = courseInfo.totalLessonNum;
        this.shareQrcode = courseInfo.shareQrcode;
        this.typeText = courseInfo.type;
    }
    setDetail(detail){
        this.detail = detail;

    }

    getCoursePlanList(){
        let list = [];
        for(let i = 0;i < this.detail.coursePlans.length;i++){
            let coursePlanItem = this.detail.coursePlans[i];
            let coursePlanItemObj = {
                id:coursePlanItem.id,
                classTime:coursePlanItem.startTime,
                sessionName:coursePlanItem.name,
                type:this.typeText,
                level:this.level,
                teacherInfo:this.teacherInfo,
                assistantInfo:this.assistantInfo,
                userHomeworkStatus:coursePlanItem.userHomeworkStatus,
                learnStatus:coursePlanItem.learnStatus,
                videoViewStatus:coursePlanItem.videoViewStatus,
                videoId:coursePlanItem.videoId,
                preVideoStatus:coursePlanItem.preVideoStatus,
                preVideoId:coursePlanItem.preVideoId,
                coursewareStatus:coursePlanItem.coursewareStatus,
                coursewareUrl:coursePlanItem.coursewareUrl,

                homeworkDownloadStatus: coursePlanItem.homeworkDownloadStatus,
                homeworkName: coursePlanItem.homeworkName,
                homeworkUrl: coursePlanItem.homeworkUrl,
                lectureNotesStatus: coursePlanItem.lectureNotesStatus,
                materialList: coursePlanItem.lectureNotesStatus,
            };
            list.push(new OwnedCoursePlanItem(coursePlanItemObj));
        }
        return list;
    }

}
