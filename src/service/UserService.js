/**
 * Created by Liudq on 2019-07-22
 */
import {Login} from "../entity/Login";
import {User} from "../entity/User";


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
        this.user = new User();
        this.login = new Login();
    }
    createUser(phoneNum,password){
        this.user = new User(phoneNum,password);
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
}
export const userService = new UserService();

