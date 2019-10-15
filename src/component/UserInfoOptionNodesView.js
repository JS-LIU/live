/**
 * Created by Liudq on 2019/9/18
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export class UserInfoOptionNodesView extends Component{
    constructor(props) {
        super(props);
        this.style = Object.assign({},this.props.style);
    }
    changeHandle(e){
        let targetValue = e.target.value;
        this.props.changeHandle(targetValue);
    }
    render() {
        let listNodes = this.props.optionList.map((optionItem,index)=>{
            return (<option
                key={index}
                // value={optionItem}
                 >{optionItem}</option>)
        });
        return (
            <select style={this.style}
                    className="none_def_appearance"
                    // value={this.props.defValue}
                    defaultValue={this.props.defValue}
                    onChange={this.changeHandle.bind(this)}>
                {listNodes}
            </select>
        );
    }
}