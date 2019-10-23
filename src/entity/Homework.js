/**
 * Created by Liudq on 2019-08-18
 */
import {baseUrl, commonAjax} from "../config/config";
import {courseService} from "../service/CourseService";

export class Homework {
    constructor(homeWorkInfo){
        this.homeworkDownloadStatus = homeWorkInfo.homeworkDownloadStatus;
        this.homeworkName = homeWorkInfo.homeworkName;
        this.homeworkUrl = homeWorkInfo.homeworkUrl;
        this.homeworkSavePath = homeWorkInfo.homeworkSavePath;
        let fileUrlAjax = commonAjax.resource('/file/w/v1.0/:action');
        this._getFileUrl = function(postInfo){
            return fileUrlAjax.save({action:'getFileUrl'},postInfo);
        };
    }
    statusManager(coursePlanItem){
        // NOT_SUBMIT(0,"未提交"),
        // HAS_SUBMIT(1,"已提交"),
        // HAS_AUDIT(2,"已批改"),
        // CANNOT_DOWNLOAD(3,"不可下载"),
        // CAN_DOWNLOAD(4,"可下载")


        return {
            "0":{
                name:"未提交作业",
                background:"#c7c7c7",
                color:"#c7c7c7",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                downLoad:()=>{
                    console.log("尚未上传作业")
                }
            },
            "1":{
                name:"作业已提交",
                background:"#000000",
                color:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                downLoad:()=>{
                    return courseService.queryUserHomework(coursePlanItem)
                }
            },
            "2":{
                name:"作业已批改",
                background:"#000000",
                color:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                isModify:true,
                downLoad:()=>{
                    // let downloadPage = window.open(this.baseUrl+this.homeworkUrl);
                    // downloadPage.close()
                    return courseService.queryUserHomework(coursePlanItem)
                }
            },
            "3":{
                name:"不可下载",
                background:"#c7c7c7",
                color:"#c7c7c7",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                downLoad:()=>{
                    return new Promise((resolve, reject)=>{
                        reject()
                    });
                }
            },
            "4":{
                name:"下载作业",
                background:"#000000",
                color:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                downLoad:()=>{
                    return this._getFileUrl({
                        filename:this.homeworkUrl
                    })
                }
            }
        }
    }
    getStatusInfo(coursePlanItem){
        return this.statusManager(coursePlanItem)[this.homeworkDownloadStatus];
    }
}
