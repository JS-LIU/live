/**
 * Created by Liudq on 2019-07-22
 */

import {HB} from "../util/HB";
export let commonAjax = HB.ajax();
//  dev
commonAjax.setConfig({baseUrl:"/api"});
//  prod
// commonAjax.setConfig({baseUrl: "https://api-test.sscoding.com/api"});
