/**
 * Created by Liudq on 2019-07-22
 */
import {HB} from "../util/HB";
import {commonAjax} from "../config/config";
import {hex_md5} from "../util/md5";

export class Login{
    constructor(){
        this.token = null;
    }
    updateToken(token){
        this.token = token;
    }
    isLogin(){
        return !!this.token;
    }
}
