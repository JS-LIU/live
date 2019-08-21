/**
 * Created by Liudq on 2019-07-22
 */
import {Login} from "./Login";
import {commonAjax} from "../config/config";
import {userService} from "../service/UserService";
import {TimeManager} from "./TimeManager";
export class User {
    constructor(ajax){
        this.phoneNum = "";
        this.password = "";
        this.token = "";
        this.userInfo = {};
        this._getUserInfo = function(postInfo){
            return ajax.save({action:'userInfo'},postInfo,{name:"token",value:this.token});
        };
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

    //  创建user
    saveUser() {

    }
}
