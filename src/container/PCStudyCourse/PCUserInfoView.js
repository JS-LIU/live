/**
 * Created by Liudq on 2019-08-21
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {userService} from "../../service/UserService";
import {TimeManager} from "../../entity/TimeManager";
import {HB} from "../../util/HB";
import {UserInfoOptionNodesView} from "../../component/UserInfoOptionNodesView";
import pcUserInfoStyle from "./PCUserInfoStyle.css";
import {ShowToastView} from "../../component/ShowToastView/ShowToastView";

export class PCUserInfoView extends Component{
    constructor(props) {
        super(props);
        //  clone userService;
        this.userInfo = Object.assign({},userService.user.getUserInfo().getModule());
        this.state = {
            userName:userService.user.getUserInfo().getModule().userName,
            sex:userService.user.getUserInfo().getModule().showSex,
            isMan:userService.user.getUserInfo().isMan(),
            address:userService.user.getUserInfo().getModule().address
        };
    }
    onChangeName(e){
        let name = e.target.value;
        this.setState({
            userName:name
        });
        this.userInfo = Object.assign(this.userInfo,{
            userName:name
        })
    }
    onChangeSex(e){
        this.sex = userService.user.userInfo.convertSexToType(e.target.value);
        this.setState({
            sex:e.target.value,
            isMan:e.target.value === "男"
        });
        this.userInfo = Object.assign(this.userInfo,{
            sex:this.sex
        })
    }
    onChangeYear(year){
        this.year = year;
        this.userInfo = Object.assign(this.userInfo,{
            showBirthY:this.year
        })
    }
    onChangeMonth(month){
        this.month = month;
        this.userInfo = Object.assign(this.userInfo,{
            showBirthM:this.month
        })
    }
    onChangeDay(day){
        this.day = day;
        this.userInfo = Object.assign(this.userInfo,{
            showBirthD:this.day
        })
    }
    onChangeGrade(grade){
        this.grade = grade;
        this.userInfo = Object.assign(this.userInfo,{
            grade:this.grade
        })
    }
    onChangeAddress(e){
        this.address = e.target.value;
        this.userInfo = Object.assign(this.userInfo,{
            address:this.address
        })
    }
    confirmFixed(){
        this.userInfo = Object.assign(this.userInfo,{
            birthday:TimeManager.convertYMDToStampByUnix(this.userInfo.showBirthY+"/"+this.userInfo.showBirthM+"/"+this.userInfo.showBirthD)
        });
        if(HB.valid.trimAllBlank(this.userInfo.userName) === ""){
            return this.props.showToast("请填写姓名");
        }else{
            this.props.fixedUserInfo(this.userInfo);
        }
    }
    render() {
        return (
            <div className="pc_user_info_main">
                {this.props.isShowToast?<ShowToastView
                    showTime={1500}
                    text={this.props.errorText}
                    hideToast={this.props.hideToast}
                    style={{position:"absolute",bottom:"0.3rem",left:"5rem"}}
                />:null}
                <div className="user_info_box_title">个人信息</div>
                <div className="user_info_box_set_info_box">
                    <ul className="user_info_box_set_info_box_left">
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">真实姓名</div>
                            <div className="user_info_set_info_box_left_item_name_box">
                                <input type="text"
                                       value={this.state.userName}
                                       onChange={this.onChangeName.bind(this)}
                                       className="user_info_set_info_box_left_item_name"
                                />
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">性别</div>
                            <div className="user_info_set_info_box_left_item_sex">
                                <input type="radio"
                                       name="sex"
                                       value="男"
                                       checked={this.state.isMan}
                                       onChange={this.onChangeSex.bind(this)}
                                />
                                <span style={{paddingLeft:"0.07rem"}}>男</span>
                                <input type="radio"
                                       name="sex"
                                       value="女"
                                       style={{marginLeft:"0.21rem"}}
                                       checked={!this.state.isMan}
                                       onChange={this.onChangeSex.bind(this)}
                                />
                                <span style={{paddingLeft:"0.07rem"}}>女</span>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">生日</div>
                            <div className="user_info_set_info_box_left_item_birthday">

                                <UserInfoOptionNodesView optionList={userService.user.getUserInfo().getModule().birthYList}
                                                         changeHandle={this.onChangeYear.bind(this)}
                                                         defValue={userService.user.getUserInfo().getModule().showBirthY}
                                                         style={{
                                                             background:"#F8F8F8",
                                                             width:"0.8rem",
                                                             height:"0.34rem",
                                                             border:"0 solid #F8F8F8",
                                                             display:"flex",
                                                             flexDirection:"row",
                                                             alignItems:"center",
                                                             paddingLeft:"0.1rem"}}/>
                                <div style={{padding:"0 0.22rem 0 0.12rem"}}>年</div>
                                <UserInfoOptionNodesView optionList={userService.user.getUserInfo().getModule().birthMList}
                                                         changeHandle={this.onChangeMonth.bind(this)}
                                                         defValue={userService.user.getUserInfo().getModule().showBirthM}
                                                         style={{
                                                             background:"#F8F8F8",
                                                             width:"0.6rem",
                                                             height:"0.34rem",
                                                             border:"0 solid #F8F8F8",
                                                             display:"flex",
                                                             flexDirection:"row",
                                                             alignItems:"center",
                                                             paddingLeft:"0.1rem"}}/>
                                <div style={{padding:"0 0.22rem 0 0.12rem"}}>月</div>
                                <UserInfoOptionNodesView optionList={userService.user.getUserInfo().getModule().birthDList}
                                                         changeHandle={this.onChangeDay.bind(this)}
                                                         defValue={userService.user.getUserInfo().getModule().showBirthD}
                                                         style={{
                                                             background:"#F8F8F8",
                                                             width:"0.6rem",
                                                             height:"0.34rem",
                                                             border:"0 solid #F8F8F8",
                                                             display:"flex",
                                                             flexDirection:"row",
                                                             alignItems:"center",
                                                             paddingLeft:"0.1rem"}}/>
                                <div style={{padding:"0 0.22rem 0 0.12rem"}}>日</div>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">年级</div>
                            <div className="user_info_set_info_box_left_item_grade">
                                <UserInfoOptionNodesView optionList={userService.user.getUserInfo().getModule().gradeList}
                                                         changeHandle={this.onChangeGrade.bind(this)}
                                                         defValue={userService.user.getUserInfo().getModule().grade}
                                                         style={{
                                                             background:"#F8F8F8",
                                                             width:"0.6rem",
                                                             height:"0.34rem",
                                                             border:"0 solid #F8F8F8",
                                                             display:"flex",
                                                             flexDirection:"row",
                                                             alignItems:"center",
                                                             paddingLeft:"0.1rem"}}/>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">收货地址</div>
                            <input type="text"
                                   value={this.state.address}
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
                            <img src={this.state.headImgUrl} alt="" className="update_header_box_img"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
