/**
 * Created by Liudq on 2019-07-21
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import {Controlled as CodeMirror} from 'react-codemirror2';

export class CodingView extends Component{
    componentWillMount() {
        // console.log(Blockly)

    }

    componentDidMount() {
        var workspace = Blockly.inject('blocklyDiv',
            {toolbox: document.getElementById('toolbox')});
    }

    render() {
        // var workspace = Blockly.inject('blocklyDiv',
        //     {toolbox: document.getElementById('toolbox')});
        return(
            <div>
                <div id="blocklyDiv" style={{height: '480px', width: '600px'}}/>
                <xml id="toolbox" style="display: none">
                    <block type="controls_if" />
                    <block type="controls_repeat_ext"/>
                    <block type="logic_compare" />
                    <block type="math_number" />
                    <block type="math_arithmetic" />
                    <block type="text" />
                    <block type="text_print" />
                </xml>
            </div>
        )
    }
}