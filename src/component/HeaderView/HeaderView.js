/**
 * Created by Liudq on 2019-07-18
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import headerStyle from "./headerStyle.css";


export class HeaderView extends Component{
    render() {
        return (
            <div className="common_header">
                <Link to="/home">首页</Link>
                <Link to="/studyCenter">选课中心</Link>
                <Link to="/selectLessonCenter">创作中心</Link>
                <Link to="/codingCenter">软件下载</Link>
            </div>
        )
    }
}
