/**
 * Created by Liudq on 2019/10/15
 */
import React, {Component} from 'react';
import {userService} from "../../service/UserService";
import couponListStyle from './couponListStyle.css';
export class CouponListView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            couponStatusList:userService.couponStatusManager.getCouponStatusStatus(),
            couponList: [],
        }
    }
    switchStatus(status){
        return ()=>{

            this.setState({
                couponStatusList: userService.couponStatusManager.cutCouponStatus(status.status)
            });
            userService.pagination.to(1);
            this.updateCouponList();
        }
    }
    componentDidMount() {
        this.setState({
            couponStatusList:userService.couponStatusManager.getCouponStatusStatus()
        });
        userService.pagination.to(1);
        this.updateCouponList();
    }
    updateCouponList(){
        userService.queryUserAccountCoupon().then((couponList)=>{
            this.setState({
                couponList: couponList
            })
        });
    }
    render() {
        let couponStatusNodes = this.state.couponStatusList.map((status,index)=>{
             return (
                 <div key={index}
                      className={`coupon_status_item 
                          ${status.selected?"selected_status":null} 
                          ${index===0?"selected_status_first":null} 
                          ${index===(this.state.couponStatusList.length-1)?"selected_status_last":null}`}
                      onClick={this.switchStatus(status)}>
                     {status.name}
                 </div>
             )
        });
        let couponList = this.state.couponList.map((couponItem,index)=>{
            return (<div className="coupon"
                         key={index}>
                {couponItem.couponStatus === 0?<div className="cant_use_coupon">
                    <div className="coupon_price">￥{couponItem.cash / 100}</div>
                    <div className="coupon_name">{couponItem.name}</div>
                    <div className="coupon_end_time">有效期至{couponItem.endTime}</div>
                    <div className="coupon_sub_limit">仅适用于正课</div>
                </div>:<div className="unselected_coupon">
                    <div className="coupon_price">￥{couponItem.cash / 100}</div>
                    <div className="coupon_name">{couponItem.name}</div>
                    <div className="coupon_end_time">有效期至{couponItem.endTime}</div>
                    <div className="coupon_sub_limit">仅适用于正课</div>
                </div>}
            </div>)
        });
        return (
            <div className="coupon_list_container">
                <div className="coupon_list_header">
                    <div className="coupon_list_title_left">优惠券</div>
                    <ul className="coupon_list_title_right">
                        {couponStatusNodes}
                    </ul>
                </div>
                <div className="coupon_list_body">
                    {this.state.couponList.length === 0?<div className="no_coupon_list">暂无优惠券</div>:
                        <ul className="coupon_list">
                            {couponList}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}