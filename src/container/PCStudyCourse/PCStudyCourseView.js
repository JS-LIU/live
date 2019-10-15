/**
 * Created by Liudq on 2019-08-16
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import {userService} from "../../service/UserService";
import {PCWeekCourseView} from './PCWeekCourseView';
import {PCMyCourseListView} from './PCMyCourseListView';
import {PCCourseRouteView} from "./PCCourseRouteView";
import {PCCourseDetailView} from "./PCCourseDetailView";
import {PCUserInfoView} from "./PCUserInfoView";
import {baseUrl} from "../../config/config";
import {CompleteUserInfoView} from "./CompleteUserInfoView";
import pcStudyCourseStyle from "./pcStudyCourseStyle.css";
import {LoginView} from "../Login/LoginView";


export class PCStudyCourseView extends Component{
    constructor(props) {
        super(props);
        this.navBarList = [{
            name:"本周课程",
            select:true,
            activeBackground:"#FFC200 url('"+baseUrl.getBaseUrl()+"/src/img/week_icon_check.png"+"') no-repeat left center",
            background:"url('"+baseUrl.getBaseUrl()+"/src/img/week_icon_uncheck.png"+"') no-repeat left center",
            link:"/studyCourseCenter/week",
            action:function(){}
        },{
            name:"我的课程",
            select:false,
            activeBackground:"#FFC200 url('"+baseUrl.getBaseUrl()+"/src/img/my_course_check.png"+"') no-repeat left center",
            background:"url('"+baseUrl.getBaseUrl()+"/src/img/my_course_uncheck.png"+"') no-repeat left center",
            link:"/studyCourseCenter/myCourseList",
            action:function(){}
        },{
            name:"选课中心",
            select:false,
            activeBackground:"#FFC200 url('"+baseUrl.getBaseUrl()+"/src/img/select_center_check.png"+"') no-repeat left center",
            background:"url('"+baseUrl.getBaseUrl()+"/src/img/select_center_uncheck.png"+"') no-repeat left center",
            link:"/studyCourseCenter/select",
            action:()=>{
                let url = "https://pcwap-test.vcode.vip/product/index.html?redirect=selectCourseCenter&t="+userService.login.token;
                window.CallNativeBrowser(url);
            }
        }];
        this.state={
            navBarList:this.navBarList,
            userName:userService.user.getUserInfo().getModule().userName
        }
    }
    switchActiveBar(navBarItem){
        for(let i = 0;i < this.navBarList.length;i++){
            this.navBarList[i].select = false;
        }
        navBarItem.select = true;
        this.setState({
            navBarList:this.navBarList,
        })
    }
    fixedUserInfo(postInfo){
        userService.resetUserInfo(postInfo).then(()=>{
            this.setState({
                userName:userService.user.getUserInfo().getModule().userName,
            });
            alert("修改成功");
        });

    }
    render() {
        return(
            <div className="pc_study_course_main">
                {userService.user.getUserInfo().needRepair()?<CompleteUserInfoView fixedUserInfo={this.fixedUserInfo.bind(this)}/>:null}
                <PCCourseRouteView
                    userName={this.state.userName}
                    switchActiveBar={this.switchActiveBar.bind(this)}
                    navBarList={this.state.navBarList}/>
                <div>
                    <Route path="/studyCourseCenter/week" component={PCWeekCourseView} />
                    <Route path="/studyCourseCenter/myCourseList" component={PCMyCourseListView} />
                    <Route path="/studyCourseCenter/ownedCourseDetail/:id" component={PCCourseDetailView} />
                    <Route path="/studyCourseCenter/userInfo"
                           component={ props =>{
                               let obj = Object.assign({},props,{
                                   fixedUserInfo:this.fixedUserInfo.bind(this),
                               });
                               return <PCUserInfoView  {...obj}/>
                           }}/>
                </div>
            </div>
        )
    }
}