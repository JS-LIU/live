/**
 * Created by Liudq on 2019-08-06
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import userTabBoxStyle from './userTabBoxStyle.css';
import {baseUrl} from "../../config/config";

export class UserTabBox extends Component{
    constructor(props) {
        super(props);
        this.tabList = [
            {
                link:"/userInfo",
                name:"个人信息",
                uncheck_icon:baseUrl.getBaseUrl() + "/src/img/user_tab_box_user_info_uncheck.png",
                check_icon:baseUrl.getBaseUrl() + "/src/img/user_tab_box_user_info_check.png",
                activity:true
            },
            {
                link:"/accountManage",
                name:"账户管理",
                uncheck_icon:baseUrl.getBaseUrl() + "/src/img/user_tab_box_account_uncheck.png",
                check_icon:baseUrl.getBaseUrl() + "/src/img/user_tab_box_account_check.png",
                activity:false,
            },
            {
                link:"/orderList",
                name:"我的订单",
                uncheck_icon:baseUrl.getBaseUrl() + "/src/img/user_tab_box_order_uncheck.png",
                check_icon:baseUrl.getBaseUrl() + "/src/img/user_tab_box_order_check.png",
                activity:false,
            },
            {
                link:"/couponList",
                name:"优惠券",
                uncheck_icon:baseUrl.getBaseUrl() + "/src/img/user_tab_box_voucher_uncheck.png",
                check_icon:baseUrl.getBaseUrl() + "/src/img/user_tab_box_voucher_check.png",
                activity:false,
            }
        ];
        this.state = {
            tabList:this.tabList
        }
    }
    onCutTab(tab){
        return ()=>{
            for(let i = 0;i < this.tabList.length;i++){
                this.tabList[i].activity = false;
            }
            tab.activity = true;
            this.setState({
                tabList:this.tabList
            });
            this.props.history.replace("/user"+`${tab.link}`)
        }
    }
    render() {
        let tabListNodes = this.state.tabList.map((tab,index)=>{
            return (
                <div key={index} onClick={this.onCutTab(tab)} className="user_info_tab_item" style={tab.activity?activityTabStyle():{}}>
                    <img src={tab.activity?tab.check_icon:tab.uncheck_icon} alt="" className="user_info_tab_item_img"/>
                    <span>{tab.name}</span>
                </div>
            )

        });
        return (
            <div className="user_tab_box">
                <div className="user_tab_box_user_info">
                    <div className="user_tab_box_user_header">
                        <img src={this.props.userInfo.headImgUrl} alt="" className="user_tab_box_user_header_pic"/>
                    </div>
                    <div className="user_tab_box_user_name">{this.props.userInfo.userName}</div>
                </div>
                <div className="user_tab_box_tab_list">
                    {tabListNodes}
                </div>

            </div>
        );
    }


}
function activityTabStyle() {
    return {
        borderRadius:"0.04rem",
        color:"#FFFFFF",
        background:"#FFC200"
    }
}