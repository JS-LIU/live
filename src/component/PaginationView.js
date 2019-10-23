/**
 * Created by Liudq on 2019-08-07
 */
import React, {Component} from 'react';
import {orderService} from "../service/OrderService";
export class PaginationView extends Component{
    constructor(props) {
        super(props);
        this.showPageSize = this.props.showPageSize;
        this.startPage = this.props.startPage;
        this.totalPageSize = this.props.totalPageSize;
        this.showList = [this.props.startPage];
        this.state = {
            toPage:this.startPage
        };
    }

    onChangePage(pageNum){
        return ()=>{
            if(pageNum < 1 || pageNum > this.props.totalPageSize){
                return null;
            }

            this.setState({
                toPage:pageNum,
            });
            this.props.onChangePage(pageNum);
        }
    }
    nextPage(toPage){

    }
    prePage(toPage){
        if(toPage === this.showList[0]){
            let list = [];
            let end = toPage;
            if(end < this.showPageSize){
                end = this.showPageSize;
            }
            for(let i = this.getMinPage(toPage);i <= end;i++){
                list.push(i);
            }
            this.showList = list;
            return this.showList;
        }
    }
    getShowList(toPage){

        if(toPage === this.showList[this.showList.length-1] && this.showList.length > 1){
            let list = [];
            let start = toPage;

            if(this.getMaxPage(toPage) - toPage < this.showPageSize){
                start = this.getMaxPage(toPage) - this.showPageSize;
            }
            console.log(start,this.getMaxPage(toPage));
            for(let i = start;i < this.getMaxPage(toPage);i++){
                list.push(i);
            }
            console.log(list);
            this.showList = list;
            return this.showList;
        }
        return this.showList;
    }
    getMinPage(toPage){
        return (toPage - this.showPageSize) >= 1 ? (toPage - this.showPageSize + 1) : 1;
    }
    getMaxPage(toPage){
        return (toPage + this.showPageSize) > this.props.totalPageSize ? this.props.totalPageSize + 1:(toPage + this.showPageSize);
    }
    getPageNodes(){
        this.startPage = this.props.startPage;
        let list = this.getShowList(this.state.toPage);
        return list.map((item,i)=>{
            return (
                <div key={i} style={this.state.toPage === item ? page_item_active : page_item} onClick={this.onChangePage(item)}>
                    {item}
                </div>
            )
        });
    }
    render() {


        return (
            <div style={paginationBox}>
                <div style={pageBtn} onClick={this.onChangePage(this.state.toPage - 1)}>上一页</div>
                <div style={page_item_list}>
                    {this.getPageNodes()}
                </div>
                <div style={pageBtn} onClick={this.onChangePage(this.state.toPage + 1)}>下一页</div>
            </div>
        );
    }
}

