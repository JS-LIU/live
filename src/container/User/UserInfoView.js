/**
 * Created by Liudq on 2019-08-06
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {userService} from "../../service/UserService";
import userInfoStyle from "./userInfoStyle.css";
import {TimeManager} from "../../entity/TimeManager";

export class UserInfoView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo:userService.getUser().userInfo
        };
        //  clone userService;
        this.userInfo = Object.assign({},userService.getUser().userInfo);
    }
    onChangeName(e){
        let name = e.target.value;
        this.userInfo = Object.assign({},this.userInfo,{
            userName:name
        });
        this.setState({
            userInfo:this.userInfo
        })
    }
    onChangeSex(e){
        let sex = (e.target.value==="男"?1:0);
        this.userInfo = Object.assign(this.userInfo,{
            sex:sex
        });
        this.setState({
            userInfo:this.userInfo
        })
    }
    onChangeYear(e){
        this.userInfo = Object.assign(this.userInfo,{
            birthY:e.target.value
        });
        this.setState({
            userInfo:this.userInfo
        })
    }
    onChangeMonth(e){
        this.userInfo = Object.assign(this.userInfo,{
            birthM:e.target.value
        });
        this.setState({
            userInfo:this.userInfo
        })
    }
    onChangeDay(e){
        console.log(e.target.value);
        this.userInfo = Object.assign(this.userInfo,{
            birthD:e.target.value
        });
        this.setState({
            userInfo:this.userInfo
        })
    }
    onChangeGrade(e){
        this.userInfo = Object.assign(this.userInfo,{
            grade:e.target.value
        });
        this.setState({
            userInfo:this.userInfo
        })
    }
    onChangeAddress(e){
        this.userInfo = Object.assign(this.userInfo,{
            address:e.target.value
        });
        this.setState({
            userInfo:this.userInfo
        })
    }
    confirmFixed(){
        userService.resetUserInfo(this.userInfo).then((data)=>{
            alert("修改成功");
        }).catch(()=>{
            alert("修改失败");
        });
    }
    render() {
        let years = TimeManager.createDate(1999,2014);
        let yearNodes = years.map((yearItem,index)=>{
            return (
                <option key={index} value={yearItem} selected={parseInt(yearItem) === this.state.userInfo.birthY?"selected":null}>{yearItem}</option>
            )
        });
        let month = TimeManager.createDate(1,12);
        let monthNodes = month.map((monthItem,index)=>{
            return (
                <option key={index} value={monthItem} selected={parseInt(monthItem) === this.state.userInfo.birthM?"selected":null}>{monthItem}</option>
            )
        });
        let day = TimeManager.createDate(1,31);
        let dayNodes = day.map((dayItem,index)=>{
            return (
                <option key={index} value={dayItem} selected={parseInt(dayItem) === this.state.userInfo.birthD?"selected":null}>{dayItem}</option>
            )
        });
        let grade = ["学前班","小学一年级","小学二年级","小学三年级","小学四年级","小学五年级","小学六年级","初中一年级","初中二年级","初中三年级","高中一年级","高中二年级","高中三年级"];
        let gradeNodes = grade.map((gradeItem,index)=>{
            return (
                <option key={index} value={gradeItem} selected={gradeItem === this.state.userInfo.grade?"selected":null}>{gradeItem}</option>
            )

        });
        return (
            <div className="user_info_main">
                <div className="user_info_box_title">个人信息</div>
                <div className="user_info_box_set_info_box">
                    <ul className="user_info_box_set_info_box_left">
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">真实姓名</div>
                            <div className="user_info_set_info_box_left_item_name_box">
                                <input type="text"
                                       value={this.state.userInfo.userName}
                                       className="user_info_set_info_box_left_item_name"
                                       onChange={this.onChangeName.bind(this)}
                                />
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">性别</div>
                            <div className="user_info_set_info_box_left_item_sex">
                                <input type="radio"
                                       name="sex"
                                       value="男"
                                       checked={this.state.userInfo.sex === 1}
                                       className="user_info_set_info_box_left_item_sex_man"
                                       onChange={this.onChangeSex.bind(this)}/>
                                <span style={{paddingLeft:"0.07rem"}}>男</span>
                                <input type="radio"
                                       name="sex"
                                       value="女"
                                       className="user_info_set_info_box_left_item_sex_woman"
                                       style={{marginLeft:"0.21rem"}}
                                       checked={this.state.userInfo.sex === 0}
                                       onChange={this.onChangeSex.bind(this)}
                                />
                                <span style={{paddingLeft:"0.07rem"}}>女</span>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">生日</div>
                            <div className="user_info_set_info_box_left_item_birthday">
                                <select className="user_info_set_info_box_left_item_birthday_year_box"
                                        onChange={this.onChangeYear.bind(this)}>
                                    {yearNodes}
                                </select>
                                <div style={{padding:"0 0.22rem 0 0.12rem"}}>年</div>
                                <select className="user_info_set_info_box_left_item_birthday_month_box"
                                        onChange={this.onChangeMonth.bind(this)}>
                                    {monthNodes}
                                </select>
                                <div style={{padding:"0 0.22rem 0 0.12rem"}}>月</div>
                                <select className="user_info_set_info_box_left_item_birthday_day_box"
                                        onChange={this.onChangeDay.bind(this)}>
                                    {dayNodes}
                                </select>
                                <div style={{padding:"0 0.22rem 0 0.12rem"}}>日</div>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">年级</div>
                            <div className="user_info_set_info_box_left_item_grade">
                                <select className="user_info_set_info_box_left_item_grade_box"
                                        onChange={this.onChangeGrade.bind(this)}>
                                    {gradeNodes}
                                </select>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">收获地址</div>
                            <input type="text"
                                   value={this.state.userInfo.address}
                                   className="user_info_set_info_box_address"
                                   onChange={this.onChangeAddress.bind(this)}
                            />
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title" />
                            <div className="confirm_fixed_user_info"
                                 onClick={this.confirmFixed.bind(this)}>确认修改</div>
                        </li>
                    </ul>
                    <div className="update_header">
                        <div className="update_header_box">
                            <img src={this.state.userInfo.headImgUrl} alt="" className="update_header_box_img"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
