/**
 * Created by Liudq on 2019-07-22
 */

import {UserInfo} from "./UserInfo";

export class User{
    constructor(){
        this.userInfo = new UserInfo();
    }
    createUserInfo(userInfo){
        this.userInfo = new UserInfo(userInfo);
    }
    getUserInfo(){
        return this.userInfo;
    }
}