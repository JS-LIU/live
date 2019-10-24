/**
 * Created by Liudq on 2019-08-23
 */
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {HeaderView} from "../../component/HeaderView/HeaderView";
import {userService} from "../../service/UserService";
import {FooterView} from "../../component/FooterView/FooterView";
import {HB} from '../../util/HB';
import downLoadStyle from './downLoadStyle.css';

export class DownLoadView extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        HB.save.setStorage({redirect:"download"})
    }

    render() {
        return (
            <div>
                <HeaderView userInfo={userService.user.getUserInfo()}/>
                <div className="down_load_header">
                    <div className="down_load_btn_list">
                        <a href="https://download.vcode.vip/windows/Vcode_student_setup_win.exe" className="windows_down_load_btn">Windows下载</a>
                        <a href="https://download.vcode.vip/mac/%E6%9C%AA%E7%A7%91%E7%BC%96%E7%A8%8B.dmg" className="mac_down_load_btn">Mac下载</a>
                    </div>
                </div>
                <div className="down_load_sec_1">
                    <div className="down_load_sec_1_title">
                        推荐公众号、小程序
                    </div>
                    <ul className="down_load_sec_1_recommend_list">
                        <li className="recommend_item">
                            <div className="subscription_item_title">未科编程服务号</div>
                            <div className="recommend_item_info">
                                <span>孩子学习动态实时掌握，上课提醒，</span>
                                <span>作业查看，学习报告等即时获取。</span>
                            </div>
                        </li>
                        <li className="recommend_item">
                            <div className="server_code_item_title">未科编程小程序</div>
                            <div className="recommend_item_info">
                                <span>事实掌握课程信息、订单信息、优惠</span>
                                <span>信息；最新上线课程快速掌握。</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <FooterView />
            </div>
        );
    }
}