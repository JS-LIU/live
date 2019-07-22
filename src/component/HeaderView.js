/**
 * Created by Liudq on 2019-07-18
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class HeaderView extends Component{
    render() {
        return (
            <div>
                <Link to="/home">首页</Link>
                <Link to="/studyCenter">学习中心</Link>
                <Link to="/selectLessonCenter">首页</Link>
                <Link to="/codingCenter">创作中心</Link>
            </div>
        )
    }

}
