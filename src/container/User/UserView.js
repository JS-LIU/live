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

export class UserView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo:userService.getUser().userInfo
        }
    }
    refreshUserInfo(){
        userService.getUserInfo().then(()=>{
            this.setState({
                userInfo:userService.getUser().userInfo
            })
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
                    <UserTabBox userInfo={userService.getUser().userInfo} history={this.props.history}/>
                    <Route path="/user/userInfo" component={props=>{
                        let obj = Object.assign({},props,{refreshUserInfo:this.refreshUserInfo.bind(this)});
                        return <UserInfoView {...obj}/>}
                    } />
                    <Route path="/user/accountManage" component={AccountManageView} />
                    <Route path="/user/orderList" component={OrderListView}/>
                    <Route path="/user/orderDetail/:orderNo" component={OrderDetailView}/>
                </div>
            </div>
        );
    }


}