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
    }
    //  登录
    signIn(phoneNum,password){
        return this._login({
            phone:phoneNum,
            pass:hex_md5(password)
        })
    }
    //  临时方法
    testLogin(phoneNum,password){
        this._login({
            phone:13601180392,
            pass:hex_md5(123456)
        });
    }

}