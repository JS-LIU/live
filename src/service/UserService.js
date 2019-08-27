/**
 * Created by Liudq on 2019-07-22
 */
import {Login} from "../entity/Login";
import {User} from "../entity/User";
import {baseUrl, commonAjax} from "../config/config";
import {TimeManager} from "../entity/TimeManager";


/**
 * userService
 * {
 *     login:{
 *         login
 *     }
 *     userInfo:{
 *         phoneNum,
 *         headImg
 *     }
 * }
 */
class UserService {
    constructor(){
        let ajax = commonAjax.resource('/user/w/v1.0/:action');
        this.login = new Login(ajax);
        this.user = new User(ajax);
        this._resetUserInfo = function(postInfo){
            return ajax.save({action:"updateUserInfo"},postInfo,{name:"token",value:this.user.token})

        };
    }
    createUser(ajax){
        this.user.saveUser();
    }
    resetUserInfo(userInfo){
        userInfo.birthday = TimeManager.convertYMDToStampByUnix(userInfo.birthY+"/"+userInfo.birthM+"/"+userInfo.birthD);
        return this._resetUserInfo(userInfo).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code === 0){
                    this.updateUserInfo({userInfo:userInfo});
                    resolve(data);
                }else{
                    reject(data.message)
                }

            })
        })
    }
    //  登录
    signIn(){
        return this.login.signIn(this.user.getPhoneNum(),this.user.getPassword());
    }
    signInByCode(code){
        return this.login.signInByCode(this.user.getPhoneNum(),code);
    }
    register(vCode){
        return this.login.register(this.user.getPhoneNum(),this.user.getPassword(),vCode);
    }
    //  更新用户信息
    updateUserInfo(userInfo){
        Object.assign(this.user,userInfo);
    }
    getUser(){
        return this.user;
    }
    getUserInfo(){
        return this.user.getUserInfo();
    }
    getPwdVCode(){
        return this.login.getPwdVCode(this.user)
    }
    getRegisterVCode(){
        return this.login.getRegisterVerifyCode(this.user).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code !== 0){
                    reject(data.message);
                }else{
                    resolve(data);
                }
            })
        })
    }
    resetPwd(restInfo){
        return this.user.resetPwd({
            code:restInfo.vCode,
            password:restInfo.newPsd
        })
    }
    autoUpdateUserInfo(){
        if(this.getUser().userInfo.userName === ""){
            Object.assign(this.user.userInfo,{userName:"小松许"})
        }
        if(this.getUser().userInfo.headImgUrl === ""){
            Object.assign(this.user.userInfo,{headImgUrl:baseUrl.getBaseUrl()+"/src/img/def_header_img.png"});
        }
    }
    getLoginVCode(){
        return this.login.getLoginVCode(this.user).then((data)=>{
            console.log(data);
            return new Promise((resolve, reject)=>{
                if(data.code!==0){

                    reject(data.message);
                }else{
                    resolve(data)
                }

            })
        });
    }
}
export const userService = new UserService();

