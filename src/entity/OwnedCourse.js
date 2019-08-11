/**
 * Created by Liudq on 2019-07-23
 */
/**
 * 已经购买过的课程
 */
export class OwnedCourse {
    constructor(courseInfo) {
        this.id = courseInfo.id;
        this.classTime = courseInfo.classTime;
        this.sessionName = courseInfo.sessionName;
        //  【我的课程】 名称
        this.courseName = courseInfo.courseName;
        this.type = courseInfo.type;
        this.level = courseInfo.level;
        this.teacherInfo = courseInfo.teacherInfo;
        //      this.id = this.id;
        //     "headId": null,
        //     "teacherName": "樊朋杰",
        //     "headImgUrl": "http://thirdwx.qlogo.cn/mmopen/9dblQJgoQUjmXz9MupjdaVpKSMPCPlTeibPEoiaqsupGYwPwMxBGGB505OKicN7Wz2JQ8NJWsDQ9Wy5IRdRO9nb6qh5KjvRFOtt/132",
        //     "teacherQrCode": "http://www.baidu.com"
        // },
        this.assistantInfo = courseInfo. assistantInfo;
        // {
        //     "id": 0,
        //         "headId": null,
        //         "teacherName": "等待分配",
        //         "headImgUrl": "",
        //         "teacherQrCode": "http://www.baidu.com"
        // },
        this.userHomeworkStatus = courseInfo.userHomeworkStatus;
        this.learnStatus = courseInfo.learnStatus;
        this.videoViewStatus = courseInfo.videoViewStatus;
        this.videoId = courseInfo.videoId;
        this.preVideoStatus = courseInfo.preVideoStatus;
        this.preVideoId = courseInfo.preVideoId;
        this.coursewareStatus = courseInfo.coursewareStatus;
        this.coursewareUrl = courseInfo.coursewareUrl;
        this.totalLessonNum = courseInfo.totalLessonNum;
        this.finishLessonNum = courseInfo.finishLessonNum;
        this.timeList = courseInfo.timeList;
        // [{
        //     "week": 2,
        //     "periodStartTime": "00:00",
        //     "periodEndTime": "00:01"
        // }, {
        //     "week": 4,
        //     "periodStartTime": "00:00",
        //     "periodEndTime": "00:01"
        // }]
        this.startTime = courseInfo.startTime;
        this.endTime = courseInfo.endTime;
    }
    static typeStrategy(){
        return {
            "1":{
                name:"p",
                background:"#00b7ba",
                url:"../src/img/product_course_python_header_bg.png"
            },
            "2":{
                name:"c",
                background:"#4161A6",
                url:"../src/img/product_course_c++_header_bg.png"
            },
            "3":{
                name:"n",
                background:"#b178c8",
                url:"../src/img/product_course_noi_header_bg.png"
            }
        }
    }
    getTypeInfo(type){
        return OwnedCourse.typeStrategy()[type];
    }
    setDetail(detail){
        this.detail = detail;

    }
    getCoursePlanList(){
        return this.detail.coursePlans;
    }

}
