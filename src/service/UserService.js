/**
 * Created by Liudq on 2019-07-22
 */
import {Login} from "../entity/Login";
import {User} from "../entity/User";
import {commonAjax} from "../config/config";
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
                    reject(data)
                }

            })
        })
    }
    //  登录
    signIn(){
        return this.login.signIn(this.user.getPhoneNum(),this.user.getPassword());
    }
    register(){
        return this.login.register(this.user.getPhoneNum(),this.user.getPassword());
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
    getVCode(){
        return this.login.getVCode()
    }
    resetPwd(restInfo){
        return this.user.resetPwd({
            code:restInfo.vCode,
            password:restInfo.newPsd
        })
    }
}
export const userService = new UserService();

