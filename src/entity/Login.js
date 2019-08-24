/**
 * Created by Liudq on 2019-07-22
 */
// import {HB} from "../util/HB";
import {commonAjax} from "../config/config";
import {hex_md5} from "../util/md5";

export class Login {
    constructor(ajax){
        this._login = function(postInfo){
            return ajax.save({action:'login'},postInfo);
        };
        this._register = function(postInfo){
            return ajax.save({action:'registerUserInfo'},postInfo);
        };
        let userAjax = commonAjax.resource('/user/w/v1.0/:action');
        this._getVCode = function(postInfo){
            return userAjax.save({action:'resetPwdVerifyCode'},postInfo);
        }
    }
    isLogin(user){
        return user.token !== "";
    }
    //  登录
    signIn(phoneNum,password){
        return this._login({
            phone:phoneNum,
            pass:hex_md5(password)
        })
    }
    //  注册
    register(phoneNum,password){
        return this._register({
            phone:phoneNum,
            pass:hex_md5(password)
        })
    }
    //  获取验证码
    getVCode(){
        return this._getVCode();
    }
}