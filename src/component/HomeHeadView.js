/**
 * Created by Liudq on 2019-07-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export class HomeHeadView extends Component{

    constructor(props){
        super(props);

    }

    render() {
        let linkNodes = this.props.routeList.map((linkItem,index)=>{
            return (
                <Link key={index} to={linkItem.link}>{linkItem.name}</Link>
            )
        });

        return(
            <div>

                {linkNodes}
                <img src={this.props.userInfo.headImgUrl} alt=""/>
            </div>
        )
    }
}