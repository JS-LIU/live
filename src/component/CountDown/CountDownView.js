/**
 * Created by Liudq on 2019/8/28
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export class CountDownView extends Component{
    constructor(props) {
        super(props);
        this.initText = this.props.initText;
        this.countDownText = this.props.countDownText;
        this.totalSec = this.props.totalSec;
        this.startCondition = this.props.startCondition||function(){
            return new Promise((resolve, reject)=>{
                resolve();
            })
        };
        this.style = Object.assign({
                position:"absolute",
                borderRadius:"0.2rem",
                width:"1.29rem",
                height:"0.4rem",
                background:"#FFC200",
                right:"-0.01rem",
                top:"0",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                color:"#FFFFFF",
                fontSize:"0.14rem"},this.props.style);
        this.state = {
            countDown:this.initText
        }
    }
    startTime(){
        let startTime = this.totalSec;
        let t = setInterval(()=>{
            startTime--;
            this.setState({
                countDown:startTime + this.countDownText
            });
            if(startTime === 0){
                startTime = 60;
                this.setState({
                    countDown:this.initText
                });
                clearInterval(t);
            }
        },1000)
    }
    clickHandle(){
        // this.startTime().before(func());
        this.startCondition().then(()=>{
            if(this.state.countDown === this.initText){
                this.startTime();
                this.props.clickHandle();
            }
        });
    }
    render() {
        return (
            <div onClick={this.clickHandle.bind(this)} style={this.style}>
                {this.state.countDown}
            </div>
        );
    }

}