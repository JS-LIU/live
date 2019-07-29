/**
 * Created by Liudq on 2019-07-28
 */
export class Pagination {
    constructor(minmum,size){
        this.minmum = minmum;
        this.pageNum = minmum;
        this.size = size;
    }

    nextPage(){
        return this.pageNum++;
    }
    prePage(){
        if(this.pageNum > this.minmum){
            return this.pageNum--;
        }
    }
    to(pageNum){
        return this.pageNum = pageNum;
    }
}