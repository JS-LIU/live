/**
 * Created by Liudq on 2019-08-06
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import userInfoStyle from "./userInfoStyle.css";
import {userService} from "../../service/UserService";

export class UserInfoView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo:userService.getUser().userInfo
        }
    }

    render() {
        return (
            <div className="user_info_box">
                <div className="user_info_box_title">个人信息</div>
                <div className="user_info_box_set_info_box">
                    <ul className="user_info_box_set_info_box_left">
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">真实姓名</div>
                            <div className="user_info_set_info_box_left_item_name_box">
                                <input type="text" value={this.state.userInfo.userName} className="user_info_set_info_box_left_item_name"/>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">性别</div>
                            <div className="user_info_set_info_box_left_item_sex">
                                <input type="radio" name="sex" value="男" className="user_info_set_info_box_left_item_sex_man"/>
                                <input type="radio" name="sex" value="女" className="user_info_set_info_box_left_item_sex_woman"/>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">生日</div>
                            <div className="user_info_set_info_box_left_item_birthday">
                                <select className="user_info_set_info_box_left_item_birthday_year_box">
                                    <option value ="2000">2000</option>
                                </select>
                                <select className="user_info_set_info_box_left_item_birthday_month_box">
                                    <option value ="1">1</option>
                                </select>
                                <select className="user_info_set_info_box_left_item_birthday_month_box">
                                    <option value ="1">1</option>
                                </select>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">年级</div>
                            <div className="user_info_set_info_box_left_item_grade">
                                <select className="user_info_set_info_box_left_item_grade_box">
                                    <option value ="小学五年级">小学五年级</option>
                                </select>
                            </div>
                        </li>
                        <li className="user_info_box_set_info_box_left_item">
                            <div className="user_info_set_info_box_left_item_title">收获地址</div>
                            <div className="user_info_set_info_box_left_item_birthday">
                                <select className="user_info_set_info_box_left_item_grade_box">
                                    <option value ="小学五年级">小学五年级</option>
                                </select>
                                <div>省</div>
                            </div>
                        </li>
                    </ul>
                    <div className="update_header">
                        <div className="update_header_box">
                            <img src={this.state.userInfo.headImgUrl} alt="" className="update_header_box_img"/>
                        </div>
                        <input type="file" />
                    </div>
                </div>

            </div>
        );
    }


}
