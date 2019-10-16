/**
 * Created by Liudq on 2019/10/15
 */
import React, {Component} from 'react';
import showToastStyle from './showToastStyle.css';
export class ShowToastView extends Component{
    constructor(props) {
        super(props);
        this.state={
            showTime:this.props.showTime,
            style:this.props.style,
            text:this.props.text
        }
    }
    hideToast(){
        this.props.hideToast();
    }
    componentDidMount() {
        let self = this;
        let t = setTimeout(function(){
            self.hideToast();
        },this.state.showTime);
    }

    render() {
        return (
            <div className="toast_dialog" style={this.state.style}>
                {this.state.text}
            </div>
        );
    }
}
