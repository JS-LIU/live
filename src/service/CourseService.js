/**
 * Created by Liudq on 2019-07-23
 */
import {commonAjax} from "../config/config";
import {TimeManager} from "../entity/TimeManager";
import {userService} from "./UserService";
import {OwnedCourse} from "../entity/OwnedCourse";
import {GeneralCourseType} from "../entity/GeneralCourseType";
import {SpecifyCourseType} from "../entity/SpecifyCourseType";
import {ProductCourse} from "../entity/ProductCourse";
import {Page} from "../entity/Page";


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
        this.ownedCourseList = [];
        this.courseType = [];
        this.courseList = [];
        this.pagination = new Page(1,5);
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
            //  todo 返回的数据好像又错了 暂时先用对的mock一下
            let mockData = JSON.parse('{"code":0,"message":null,"data":{"summaryTips":[{"name":"年级","selectTips":[{"id":0,"type":1,"name":"学龄前"},{"id":1,"type":1,"name":"一年级"},{"id":2,"type":1,"name":"二年级"},{"id":3,"type":1,"name":"三年级"},{"id":4,"type":1,"name":"四年级"},{"id":5,"type":1,"name":"五年级"},{"id":6,"type":1,"name":"六年级"},{"id":7,"type":1,"name":"初一"},{"id":8,"type":1,"name":"初二"},{"id":9,"type":1,"name":"初三"}],"index":1},{"name":"学科","selectTips":[{"id":1,"type":2,"name":"PYTHON"},{"id":2,"type":2,"name":"C++"},{"id":3,"type":2,"name":"SCRATCH"}],"index":2},{"name":"课程难度","selectTips":[{"id":1001,"type":3,"name":"初级"},{"id":1002,"type":3,"name":"中级"},{"id":1003,"type":3,"name":"高级"}],"index":3}]}}');
            //  todo 容错处理 判断如果有data.data.summaryTips不为空的话
            return new Promise((resolve, reject)=>{
                resolve(this.createGeneralCourseType(mockData.data.summaryTips));
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
            productCourseList.push(new ProductCourse(data.data.list));
            return new Promise((resolve, reject)=>{
                this.courseList = this.updateCourseList(productCourseList);
                resolve(this.courseList);
            })
        })
    }
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

    getPagination(){
        return this.pagination;
    }
}

export const courseService = new CourseService();