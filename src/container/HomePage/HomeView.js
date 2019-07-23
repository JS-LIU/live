/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {homeData} from "./HomeData";
import {HomeHeadView} from "../../component/HomeHeadView";
import {userService} from "../../service/UserService";

export class HomeView extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo:{}
        }
    }
    componentDidMount() {
        userService.getUserInfo().then((userInfo)=>{
            this.setState({
                userInfo:userInfo
            })
        });
    }
    render() {
        return(
            <div>
                <HomeHeadView routeList={homeData.header.links} userInfo={this.state.userInfo} />

            </div>
        )
    }
}