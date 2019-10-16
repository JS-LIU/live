/**
 * Created by Liudq on 2019/9/18
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {userService} from "../../service/UserService";
import {UserInfoOptionNodesView} from "../../component/UserInfoOptionNodesView";
import completeViewStyle from './completeViewStyle.css'
import {TimeManager} from "../../entity/TimeManager";
import {HB} from "../../util/HB";
import {ShowToastView} from "../../component/ShowToastView/ShowToastView";

export class CompleteUserInfoView extends Component{
    constructor(props) {
        super(props);
        this.userInfo = Object.assign({},userService.user.getUserInfo().getModule());
        this.state = {
            userName:userService.user.getUserInfo().getModule().userName,
            sex:userService.user.getUserInfo().getModule().showSex,
            isMan:userService.user.getUserInfo().isMan(),
            address:userService.user.getUserInfo().getModule().address,
            isShowToast:false,
        }
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
    hideToast(){
        this.setState({
            isShowToast:false,
        })
    }
    confirmFixed(){
        this.userInfo = Object.assign(this.userInfo,{
            birthday:TimeManager.convertYMDToStampByUnix(this.userInfo.showBirthY+"/"+this.userInfo.showBirthM+"/"+this.userInfo.showBirthD)
        });
        if(HB.valid.trimAllBlank(this.userInfo.userName) === ""){
            this.setState({
                isShowToast:true,
            })
        }else{
            this.props.fixedUserInfo(this.userInfo);
        }

    }
    render() {
        return (
            <div className="complete_view">
                <div className="complete_wrap" />
                <div className="complete_dialog">
                    {this.props.isShowToast?<ShowToastView
                        text={"请填写姓名"}
                        showTime={1500}
                        hideToast={this.props.hideToast}
                        style={{position:"absolute",bottom:"0.8rem"}}/>:null}
                    <div className="complete_dialog_title">完善信息</div>
                    <ul className="complete_dialog_main">
                        <li className="complete_dialog_line">
                            <div className="complete_dialog_line_title">
                                <div className="complete_dialog_line_title_text">真实姓名</div>
                                <div className="complete_dialog_line_must">*</div>
                            </div>
                            <div className="complete_dialog_user_name">
                                <input type="text"
                                       value={this.state.userName}
                                       onChange={this.onChangeName.bind(this)}
                                       className="user_info_set_info_box_left_item_name"
                                />
                            </div>
                        </li>
                        <li className="complete_dialog_line">
                            <div className="complete_dialog_line_title">
                                <div className="complete_dialog_line_title_text">性别</div>
                                <div className="complete_dialog_line_must">*</div>
                            </div>
                            <div>
                                <input type="radio"
                                       name="sex"
                                       value="男"
                                       checked={this.state.isMan}
                                       onChange={this.onChangeSex.bind(this)}/>
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
                        <li className="complete_dialog_line">
                            <div className="complete_dialog_line_title">
                                <div className="complete_dialog_line_title_text">生日</div>
                                <div className="complete_dialog_line_must">*</div>
                            </div>
                            <div className="complete_dialog_line_birthday">
                                <UserInfoOptionNodesView optionList={userService.user.getUserInfo().getModule().birthYList}
                                                         changeHandle={this.onChangeYear.bind(this)}
                                                         defValue={userService.user.getUserInfo().getModule().showBirthY}
                                                         style={{
                                                          background:"#F8F8F8",
                                                          width:"0.6rem",
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
                        <li className="complete_dialog_line">
                            <div className="complete_dialog_line_title">
                                <div className="complete_dialog_line_title_text">年级</div>
                            </div>
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
                        </li>
                        <li className="complete_dialog_line">
                            <div className="complete_dialog_line_title">
                                <div className="complete_dialog_line_title_text">居住地</div>
                            </div>
                            <div className="complete_dialog_user_address">
                                <input type="text"
                                       value={this.state.address}
                                       className="complete_dialog_input"
                                       onChange={this.onChangeAddress.bind(this)}
                                />
                            </div>
                        </li>
                    </ul>
                    <div className="complete_dialog_change_user_info">
                        <div className="complete_dialog_change_user_info_btn"
                             onClick={this.confirmFixed.bind(this)}>确认修改</div>
                    </div>

                </div>
            </div>
        )
    }
}