/**
 * Created by Liudq on 2019/8/28
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export class CountDownView extends Component{
    constructor(props) {
        super(props);
        let countDownText = this.props.endText||"发送验证码";
        this.startTime = this.startTime || 60;
        this.state = {
            countDown:countDownText
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }

}