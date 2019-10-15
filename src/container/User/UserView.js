/**
 * Created by Liudq on 2019-08-06
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {UserTabBox} from "./UserTabBox";
import {UserInfoView} from "./UserInfoView";
import {AccountManageView} from "./AccountManageView";
import {OrderListView} from "./OrderListView";
import userStyle from './userStyle.css';
import {OrderDetailView} from "./OrderDetailView";
import {HB} from '../../util/HB';
import {CouponListView} from "../CouponListView/CouponListView";

export class UserView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo:userService.user.getUserInfo()
        }
    }
    fixedUserInfo(postInfo){
        userService.resetUserInfo(postInfo).then(()=>{
            this.setState({
                userName:userService.user.getUserInfo().getModule().userName,
            });
            alert("修改成功");
        });

    }
    componentDidMount() {
        HB.save.setStorage({redirect:"user"})
    }

    render() {
        return (
            <div>
                <div className="wrap" />
                <HeaderView history={this.props.history} userInfo={this.state.userInfo}/>
                <div className="user_body_main">
                    <UserTabBox userInfo={userService.user.getUserInfo()} history={this.props.history}/>
                    <Route path="/user/userInfo" component={props=>{
                        let obj = Object.assign({},props,{
                            fixedUserInfo:this.fixedUserInfo.bind(this),
                        });
                        return <UserInfoView {...obj}/>}
                    } />
                    <Route path="/user/accountManage" component={AccountManageView} />
                    <Route path="/user/orderList" component={OrderListView}/>
                    <Route path="/user/orderDetail/:orderNo" component={OrderDetailView}/>
                    <Route path="/user/couponList" component={CouponListView}/>
                </div>
            </div>
        );
    }


}