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
        this._getPwdVCode = function(postInfo,user){
            return userAjax.save({action:'resetPwdVerifyCode'},postInfo,{name:"token",value:user.token});
        };
        this._getRegisterVerifyCode = function(postInfo){
            return userAjax.save({action:'registerVerifyCode'},postInfo);
        };
        this._getLoginVCode = function(postInfo){
            return userAjax.save({action:"loginVerifyCode"},postInfo)
        };
        this._loginByCode = function(postInfo){
            return userAjax.save({action:"loginWithVerifyCode"},postInfo)
        };
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
    signInByCode(phoneNum,code){
        return this._loginByCode({
            phone:phoneNum,
            code:code
        })
    }
    //  注册
    register(phoneNum,password,vCode){
        return this._register({
            phone:phoneNum,
            pass:hex_md5(password),
            code:vCode
        })
    }
    //  获取验证码
    getPwdVCode(user){
        return this._getPwdVCode({
            phone:user.phoneNum
        },user);
    }
    getRegisterVerifyCode(user){
        return this._getRegisterVerifyCode({
            phone:user.phoneNum
        })
    }
    getLoginVCode(user){
        return this._getLoginVCode({
            phone:user.phoneNum
        })
    }
}
