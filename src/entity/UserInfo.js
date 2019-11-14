import {TimeManager} from "./TimeManager";
import {baseUrl} from "../config/config";
import {HB} from "../util/HB";

/**
 * Created by Liudq on 2019/9/3
 */
export class UserInfo {
    constructor(userInfo = {}){
        this.address = userInfo.address;
        this.birthYList = this.createBirthYList();
        this.birthMList = this.createStartToEndNum(1,12);
        this.birthDList = this.createStartToEndNum(1,31,true);
        this.birthday = this.getInitBirthday(userInfo.birthday);
        this.grade = userInfo.grade;
        this.headImgUrl = this.getHeadImgUrl(userInfo.headImgUrl);
        this.improve = userInfo.improve;
        this.nickName = userInfo.nickName;
        this.phone = userInfo.phone;
        this.sex = userInfo.sex || 1;
        this.userName = userInfo.userName;
        this.userReward = userInfo.userReward;
        this.wechatQrCode = userInfo.wechatQrCode;
        this.wxPublic = userInfo.wxPublic;
        this.sexList = [{type:1,name:"男"},{type:2,name:"女"}];
        this.gradeList = ["学龄前","一年级","二年级","三年级","四年级","五年级","六年级","初一","初二","初三"];

    }
    getInitBirthday(birthday){
        if(birthday === ""){
            return TimeManager.convertYMDToStampByUnix(this.birthYList[0]+"/"+this.birthMList[0]+"/"+this.birthMList[0])
        }
        return birthday;
    }
    getHeadImgUrl(headImgUrl){
        if(HB.obj.isNothing(headImgUrl)){
            return baseUrl.getBaseUrl()+"/src/img/user_def_header_img.png"
        }
        return headImgUrl;
    }
    createBirthYList(){
        let start = new Date().getFullYear() - 15;
        let end = new Date().getFullYear() - 4;
        let list = [];
        for(let i = start;i <= end;i++){
            list.push(i);
        }
        return list;
    }
    createStartToEndNum(start,end,isPaddingZero){
        let list = [];
        for(let i = start;i <= end;i++){
            if(isPaddingZero){
               i = TimeManager.paddingZero(i)
            }
            list.push(i);
        }
        return list;
    }
    getShowBirthY(){
        return TimeManager.timeStampToDate(this.birthday, "unix").Y;
    }
    getShowBirthM(){
        return TimeManager.timeStampToDate(this.birthday, "unix").M;
    }
    getShowBirthD(){
        return TimeManager.timeStampToDate(this.birthday, "unix").D;
    }
    getShowBirthday(){
        let year = this.getShowBirthY();
        let month = this.getShowBirthM();
        let day = this.getShowBirthD();
        return year + month + day;
    }
    getShowSex() {
        return this.sex === 1?"男":"女";
    }
    isMan(sex){
        let s = sex || this.sex;
        return s === 1;
    }
    convertSexToType(sex){
        if(sex === "男"){
            return 1;
        }
        return 2;
    }
    needRepair(){
        return this.improve === 0;
    }
    getModule(repairParam){
        return Object.assign({}, {
            address : this.address,
            birthday : this.birthday,
            showBirthY:this.getShowBirthY(),
            showBirthM: this.getShowBirthM(),
            showBirthD :this.getShowBirthD(),
            showBirthday:this.getShowBirthday(),
            grade : this.grade,
            headImgUrl : this.headImgUrl,
            improve : this.improve,
            nickName : this.nickName,
            phone : this.phone,
            sex : this.sex,
            showSex:this.getShowSex(),
            userName : this.userName,
            userReward : this.userReward,
            wechatQrCode : this.wechatQrCode,
            wxPublic : this.wxPublic,
            isNeedRepair: this.needRepair(),
            sexList: this.sexList,
            gradeList: this.gradeList,
            birthYList: this.birthYList,
            birthMList: this.birthMList,
            birthDList: this.birthDList,
        }, repairParam);
    }


}