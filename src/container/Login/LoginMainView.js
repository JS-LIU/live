/**
 * Created by Liudq on 2019-07-22
 */

import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import {login} from "../../entity/Login";
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
    }

    componentDidMount() {

    }
    //  登录
    login(signWay,signInfo){
        userService.signIn(signWay,signInfo).then(()=>{
            HB.save.setLocalStorageByLimitTime("token",userService.login.token);
            return userService.updateUserInfo()
        }).then((userInfo)=>{
            console.log(userInfo);
            if(userInfo.getModule().isNeedRepair){
                this.props.history.replace('/user/userInfo');
            }else{
                this.props.history.replace('/home');
            }
        })
    }
    getVCode(purpose,phoneNum){
        userService.getVCode(purpose,phoneNum).catch((msg)=>{
            alert(msg)
        });
    }
    register(registerInfo){
        userService.register(registerInfo).then(()=>{
            return userService.updateUserInfo();
        }).then((userInfo)=>{
            if(userInfo.getModule().isNeedRepair){
                this.props.history.replace('/user/userInfo');
            }else{
                this.props.history.replace('/home');
            }
        }).catch((msg)=>{
            alert(msg)
        });
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
                        });
                        return <LoginView  {...obj} />
                    }} />
                    <Route path="/login/register" component={ props => {
                        let obj = Object.assign({},props,{
                            register:this.register.bind(this),
                            getVCode:this.getVCode.bind(this),
                        });
                        return <RegisterView {...obj}/>
                    }} />
                </div>
            </div>
        )
    }
}
