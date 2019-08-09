/**
 * Created by Liudq on 2019-08-08
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import headerStyle from "./headerStyle.css";


export class LoginHeaderView extends Component{
    constructor(props) {
        super(props);
    }

    showDialog(){

    }
    render() {
        return (
            <div className="common_header">
                <div className="common_header_center">
                    <div className="common_header_logo"/>
                </div>
            </div>
        )
    }
}
