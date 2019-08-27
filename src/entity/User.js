/**
 * Created by Liudq on 2019-07-22
 */
import {baseUrl, commonAjax} from "../config/config";
import {hex_md5} from "../util/md5";
import {TimeManager} from "./TimeManager";
export class User {
    constructor(ajax){
        this.phoneNum = "";
        this.password = "";
        this.token = "";
        this.userInfo = {
            headImgUrl:baseUrl.getBaseUrl() + "/src/img/def_header_img.png",
            userName:"登录"
        };
        this._getUserInfo = function(postInfo){
            return ajax.save({action:'userInfo'},postInfo,{name:"token",value:this.token});
        };
        this._resetPsd = function(postInfo){
            return ajax.save({action:'resetPwd'},postInfo,{name:"token",value:this.token});
        }
    }

    setPhoneNum(phoneNum){
        this.phoneNum = phoneNum;
    }
    getPhoneNum(){
        return this.phoneNum;
    }
    setPassword(password){
        this.password = password;
    }
    getPassword(){
        return this.password;
    }
    setToken(token){
        this.token = token;
    }

    getUserInfo(){
        return this._getUserInfo({}).then((data)=>{
            this.userInfo = data.data;
            return new Promise((resolve, reject)=>{
                this.userInfo.birthY = TimeManager.timeStampToDate(this.userInfo.birthday,"unix").Y;
                this.userInfo.birthM = TimeManager.timeStampToDate(this.userInfo.birthday,"unix").M;
                this.userInfo.birthD = TimeManager.timeStampToDate(this.userInfo.birthday,"unix").D;
                resolve(this.userInfo);
            })
        });
    }
    resetPsd(resetInfo){
        return this._resetPsd({
            code:resetInfo.vCode,
            password:hex_md5(resetInfo.password)
        }).then((data)=>{
            this.password = data.data.resetInfo.password;
            return new Promise((resolve, reject)=>{
                resolve(data);
            })
        })
    }
    //  创建user
    saveUser() {

    }
}
