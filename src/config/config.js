/**
 * Created by Liudq on 2019-07-22
 */

import {HB} from "../util/HB";
export let commonAjax = HB.ajax();
//  dev
commonAjax.setConfig({baseUrl:"/api"});
//  prod
// commonAjax.setConfig({baseUrl: "https://api-test.sscoding.com/api"});
export let downloadAjax = HB.ajax();
downloadAjax.setConfig({baseUrl:"https://api-test.sscoding.com/api",responseType:"arraybuffer"});

class BaseUrl {
    constructor() {
        this.baseUrl = ""
    }
    setBaseUrl(baseUrl){
        this.baseUrl = baseUrl;
    }
    getBaseUrl(){
        return this.baseUrl
    }
}
export let baseUrl = new BaseUrl();