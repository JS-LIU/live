/**
 * Created by Liudq on 2019-08-18
 */
import {baseUrl} from "../config/config";

export class Homework {
    constructor(homeWorkInfo){
        this.homeworkDownloadStatus = homeWorkInfo.homeworkDownloadStatus;
        this.homeworkName = homeWorkInfo.homeworkName;
        this.homeworkUrl = homeWorkInfo.homeworkUrl;
        this.homeworkSavePath = homeWorkInfo.homeworkSavePath;
        this.baseUrl = "https://test-api/";
    }
    statusManager(){
        return {
            "0":{
                name:"未提交作业",
                background:"#c7c7c7",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                downLoad:()=>{
                    console.log("尚未上传作业")
                }
            },
            "1":{
                name:"作业已提交",
                background:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                downLoad:()=>{
                    let downloadPage = window.open(this.baseUrl+this.homeworkUrl);
                    downloadPage.close()
                }
            },
            "2":{
                name:"作业已批改",
                background:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                downLoad:()=>{
                    let downloadPage = window.open(this.baseUrl+this.homeworkUrl);
                    downloadPage.close()
                }
            }
        }
    }
    getStatusInfo(){
        return this.statusManager()[this.homeworkDownloadStatus];
    }
}
