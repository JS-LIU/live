/**
 * Created by Liudq on 2019-07-22
 */
import {Login} from "../entity/Login";
import {User} from "../entity/User";
import {baseUrl, commonAjax} from "../config/config";
import {hex_md5} from "../util/md5";
import {CouponStatus} from "../entity/CouponStatus";
import {Pagination} from "../entity/Pagination";
import {Coupon} from "../entity/Coupon";

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
        this.login = new Login();
        this.user = new User();

        let ajax = commonAjax.resource('/user/w/v1.0/:action');
        // let miniProgramAjax = commonAjax.resource('user/x/v1.0/bindWechatProgram');
        this._queryUserAccountCoupon = function (postInfo){
            return ajax.save({ action: 'queryUserAccountCoupon' }, postInfo, { name: "token", value: this.login.token });
        };
        this._loginByPassword = function(postInfo){
            return ajax.save({action:'login'},postInfo);
        };
        this._loginByVCode = function(postInfo){
            return ajax.save({action:"loginWithVerifyCode"},postInfo)
        };
        this._getUserInfo = function(postInfo){
            return ajax.save({action:'userInfo'},postInfo,{name:"token",value:this.login.token});
        };
        this._getLoginVCode = function(postInfo){
            return ajax.save({action:"loginVerifyCode"},postInfo)
        };
        this._getRegisterVerifyCode = function(postInfo){
            return ajax.save({action:'registerVerifyCode'},postInfo);
        };
        this._getResetPasswordVCode = function(postInfo){
            return ajax.save({action:'resetPwdVerifyCode'},postInfo);
        };
        this._resetPassword = function(postInfo){
            return ajax.save({action:'resetPwd'},postInfo);
        };
        this._register = function(postInfo){
            return ajax.save({action:'registerUserInfo'},postInfo);
        };
        this._resetUserInfo = function(postInfo){
            return ajax.save({action:"updateUserInfo"},postInfo,{name:"token",value:this.login.token})
        };

        this.couponList = [];
        this.couponStatusManager = new CouponStatus();
        this.pagination = new Pagination(1, 100);
    }
    resetUserInfo(postInfo){
        return this._resetUserInfo(postInfo).then(()=>{
            return this.updateUserInfo()
        })
    }

    /**
     * 验证码登录
     * @param postInfo {phoneNum,code}
     * @returns Promise
     */
    signByVCode(postInfo){
        return this._loginByVCode({
            phone:postInfo.phoneNum,
            code:postInfo.vcode
        }).then((data)=>{
            return new Promise((resolve,reject)=>{
                if(data.code === 0){
                    this.login.updateToken(data.data.token);
                    resolve();
                }else{
                    reject(data.message);
                }
            })
        });
    }

    /**
     * 密码登录
     * @param postInfo
     * @returns {*}
     */
    signByPassword(postInfo){
        return this._loginByPassword({
            phone:postInfo.phoneNum,
            pass:hex_md5(postInfo.password)
        }).then((data)=>{
            return new Promise((resolve,reject)=>{
                if(data.code === 0){
                    this.login.updateToken(data.data.token);
                    resolve();
                }else{
                    reject(data.message);
                }

            })
        });
    }
    signStrategy(){
        return {
            "signByVCode":this.signByVCode,
            "signByPassword":this.signByPassword
        }
    }

    //  登录
    signIn(signWay,postInfo){
        return this.signStrategy()[signWay].call(this,postInfo)
    }
    //  获取用户信息
    updateUserInfo(){
        return this._getUserInfo({}).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code === 0){
                    let userInfo = this.createUserInfo(data.data);
                    resolve(userInfo);
                }else{
                    reject(data.message);
                }
            })
        });
    }
    /**
     * 验证码登录
     * 获取验证码
     * @param phoneNum
     */
    getLoginVCode(phoneNum){
        return this._getLoginVCode({
            phone:phoneNum
        })
    }

    /**
     * 获取验证码
     * 注册
     * @param phoneNum
     */
    getRegisterVerifyCode(phoneNum){
        return this._getRegisterVerifyCode({
            phone:phoneNum
        })
    }

    /**
     * 获取验证码
     * 重置密码
     * @param phoneNum
     */
    resetPasswordVCode(phoneNum){
        return this._getResetPasswordVCode({
            phone:phoneNum
        })
    }
    resetPassword(postInfo){
        return this._resetPassword({
            code:postInfo.vCode,
            phone:postInfo.phoneNum,
            password:hex_md5(postInfo.newPsd)
        });
    }
    getVCodeStrategy(){
        return {
            "login":this.getLoginVCode,
            "register":this.getRegisterVerifyCode,
            "resetPassword":this.resetPasswordVCode
        }
    }
    //  获取验证码
    getVCode(purpose,phoneNum){
        return this.getVCodeStrategy()[purpose].call(this,phoneNum)
    }

    //  注册
    register(registerInfo){
        return this._register({
            phone:registerInfo.phoneNum,
            pass:hex_md5(registerInfo.password),
            code:registerInfo.vcode
        }).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code === 0){
                    this.login.updateToken(data.data.token);
                    resolve();
                }else{
                    reject(data.message);
                }
            })
        })
    }


    /**
     * 修改用户信息
     * @param userInfo
     */
    changeUserInfo(){

    }



    createUserInfo(userInfo){
        this.user.createUserInfo(userInfo);
        return this.user.getUserInfo();
    }
    queryUserAccountCoupon(){
        return this._queryUserAccountCoupon({
            couponStatus: this.couponStatusManager.getCurrentCouponStatus().status,
            pageNum: this.pagination.pageNum,
            pageSize: this.pagination.size,
        }).then((data)=>{
            let list = [];
            for(let i= 0 ;i < data.data.list.length;i++){
                list.push(new Coupon(data.data.list[i]))
            }
            if(this.pagination.pageNum === 1){
                this.couponList = list;
            }else{
                this.couponList = this.couponList.concat(list);
            }
            return new Promise((resolve,reject)=>{
                resolve(this.couponList)
            })
        });
    }
}
export const userService = new UserService();

