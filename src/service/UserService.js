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
    }
    createUser(phoneNum,password){
        this.user = new User(phoneNum,password);
    }
    //  登录
    login(){
        // this.login
    }

    setPhoneNum(phoneNum) {
        this.user.setPhoneNum(phoneNum);
    }
}
export const userService = new UserService();

