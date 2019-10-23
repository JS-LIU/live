/**
 * Created by Liudq on 2019-08-10
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ringProgressStyle from "./ringProgressStyle.css";
export class RingProgressView extends Component{
    constructor(props) {
        super(props);
        let rightRotate = 225;
        let leftRotate = -135;
        let rate = this.props.nowProgress / this.props.totalProgress;
        let resultRate = (rate - 1/2);
        if(resultRate > 0){
            rightRotate = 405;
            leftRotate = -135;
            rightRotate += (360 * rate);
        }
        console.log("rate=========",rate);
        console.log("rightRotate:====:",rightRotate);
        this.unit = this.props.unit;
        this.circleProgressWrapperStyle = Object.assign({}, {
            width: this.props.size + this.unit,
            height: this.props.size + this.unit,
            border: this.props.borderWidth + this.unit + " solid " + this.props.borderBg
        });
        this.wrapperStyle = Object.assign({}, {
            width: parseFloat(this.props.size) / 2  + this.unit,
            height: parseFloat(this.props.size) + this.unit,
            top:"-" + this.props.borderWidth + this.unit
        });
        this.leftWrapperStyle = Object.assign({},this.wrapperStyle,{
            left:"-" + this.props.borderWidth + this.unit
        });
        this.rightWrapperStyle = Object.assign({},this.wrapperStyle,{
            right:"-" + this.props.borderWidth + this.unit
        });
        this.circleProgressStyle = Object.assign({}, {
            width:parseFloat(this.props.size) - parseFloat(this.props.borderWidth) * 2 + this.unit,
            height:parseFloat(this.props.size) - parseFloat(this.props.borderWidth) * 2 + this.unit,
            border:this.props.borderWidth + this.unit + " solid transparent"
        });
        this.rightCircleStyle = Object.assign({},this.circleProgressStyle,{
            borderTop:this.props.borderWidth + this.unit + " solid "+ this.props.progressBorderBg,
            borderRight:this.props.borderWidth + this.unit + " solid "+ this.props.progressBorderBg,
            right:0,
            transform:"rotate("+rightRotate+"deg)"
        });
        this.leftCircleStyle = Object.assign({},this.circleProgressStyle,{
            borderBottom:this.props.borderWidth + this.unit + " solid "+ this.props.progressBorderBg,
            borderLeft:this.props.borderWidth + this.unit + " solid "+ this.props.progressBorderBg,
            left:0,
            transform:"rotate("+leftRotate+"deg)"
        });
    //   r -135 start 45
    //     l 225 start
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className="ring_progress_main">
                <div className="circle_progress_wrapper" style={this.circleProgressWrapperStyle}>
                    <div className="wrapper" style={this.rightWrapperStyle}>
                        <div className="circle_progress" style={this.rightCircleStyle} />
                    </div>
                    <div className="wrapper" style={this.leftWrapperStyle}>
                        <div className="circle_progress"  style={this.leftCircleStyle}/>
                    </div>
                </div>
                {this.props.innerRender}
            </div>
        );
    }
}