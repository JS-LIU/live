/**
 * Created by Liudq on 2019-07-22
 */
import {Login} from "../entity/Login";
import {User} from "../entity/User";
import {commonAjax} from "../config/config";


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
        let ajax = commonAjax.resource('/user/c/v1.0/:action');
        this.login = new Login(ajax);
        this.user = new User(ajax);
    }
    createUser(ajax){
        this.user.saveUser();
    }
    //  登录
    signIn(){
        return this.login.signIn(this.user.getPhoneNum(),this.user.getPassword());
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
}
export const userService = new UserService();

