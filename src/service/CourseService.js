/**
 * Created by Liudq on 2019-07-23
 */
import {commonAjax} from "../config/config";
import {TimeManager} from "../entity/TimeManager";
import {userService} from "./UserService";
import {OwnedCourse} from "../entity/OwnedCourse";
import {ProductCourse} from "../entity/ProductCourse";
import {GeneralCourseType} from "../entity/GeneralCourseType";
import {SpecifyCourseType} from "../entity/SpecifyCourseType";
import {Pagination} from "../entity/Pagination";
import {OwnedCourseLearnStatus} from "../entity/OwnedCourseLearnStatus";
import {OwnedCourseLearnStatusList} from "../entity/OwnedCourseLearnStatusList";
import {OwnedCoursePlanItem} from "../entity/OwnedCoursePlanItem";
import {CourseType} from "../entity/CourseType";
import {courseRepository} from '../repository/CourseRepository';

class CourseService {
    constructor(){
        // let ownedCourseAjax = commonAjax.resource('/course/w/v1.0/:action');
        // let c_ownedCourseAjax = commonAjax.resource('/course/c/v1.0/:action');
        // let courseAjax = commonAjax.resource('/good/w/v1.0/:action');
        // let preVideoAjax = commonAjax.resource('/user/w/v1.0/:action');
        //
        // //  区分【w和c】
        // this._getOwnedCourseListByWeek = function(postInfo){
        //     return c_ownedCourseAjax.save({action:'pageCoursePlan'},postInfo,{name:"token",value:userService.login.token});
        // };
        // //  区分【w和c】
        // this._getAllOwnedCourseList = function(postInfo){
        //     return ownedCourseAjax.save({action:"pageMyCourse"},postInfo,{name:"token",value:userService.login.token})
        // };
        // //  区分【w和c】
        // this._getOwnedCourseDetail = function(postInfo){
        //     return ownedCourseAjax.save({action:"courseDetail"},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._getCourseType = function(postInfo){
        //     return courseAjax.save({action:'goodBaseSelectTips'},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._getProductCourseList = function(postInfo){
        //     return courseAjax.save({action:'pageGoodInfo'},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._getProductDetail = function(postInfo){
        //     return courseAjax.save({action:'goodDetail'},postInfo,{name:"token",value:userService.login.token});
        // };
        //
        //
        // this._getPreSessionVideo = function(postInfo){
        //     return preVideoAjax.save({action:"preSessionVideo"},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._getCourseVideo = function(postInfo){
        //     return preVideoAjax.save({action:"videoView"},postInfo,{name:"token",value:userService.login.token});
        // };
        // this._queryUserHomeWork = function(postInfo){
        //     return ownedCourseAjax.save({action:"queryUserHomework"},postInfo,{name:"token",value:userService.login.token});
        // };
        //  课程列表
        this.ownedCourseList = [];
        //  每节课列表
        this.ownedCoursePlanList = [];
        this.courseType = [];
        this.courseList = [];
        this.pagination = new Pagination(1,6);
        //  对象：学习状态
        this.ownedCourseLearnStatusList = this.createOwnedCourseLearnStatusList([
            {
                id:0,
                name:"未开课",
                active:false,
                order:1
            },
            {
                id:1,
                name:"已结束",
                active:false,
                order:3
            },
            {
                id:2,
                name:"正在学",
                active:false,
                order:2
            },
            {
                id:99,
                name:"全部",
                active:true,
                order:0
            }
        ]);
    }
    getOwnedCourseLearnStatusList(){
        return this.ownedCourseLearnStatusList;
    }
    //  预习视频
    getPreSessionVideo(ownedCourseItem){
        return courseRepository.getPreSessionVideo({
            videoId:ownedCourseItem.preVideo.preVideoId,
            userCoursePlanId:ownedCourseItem.id
        }).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code !== 0){
                    reject(data);
                }else{
                    resolve(data);
                }
            });

        })
    }
    //  获取课程视频
    getVideoView(videoId){
        return courseRepository.getCourseVideo({
            videoId:videoId
        })
    }

    getOwnedCourseDetail(id){
        let ownedCourse = this.findOwnedCourseById(id);
        return courseRepository.getOwnedCourseDetail({
            courseId:id
        }).then((data)=>{
            ownedCourse.setDetail(data.data);
            return new Promise((resolve, reject)=>{
                resolve(ownedCourse);
            })
        })
    }
    findOwnedCourseById(id){
        return this.ownedCourseList.find((ownedCourse,index)=>{
            return parseInt(ownedCourse.courseInfo.id) === parseInt(id);
        })
    }

    /**
     * 从详情 获取coursePlanItem列表
     * @param ownedCourseId
     * @returns {[]|*}
     */
    getOwnedCoursePlanItemListByDetail(ownedCourseId){
        let ownedCourse = this.findOwnedCourseById(ownedCourseId);
        return ownedCourse.coursePlanList;
    }
    /**
     * 创建学习状态
     * @param statusJson
     * @returns {OwnedCourseLearnStatusList}
     */
    createOwnedCourseLearnStatusList(statusJson){
        let ownedCourseLearnStatusList = [];
        for(let i = 0;i < statusJson.length;i++){
            ownedCourseLearnStatusList.push(new OwnedCourseLearnStatus(statusJson[i]));
        }
        return new OwnedCourseLearnStatusList(ownedCourseLearnStatusList);
    }

    /**
     * 选择学习状态
     * @param learnStatus
     * @returns {[]}
     */
    selectOwnedCourseLearnStatus(learnStatus){
        this.ownedCourseLearnStatusList.selectOwnedCourseLearnStatus(learnStatus);
        return this.ownedCourseLearnStatusList.getList();
    }
    /**
     * 获取已购的本周课程(某一周的课程，已购课程)
     * @param startTime
     * @param endTime
     */
    getOwnedCoursePlanItemListByWeek(startTime, endTime){
        return courseRepository.getOwnedCourseListByWeek({
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size,
            startTime:startTime,
            endTime:endTime
        }).then((data)=>{
            this.ownedCoursePlanList = this.createListByJson(data.data.list,this.ownedCoursePlanList,OwnedCoursePlanItem);
            return new Promise((resolve, reject)=>{
                resolve(this.ownedCoursePlanList);
            });
        })
    }

    /**
     * 获取全部购买课程(班期)
     * @returns [OwnedCourse]
     */
    getAllOwnedCourseList(){
        console.log(this.getOwnedCourseLearnStatusList().getActive().id);
        return courseRepository.getAllOwnedCourseList({
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size,
            learnStatus:this.getOwnedCourseLearnStatusList().getActive().id
        }).then((data)=>{
            this.ownedCourseList = this.createListByJson(data.data.list,this.ownedCourseList,OwnedCourse);
            return new Promise((resolve, reject)=>{
                resolve(this.ownedCourseList);
            });
        })
    }

    /**
     * 通过json创建实体列表
     * @param listJson
     * @param list
     * @param Course
     * @returns {Promise<list>}
     */
    createListByJson(listJson,list,Course){
        let newList = [];
        for(let i = 0;i < listJson.length;i++){
            newList.push(new Course(listJson[i]));
        }
        return this.refreshOrMoreList(list,newList);
    }
    /**
     * 获取所有课程的分类（商品类型列表）
     */
    getCourseType(){
        return courseRepository.getCourseType({}).then((data)=>{
            //  todo 容错处理 判断如果有data.data.summaryTips不为空的话
            return new Promise((resolve, reject)=>{
                resolve(this.createGeneralCourseType(data.data.summaryTips));
            })
        })
    }

    /**
     * 选择/取消选择 详细分类
     * @param specifyCourseType
     */
    toggleSelectSpecifyType(specifyCourseType){
        let generalCourseType = this.findGeneralCourseTypeByTypeId(specifyCourseType.type);
        let speCourseType = this.findSpecifyCourseById(generalCourseType,specifyCourseType);
        generalCourseType.selectSpecifyCourseType(speCourseType);
    }
    findSpecifyCourseById(generalCourseType,specifyCourseType){
        return generalCourseType.specifyCourseTypeList.find((specifyItem,index)=>{
            return specifyItem.id === specifyCourseType.id;
        })
    }
    findGeneralCourseTypeByTypeId(typeId){
        return this.courseType.find((generalType,index)=>{
            return generalType.type === typeId;
        });
    }
    toggleSelectAllSpecifyCourseType(generalCourseType){
        generalCourseType.toggleSelectAllSpecifyCourseType();
    }
    selectAllSpecifyCourseType(generalCourseType){
        let genCourseType = this.findGeneralCourseTypeByType(generalCourseType);
        genCourseType.selectAllSpecifyCourseType(true);
        genCourseType.selected = true;
    }
    findGeneralCourseTypeByType(generalCourseType){
        return this.courseType.find((generalCourseTypeItem,index)=>{
            return generalCourseTypeItem.type === generalCourseType.type;
        })
    }
    /**
     * 创建通用分类
     * @param summaryTips
     * @returns {[]|Array}
     */
    createGeneralCourseType(summaryTips) {
        this.courseType = [];
        for(let i = 0;i < summaryTips.length;i++){
            let generalCourseTypeInfo = {
                name:summaryTips[i].name,
                index:summaryTips[i].index,
                type:summaryTips[i].selectTips[0].type,
                specifyCourseTypeList:this.createSpecifyCourseList(summaryTips[i].selectTips),
            };
            this.courseType.push(new GeneralCourseType(generalCourseTypeInfo))
        }
        return this.courseType;
    }

    /**
     * 创建详细分类
     * @param list
     * @returns {[]}
     */
    createSpecifyCourseList(list){
        let specifyCourseTypeList = [];
        for(let i = 0;i < list.length;i++){
            let specifyCourseInfo = {
                id:list[i].id,
                name:list[i].name,
                type:list[i].type
            };
            specifyCourseTypeList.push(new SpecifyCourseType(specifyCourseInfo))
        }
        return specifyCourseTypeList;
    }

    /**
     * 获取商品课程列表
     * @returns {*}
     */
    getProductCourse(){
        let productCourseList = [];
        //  todo 可以把请求挪到 repository中
        return courseRepository.getProductCourseList({
            selectTips:this.getSelectedSpecifyCourseTypeByJson(),
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size
        }).then((data)=>{
            for(let i = 0;i < data.data.list.length;i++){
                let productCourse = this.createProductCourse(data.data.list[i]);
                productCourseList.push(productCourse);
            }
            return new Promise((resolve, reject)=>{
                this.courseList = this.refreshOrMoreList(this.courseList,productCourseList);
                resolve(this.courseList);
            })
        })
    }
    createProductCourse(courseInfo){
        return new ProductCourse(courseInfo);
    }
    /**
     * 选择的所有标签（作为参数给后台来筛选课程）
     * @returns {[]}
     */
    getSelectedSpecifyCourseTypeByJson(){
        let json = [];
        for(let i = 0;i < this.courseType.length;i++){
            for(let j = 0;j < this.courseType[i].specifyCourseTypeList.length;j++){
                let specifyCourseType = this.courseType[i].specifyCourseTypeList[j];
                if(specifyCourseType.selected){
                    json.push({
                        type:specifyCourseType.type,
                        id:specifyCourseType.id,
                        name:specifyCourseType.name
                    })
                }
            }
        }
        return json;
    }

    /**
     * 加载更多或者刷新列表
     * private
     * @param baseList
     * @param addedList
     * @returns {[]|*}
     */
    refreshOrMoreList(baseList, addedList) {
        if(this.pagination.pageNum === 1){
            baseList = addedList
        }else{
            baseList = baseList.concat(addedList);
        }
        return baseList;
    }
    //  获取分页实体
    getPagination(){
        return this.pagination;
    }

    /**
     * 课程详情中的套餐也有商品
     * @param productCourseNo
     * @returns {*}
     */
    getOrCreateProductCourseDetail(productCourseNo){
        return courseRepository.getProductDetail({
            goodNo:productCourseNo
        }).then((data)=>{
            let productCourse = this.findProductCourseByCourseNo(productCourseNo);
            //  不推入this.courseList
            if(!productCourse){
                productCourse = this.createProductCourse(data.data);
            }
            productCourse = this.updateCourse(productCourse,data.data);
            return new Promise((resolve, reject)=>{
                resolve(productCourse);
            });
        })
    }

    findProductCourseByCourseNo(productCourseNo) {
        return this.courseList.find((course)=>{
            return course.goodNo === productCourseNo;
        });
    }

    updateCourse(productCourse, detail) {
        productCourse.repairDetail(detail);
        return productCourse;
    }
    findOwnedCoursePlanItemById(coursePlanItemId){
        return this.ownedCoursePlanList.find((item,index)=>{
            return item.id === coursePlanItemId;
        })
    }

    downLoadHomework(ownedCoursePlanItem){
        return ownedCoursePlanItem.homework.getStatusInfo(ownedCoursePlanItem).downLoad();
    }
    getLectureNotes(coursePlanItem){
        return coursePlanItem.lectureNotes.getLectureNotesStatus().showLectureNotes(userService.login.token);
    }
    queryUserHomework(coursePlanItem){
        console.log(coursePlanItem);
        return courseRepository.queryUserHomeWork({
            userCoursePlanId:coursePlanItem.id
        })
    }
}

export const courseService = new CourseService();