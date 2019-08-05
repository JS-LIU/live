/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {homeData} from "./HomeData";
import {HomeHeadView} from "../../component/HomeHeadView";
import {userService} from "../../service/UserService";
import {HeaderView} from "../../component/HeaderView/HeaderView";

export class HomeView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo:{}
        }
    }

    componentDidMount() {
        userService.getUserInfo().then(()=>{
            this.setState((state,props)=>{
                return {
                    userInfo:userService.getUser().userInfo
                }
            })
        });
    }
    render() {
        return(
            <div>
                <HeaderView userInfo={this.state.userInfo} />
            </div>
        )
    }
}