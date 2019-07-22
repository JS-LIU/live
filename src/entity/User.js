/**
 * Created by Liudq on 2019-07-22
 */
import {Login} from "./Login";

export class User {
    constructor(phoneNum,password){
        this.phoneNum = phoneNum;
        this.password = password;
        this.token = "";
    }

    setToken(){

    }
    setPhoneNum(phoneNum){
        this.phoneNum = phoneNum;
    }
}
