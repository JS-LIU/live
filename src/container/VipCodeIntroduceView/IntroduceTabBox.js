/**
 * Created by Liudq on 2019/10/31
 */
import React, {Component} from 'react';
import introduceTabBoxStyle from './introduceTabBoxStyle.css';

export class IntroduceTabBox extends Component{
    constructor(props) {
        super(props);
        this.activeTab = this.props.match.params.vipCodeIntro;
        this.tabList = [
            {
                link:"/aboutUs",
                name:"关于我们",
                activity:false
            },
            {
                link:"/policy",
                name:"隐私政策",
                activity:false,
            },
            {
                link:"/userProtocol",
                name:"用户协议",
                activity:false,
            }
        ];
        let activeTab = this.tabList.find((item,index)=>{
            return item.link === "/"+this.activeTab
        });
        activeTab.activity = true;
        this.state = {
            tabList:this.tabList
        }
    }

    cutTab(tab){
        return ()=>{
            for(let i = 0;i < this.tabList.length;i++){
                this.tabList[i].activity = false;
                tab.activity = true;
            }
            this.setState({
                tabList:this.tabList
            });
            this.props.history.replace("/vipCodeIntroduce"+`${tab.link}`)
        }
    }
    render() {
        let tabNodes = this.tabList.map((item,index)=>{
            return (
                <div key={index}
                    className={`introduce_tab ${item.activity?"active_introduce_tab":null}`}
                    onClick={this.cutTab(item)}>
                    <span>{item.name}</span>
                </div>
            )
        });
        return (
            <div className="introduce_tab_box">
                <div className="introduce_tab_list">
                    {tabNodes}
                </div>
            </div>
        );
    }

}