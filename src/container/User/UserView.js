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
export class UserView extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="wrap"></div>
                <HeaderView userInfo={userService.getUser().userInfo}/>
                <div className="user_body_main">
                    <UserTabBox userInfo={userService.getUser().userInfo} history={this.props.history}/>
                    <Route path="/user/userInfo" component={UserInfoView} />
                    <Route path="/user/accountManage" component={AccountManageView} />
                    <Route path="/user/orderList" component={OrderListView}/>
                </div>
            </div>
        );
    }


}