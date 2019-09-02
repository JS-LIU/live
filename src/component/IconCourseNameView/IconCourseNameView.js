/**
 * Created by Liudq on 2019/9/2
 */
import React, {Component} from 'react';
export class IconCourseNameView extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={this.props.style}>
                {this.props.name}</div>
        );
    }


}
