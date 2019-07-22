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
    //  创建user
    saveUser() {

    }
}
