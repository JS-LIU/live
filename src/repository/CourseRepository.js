/**
 * Created by Liudq on 2019/10/4
 */
import {commonAjax, platform} from '../config/config';
import {userService} from "../service/UserService";
class CourseRepository {
    constructor(){
        // let ownedCourseAjax = commonAjax.resource('/course/w/v1.0/:action');
        // let c_ownedCourseAjax = commonAjax.resource('/course/c/v1.0/:action');
        // let courseAjax = commonAjax.resource('/good/w/v1.0/:action');
        // let preVideoAjax = commonAjax.resource('/user/w/v1.0/:action');

        this.ownedCourseAjax = commonAjax.resource("/course/:platform/:version/:action");
        this.courseAjax = commonAjax.resource("/good/w/v1.0/:action");
        this.preVideoAjax = commonAjax.resource('/user/w/v1.0/:action');
        //  区分【w和c】
        // this._getOwnedCourseListByWeek = function(postInfo){
        //     return c_ownedCourseAjax.save({platform:platform,version:'v1.0',action:'pageCoursePlan'},postInfo,{name:"token",value:userService.login.token});
        // };
        //  区分【w和c】
        // this._getAllOwnedCourseList = function(postInfo){
        //     return ownedCourseAjax.save({action:"pageMyCourse"},postInfo,{name:"token",value:userService.login.token})
        // };
        //  区分【w和c】
        // this._getOwnedCourseDetail = function(postInfo){
        //     return ownedCourseAjax.save({action:"courseDetail"},postInfo,{name:"token",value:userService.login.token});
        // };
        //  区分【w和c】
        // this._queryUserHomeWork = function(postInfo){
        //     return ownedCourseAjax.save({action:"queryUserHomework"},postInfo,{name:"token",value:userService.login.token});
        // };
        //  不区分
        // this._getCourseType = function(postInfo){
        //     return courseAjax.save({action:'goodBaseSelectTips'},postInfo,{name:"token",value:userService.login.token});
        // };
        //  不区分
        // this._getProductCourseList = function(postInfo){
        //     return courseAjax.save({action:'pageGoodInfo'},postInfo,{name:"token",value:userService.login.token});
        // };
        //  区分【x和w】
        // this._getProductDetail = function(postInfo){
        //     return courseAjax.save({action:'goodDetail'},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._getPreSessionVideo = function(postInfo){
        //     return preVideoAjax.save({action:"preSessionVideo"},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._getCourseVideo = function(postInfo){
        //     return preVideoAjax.save({action:"videoView"},postInfo,{name:"token",value:userService.login.token});
        // };
    }
    getOwnedCourseListByWeek(postInfo){
        return this.ownedCourseAjax.save({platform:platform,version:'v1.0',action:'pageCoursePlan'},postInfo,{name:"token",value:userService.login.token});
    }
    getAllOwnedCourseList(postInfo){
        return this.ownedCourseAjax.save({platform:platform,version:'v1.0',action:"pageMyCourse"},postInfo,{name:"token",value:userService.login.token});
    }
    getOwnedCourseDetail(postInfo){
        return this.ownedCourseAjax.save({platform:platform,version:'v1.0',action:"courseDetail"},postInfo,{name:"token",value:userService.login.token});
    }
    queryUserHomeWork(postInfo){
        return this.ownedCourseAjax.save({platform:platform,version:'v1.0',action:"queryUserHomework"},postInfo,{name:"token",value:userService.login.token});
    }
    getCourseType(postInfo){
        return this.courseAjax.save({action:"goodBaseSelectTips"},postInfo,{name:"token",value:userService.login.token});
    }
    getProductCourseList(postInfo){
        return this.courseAjax.save({action:'pageGoodInfo'},postInfo,{name:"token",value:userService.login.token});
    }
    getProductDetail(postInfo){
        return this.courseAjax.save({action:'goodDetail'},postInfo,{name:"token",value:userService.login.token});
    }
    getPreSessionVideo(postInfo){
        return this.preVideoAjax.save({action:"preSessionVideo"},postInfo,{name:"token",value:userService.login.token});
    }
    getCourseVideo(postInfo){
        return this.preVideoAjax.save({action:"videoView"},postInfo,{name:"token",value:userService.login.token});
    }
}
export const courseRepository = new CourseRepository();