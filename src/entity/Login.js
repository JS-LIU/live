/**
 * Created by Liudq on 2019-07-22
 */
// import {HB} from "../util/HB";
import {commonAjax} from "../config/config";
import {hex_md5} from "../util/md5";

export class Login {
    constructor(){

        let merchantListAjax = commonAjax.resource('/user/:platform/:version/:action');
        this._login = function(postInfo){
            return merchantListAjax.save({platform:'c',version:'v1.0',action:'login'},postInfo);
        };

    }
    //  临时方法
    testLogin(phoneNum,password){
        this._login({
            phone:phoneNum,
            pass:hex_md5(password)
        });
    }

}