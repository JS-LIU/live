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


class CourseService {
    constructor(){
        let ownedCourseAjax = commonAjax.resource('/course/w/v1.0/:action');
        let courseAjax = commonAjax.resource('/good/w/v1.0/:action');
        this._getOwnedCourseList = function(postInfo){
            return ownedCourseAjax.save({action:'pageCoursePlan'},postInfo,{name:"token",value:userService.getUser().token});
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
        this.ownedCourseList = [];
        this.courseType = [];
        this.courseList = [];
        this.pagination = new Pagination(1,5);
    }

    /**
     * 获取已购的本周课程(某一周的课程，已购课程)
     * @param pageNum
     * @param startTime
     * @param endTime
     */
    getOwnedCourseList(pageNum,startTime,endTime){
        this._getOwnedCourseList({
            pageNum:pageNum,
            pageSize:5,
            startTime:TimeManager.convertToTimeStampBySec(startTime),
            endTime:TimeManager.convertToTimeStampBySec(endTime)
        }).then((data)=>{
            for(let i = 0;i < data.data.list.length;i++){
                this.ownedCourseList.push(new OwnedCourse(data.data.list[i]));
            }
            return this.ownedCourseList;
        })
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
        specifyCourseType.select();
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
                this.courseList = this.updateCourseList(productCourseList);
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
     * 更新courseList
     * private
     * @param productCourseList
     * @returns {[]|*}
     */
    updateCourseList(productCourseList) {
        if(this.pagination.pageNum === 1){
            this.courseList = productCourseList
        }else{
            this.courseList.concat(productCourseList);
        }
        return this.courseList;
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
            console.log(productCourse);
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