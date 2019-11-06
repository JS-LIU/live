/**
 * Created by Liudq on 2019/10/31
 */
import React, {Component} from 'react';
import { Route } from "react-router-dom";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {IntroduceTabBox} from "./IntroduceTabBox";
import {PolicyView} from "./PolicyView";
import {userService} from "../../service/UserService";
import vipCodeIntroduceStyle from './vipCodeIntroduceStyle.css';
import {AboutUsView} from "./AboutUsView";

export class VipCodeIntroduceView extends Component{
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <div className="wrap" />
                <HeaderView history={this.props.history} userInfo={userService.user.getUserInfo()}/>
                <div className="vipCode_introduce_main">
                    <IntroduceTabBox match={this.props.match} history={this.props.history}/>
                    <Route path="/vipCodeIntroduce/aboutUs" component={AboutUsView}/>
                    <Route path="/vipCodeIntroduce/policy" component={PolicyView}/>
                </div>
            </div>
        )
    }

}