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
        HB.save.setStorage({redirect:"home"})
    }

    render() {
        return (
            <div>
                <HeaderView userInfo={userService.getUser().userInfo}/>
                <div className="down_load_header">
                    <ul className="down_load_btn_list">
                        <li className="windows_down_load_btn">Windows下载</li>
                        <li className="mac_down_load_btn">Mac下载</li>
                    </ul>
                </div>
                <div className="down_load_sec_1">
                    <div className="down_load_sec_1_title">
                        推荐公众号、小程序
                    </div>
                    <ul className="down_load_sec_1_recommend_list">
                        <li className="recommend_item">
                            <div className="subscription_item_title">松鼠编程订阅号</div>
                            <div className="recommend_item_info">
                                <span>剑桥考试考官，TKT满分证书持有</span>
                                <span>者，教学风格风趣幽默,精通学习规</span>
                                <span>律，善用六步教学法、带领孩子在探</span>
                                <span> 索中学习新知。</span>
                            </div>
                        </li>
                        <li className="recommend_item">
                            <div className="server_code_item_title">松鼠编程订阅号</div>
                            <div className="recommend_item_info">
                                <span>剑桥考试考官，TKT满分证书持有</span>
                                <span>者，教学风格风趣幽默,精通学习规</span>
                                <span>律，善用六步教学法、带领孩子在探</span>
                                <span> 索中学习新知。</span>
                            </div>
                        </li>
                        <li className="recommend_item">
                            <div className="miniprogram_item_title">松鼠编程服务号</div>
                            <div className="recommend_item_info">
                                <span>剑桥考试考官，TKT满分证书持有</span>
                                <span>者，教学风格风趣幽默,精通学习规</span>
                                <span>律，善用六步教学法、带领孩子在探</span>
                                <span> 索中学习新知。</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <FooterView />
            </div>
        );
    }
}