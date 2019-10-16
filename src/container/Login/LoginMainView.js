/**
 * Created by Liudq on 2019-07-22
 */

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {HB} from '../../util/HB';
import {userService} from "../../service/UserService";
import {FooterView} from "../../component/FooterView/FooterView";
import {LoginHeaderView} from '../../component/HeaderView/LoginHeaderView';
import {LoginView} from "./LoginView";
import {RegisterView} from './RegisterView';
import loginStyle from './loginStyle.css';
export class LoginMainView extends Component{
    constructor(props) {
        super(props);
        this.redirect = HB.url.getSearchKeyByLocationSearch(this.props.location.search,"redirect");
        this.state = {
            isShowToast:false,
            toastText:""
        }
    }

    componentDidMount() {

    }
    //  登录
    login(signWay,signInfo){
        userService.signIn(signWay,signInfo).then(()=>{
            HB.save.setLocalStorageByLimitTime("token",userService.login.token);
            return userService.updateUserInfo()
        }).then((userInfo)=>{
            //  登录后跳转之前页面 并弹出弹框
            let url = this.redirect || "/home";

            if(userInfo.getModule().isNeedRepair){
                url += "?isNeedRepair=true";
            }
            this.props.history.replace(url);
        }).catch((msg)=>{
            this.setState({
                isShowToast:true,
                toastText:msg
            })
        })
    }
    getVCode(purpose,phoneNum){
        userService.getVCode(purpose,phoneNum).catch((msg)=>{
            this.setState({
                isShowToast:true,
                toastText:msg
            })
        }).then((data)=>{
            if(data.code !== 0){
                this.setState({
                    isShowToast:true,
                    toastText:data.message
                })
            }
        });
    }
    register(registerInfo){
        userService.register(registerInfo).then(()=>{
            return userService.updateUserInfo();
        }).then((userInfo)=>{
            //  登录后跳转之前页面 并弹出弹框
            let url = this.redirect || "/home";
            if(userInfo.getModule().isNeedRepair){
                url += "?isNeedRepair=true";
            }
            this.props.history.replace(url);
        }).catch((msg)=>{
            this.setState({
                isShowToast:true,
                toastText:msg
            })
        });
    }
    hideToast(){
        this.setState({
            isShowToast:false,
        })
    }
    render(){
        return(
            <div>
                <div className="login_wrap"/>
                <LoginHeaderView />
                <div className="login_main">
                    <Route path="/login/login" component={ props =>{
                        let obj = Object.assign({},props,{
                            login:this.login.bind(this),
                            getVCode:this.getVCode.bind(this),
                            isShowToast:this.state.isShowToast,
                            toastText:this.state.toastText,
                            hideToast:this.hideToast.bind(this)
                        });
                        return <LoginView  {...obj} />
                    }} />
                    <Route path="/login/register" component={ props => {
                        let obj = Object.assign({},props,{
                            register:this.register.bind(this),
                            getVCode:this.getVCode.bind(this),
                            isShowToast:this.state.isShowToast,
                            toastText:this.state.toastText,
                            hideToast:this.hideToast.bind(this)
                        });
                        return <RegisterView {...obj}/>
                    }} />
                </div>
            </div>
        )
    }
}
