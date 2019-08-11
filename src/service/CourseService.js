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

class CourseService {
    constructor(){
        let ownedCourseAjax = commonAjax.resource('/course/w/v1.0/:action');
        let courseAjax = commonAjax.resource('/good/w/v1.0/:action');
        this._getOwnedCourseListByWeek = function(postInfo){
            return ownedCourseAjax.save({action:'pageCoursePlan'},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._getAllOwnedCourseList = function(postInfo){
            return ownedCourseAjax.save({action:"pageMyCourse"},postInfo,{name:"token",value:userService.getUser().token})
        };
        this._getCourseType = function(postInfo){
            return courseAjax.save({action:'goodBaseSelectTips'},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._getProductCourseList = function(postInfo){
            return courseAjax.save({action:'pageGoodInfo'},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._getProductDetail = function(postInfo){
            return courseAjax.save({action:'goodDetail'},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._getOwnedCourseDetail = function(postInfo){
            return ownedCourseAjax.save({action:"courseDetail"},postInfo,{name:"token",value:userService.getUser().token});
        };
        this.ownedCourseList = [];
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
                name:"正在学",
                active:false,
                order:2
            },
            {
                id:2,
                name:"已结束",
                active:false,
                order:3
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
    getOwnedCourseDetail(id){
        let ownedCourse = this.findOwnedCourseById(id);
        return this._getOwnedCourseDetail({
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
            return parseInt(ownedCourse.id) === parseInt(id);
        })
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
    getOwnedCourseListByWeek(startTime, endTime){
        return this._getOwnedCourseListByWeek({
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size,
            startTime:startTime,
            endTime:endTime
        }).then((data)=>{
            //  todo 暂时前端处理
            if(data.data.total < this.pagination.pageNum*this.pagination.size){
                data.data.list = [];
            }
            return this.createOwnedCourseListByJson(data.data.list);
        })
    }
    getAllOwnedCourseList(){
        return this._getAllOwnedCourseList({
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size,
            learnStatus:this.getOwnedCourseLearnStatusList().getActive().id
        }).then((data)=>{
            return this.createOwnedCourseListByJson(data.data.list);
        })
    }

    /**
     * 创建拥有的课程
     * @param ownedCourseListJson
     * @returns {Promise<OwnedCourse>}
     */
    createOwnedCourseListByJson(ownedCourseListJson){
        let ownedCourseList = [];
        return new Promise((resolve, reject)=>{
            if(ownedCourseListJson.length === 0){
                reject("no course");
            }else{
                for(let i = 0;i < ownedCourseListJson.length;i++){
                    ownedCourseList.push(new OwnedCourse(ownedCourseListJson[i]));
                }
                this.ownedCourseList = this.refreshOrMoreList(this.ownedCourseList,ownedCourseList);
                resolve(this.ownedCourseList);
            }
        });
    }
    /**
     * 获取所有课程的分类（商品类型列表）
     */
    getCourseType(){
        return this._getCourseType({}).then((data)=>{
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
        console.log(generalCourseType);
        generalCourseType.selectSpecifyCourseType(specifyCourseType);
    }
    findGeneralCourseTypeByTypeId(typeId){
        return this.courseType.find((generalType,index)=>{
            return generalType.type === typeId;
        });
    }
    toggleSelectAllSpecifyCourseType(generalCourseType){
        generalCourseType.toggleSelectAllSpecifyCourseType();
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
        return this._getProductCourseList({
            selectTips:this.getSelectedSpecifyCourseTypeByJson(),
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size
        }).then((data)=>{
            for(let i = 0;i < data.data.list.length;i++){
                productCourseList.push(this.createProductCourse(data.data.list[i]));
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
    //  课程详情
    getProductCourseDetail(productCourseNo){
        let productCourse = this.findProductCourseByCourseNo(productCourseNo);
        return this._getProductDetail({
            goodNo:productCourseNo
        }).then((data)=>{
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

}

export const courseService = new CourseService();