/**
 * Created by 殿麒 on 2016/6/28.
 */

/**
 *  HB.obj
 *      HB.obj.toEquals
 *      HB.obj.isEmpty
 *  HB.resource
 *      HB.resource.query()
 *      HB.resource.save()
 *  HB.valid
 *      HB.valid.toPhoneNum
 *  HB.ui
 *      HB.ui.scrollToTheBottom
 *  HB.url
 *      HB.url.getBaseUrl
 *      HB.url.getKey
 *      HB.url.history
 *  HB.save
 *      HB.save.storage
 *  HB.CSS3
 *  HB.slide
 *      HB.slide.left
 *  HB.design
 *      HB.design.chain
 */
export let HB = window.HB || {};
HB.obj = (function(){

    //  判断obj1中是否有obj2中的所有属性
    const toEquals = function (obj1, obj2) {
        let flag = true;
        for (const prop in obj2) {

            if (obj1[prop] !== obj2[prop]) {
                flag = false;
                break;
            }
        }
        return flag;

    };

    //  用途：是否为空对象
    const isEmpty = function (obj) {
        const arr = Object.keys(data);
        return arr.length === 0;
    };
    let isArray = function isArray(o) {
        return Object.prototype.toString.call(o) === "[object Array]";
    };
    //  判断是否为"",null,{} 如果是返回true,否则返回false
    const isNothing = function(arg){

        if(arg === null){
            return true;
        }
        if(arg === ""){
            return true;
        }
        if(arg === undefined){
            return true
        }
        if(Object.prototype.toString.call(arg) === "[object Object]" && isEmpty(arg)){
            return true;
        }
    };


    return {
        isNothing:isNothing,
        toEquals:toEquals,
        isEmpty:isEmpty,
        isArray:isArray
    }

})();
HB.ajax = function(){
    //  创建请求的模板类
    class AbstractSendAjax{
        constructor(url,config,headerInfo){
            this.urlFactory = new UrlFactory(url);
            this.config = config.ajaxConfig;
            this.headerInfo = headerInfo;
        }
        getUrl(replaceUrlObj){
            this.url = this.config.baseUrl + this.urlFactory.getUrl(replaceUrlObj)
        }
        createXHR(){
            this.xhr = new XMLHttpRequest();
        }
        setAsync(){
            this.async = this.config.async;
        }
        getHeader(){
            this.header = this.config.requestHeader.header;
        }
        getHeaderValue(){
            this.value = this.config.requestHeader.value;
        }

        openXHR(){
            return new Error('请重写openXHR');
        }
        isSetRequestHeader(){
            return true;
        }
        setRequestHeader(){
            return new Error('请重写setRequestHeader');
        }
        setResponseType(){
            this.xhr.responseType = this.config.responseType;
        }
        isSend(){
            return true;
        }
        send(data){
            this.xhr.send(JSON.stringify(data));
        }
        success(resolve){
            if(this.xhr.readyState === 4 && this.xhr.status === 200){
                return resolve(this.xhr.response);
            }
            return "nextSuccessor";

        }
        fail(reject){
            if(this.xhr.readyState === 4 && this.xhr.status !== 200){
                return reject(this.xhr.response);
            }
            return "nextSuccessor";

        }
        waitStateChange(){
            if(this.xhr.readyState !== 4){
                return "nextSuccessor";
            }
        }
        getResponse(){
            let self = this;
            return new Promise((resolve, reject)=>{
                this.xhr.onreadystatechange = function(){
                    if (self.xhr.readyState === 4 && self.xhr.status === 200) {
                        resolve(self.xhr.response);
                    }else if(self.xhr.readyState === 4 && self.xhr.status !== 200){
                        reject(self.xhr.response);
                    }
                }
            })
        }

        initAjax(replaceUrlObj, data){
            this.getUrl(replaceUrlObj);
            this.setAsync();
            this.createXHR();
            this.getHeader();
            this.getHeaderValue();
            this.openXHR();
            if(this.isSetRequestHeader()){
                this.setRequestHeader(this.headerInfo);
            }
            this.setResponseType();
            if(this.isSend() && data){
                this.send(data);
            }
            return this.getResponse()
        }
    }
    class Post extends AbstractSendAjax{
        constructor(url,config,headerInfo){
            super(url,config,headerInfo);
        }
        openXHR(){
            this.xhr.open("post",this.url,this.async);
        }
        setRequestHeader(){
            this.xhr.setRequestHeader(this.header,this.value);
            if(this.headerInfo){
                this.xhr.setRequestHeader(this.headerInfo.name,this.headerInfo.value)
            }

        }

    }
    class Query extends AbstractSendAjax{
        constructor(url,config){
            super(url,config);
        }
        openXHR(){
            this.xhr.open("get",this.url,this.async);
        }
        isSetRequestHeader(){
            return false;
        }
    }

    //  url加工厂
    class UrlFactory{
        constructor(templateUrl) {
            this.templateUrl = templateUrl + "/";
        }
        getUrl(replaceUrlObj) {
            let url = this.templateUrl;
            for (let p in replaceUrlObj) {
                url = url.replace("/:" + p + "/", "/" + replaceUrlObj[p] + "/");
            }
            return url.substr(0, url.length - 1);
        }
    }


    //  请求方式
    class Resource{
        constructor(url,config) {
            this.url = url;
            this.config = config;
        }
        query(replaceUrlObj,data={}) {
            let query = new Query(this.url,this.config);
            return query.initAjax(replaceUrlObj,data);
        }
        save(replaceUrlObj, data,headerInfo) {
            let post = new Post(this.url,this.config,headerInfo);
            return post.initAjax(replaceUrlObj, data,headerInfo);
        }
    }

    /**
     * 配置
     * baseURL:string 基础url 被加在所有请求地址前
     * ansyn:bool 是否异步（由于使用promise接收返回值是否异步已经不在有影响）
     * requestHeader:object 设置请求头
     * responseType:string 返回值类型json text html arraybuffer
     */
    class Config{
        constructor(ajaxConfig){
            this.ajaxConfig = Object.assign({baseUrl:"",async:true,requestHeader:{
                    header:"Content-type",
                    value:"application/json; charset=utf-8",
                },responseType:"json"},ajaxConfig);
        }
    }
    class Ajax{
        constructor(){
            this.config = new Config({});
        }
        setConfig(ajaxConfig){
            this.config = new Config(ajaxConfig)
        }
        resource(url){
            return new Resource(url,this.config);
        }
    }

    return new Ajax();
};

HB.valid = (function(){
    /*
    *   用途：按一定规则分割字符串
    *   第1个参数是分割哪个字符串 比如：18801233565
    *   第2个参数是每隔多少个字符分割 比如：18801233565 分成 188 0123 3565 就传[3,4,4]
    *   第3个参数是用什么来分割 比如：18801233565 分成 188-0123-3565 就传'-'
    * */

    function validNum(num,arr,str){
        let myNum = num.split(str).join("");
        let newPhoneNum = [];
        for(let i = 0;i < arr.length;i++){
            let newNum = myNum.slice(0,arr[i]);
            newPhoneNum.push(newNum);
            myNum = myNum.substr(arr[i]);
        }
        return newPhoneNum.join(str).trim();
    }
    function validPhoneNum(phoneNum){
        return phoneNum.length === 11;
    }
    function isPhoneAvailable(phoneNum) {
        let myReg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myReg.test(phoneNum)) {
            return false;
        } else {
            return true;
        }
    }

    //  用途：将字符串中所有空格删除
    function trimAllBlank(str){
        return str.replace(/\s/g, "");
    }

    //  用途：将数字转换成字符串
    function parseString(i){
        return i+"";
    }

    //  用途：将字符串转换为数组
    function parseArr(str){
        return str.split('');
    }

    //  用途：将阿拉伯数子转换为汉字
    function parseChinese(number){
        let chinese = ['零','一','二','三','四','五','六','日','八','九'];
        let arrNumber = parseArr(parseString(number));
        let chineseNumber = "";

        return arrNumber.map((item,index)=>{
            chineseNumber += chinese[item];
            return chineseNumber;
        });
    }

    //  将星期几转换成汉字的
    function parseDay(day){
        let myDay = day;
        if(day === 0){
            myDay = 7;
        }
        return parseChinese(myDay);

    }
    function addTimeToDay(day,time,format){
        if(checkFormatTime(format,day)){
            return day + time;
        }
        return null;
    }
    //  todo 临时校验 改为正则校验规则
    function checkFormatTime(format,day){
        return day.length === 10;
    }

    return {
        validNum:validNum,
        trimAllBlank:trimAllBlank,
        parseString:parseString,
        parseArr:parseArr,
        parseChinese:parseChinese,
        parseDay:parseDay,
        validPhoneNum:validPhoneNum,
        addTimeToDay:addTimeToDay,
        isPhoneAvailable:isPhoneAvailable
    }

})();

HB.ui = (function(){
    //  是否移动到底部
    // var scrollToTheBottom = function(func){
    //     $(window).bind("scroll",function(){
    //         var $_scrollTop = $(this).scrollTop();
    //         var $_scrollHeight = $(document).height();
    //         var $_windowHeight = $(this).height();
    //         if($_scrollTop + $_windowHeight === $_scrollHeight){
    //             func();
    //         }
    //     });
    // };
    //  滚动条在Y轴上的滚动距离

    let scrollTop = function(number = 0, time){
        if (!time) {
            document.body.scrollTop = document.documentElement.scrollTop = number;
            return number;
        }
        const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
        let spacingIndex = time / spacingTime; // 计算循环的次数
        let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
        let everTop = (number - nowTop) / spacingIndex; // 计算每次滑动的距离
        let scrollTimer = setInterval(() => {
            if (spacingIndex > 0) {
                spacingIndex--;
                scrollTop(nowTop += everTop);
            } else {
                clearInterval(scrollTimer); // 清除计时器
            }
        }, spacingTime);
    };

    let getScrollTop = function(){
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
            bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    };

    //  文档的总高度
    let getScrollHeight = function(){
        let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    };

    //浏览器视口的高度
    let getWindowHeight = function (){
        let windowHeight = 0;
        if(document.compatMode === "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        }else{
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    };
    //  是否移动到底部
    let scrollToTheBottom = function(func){
        window.onscroll = function(){
            if(getScrollTop() + getWindowHeight() === getScrollHeight()){
                func();
            }
        };
    };
    //  是否有滚动条
    let hasScrollbar = function() {
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
    };


    const setBaseFontSize = function(designWidth,rem2px){
        var d = window.document.createElement('div');
        d.style.width = '1rem';
        d.style.display = "none";
        var head = window.document.getElementsByTagName('head')[0];
        head.appendChild(d);
        var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
        d.remove();
        document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
        console.log(document.documentElement.style.fontSize);
        var st = document.createElement('style');
        var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
        var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
        // var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((designWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
        // var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((designWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";

        st.innerHTML = portrait + landscape;
        head.appendChild(st);
        return defaultFontSize
    };
    const parsePx = function(){
        let d = window.document.createElement('div');
        d.style.width = '1rem';
        d.style.display = "none";
        let head = window.document.getElementsByTagName('head')[0];
        head.appendChild(d);
        let rate = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
        d.remove();
        return rate;
    };
    return {
        scrollToTheBottom:scrollToTheBottom,
        setBaseFontSize:setBaseFontSize,
        parsePx:parsePx,
        hasScrollbar:hasScrollbar,
        getScrollTop:getScrollTop,
        scrollTop:scrollTop
    }
})();

HB.url = (function(){

    const getBaseUrl = function () {
        const host = window.location.host;
        let contextPath = document.location.pathname;
        const index = contextPath.substr(1).indexOf("/");
        contextPath = contextPath.substr(0, index + 1);
        return "http://" + host + contextPath;
    };

    const getSearchKey = function (name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        const r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    const getSearchKeyByLocationSearch = function (locationSearch,name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        const r = locationSearch.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    const getHashKey = function (name) {
        const reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
        const r = window.location.hash.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    //  从哪个URL之前的所有URL都要 （之后的不要）第二个参数就是来标记从哪开始之后的URL都不要（包括第二个参数在内）
    const setBrowserHistoryFromBefore = function (urls, url) {
        let urlIndex = urls.indexOf(url);
        let last = urlIndex + 1;
        urls.splice(last);
        for (let i = 0; i < urls.length; i++) {
            const setUrl = "#" + urls[i];
            history.pushState({}, "", setUrl);
        }
    };

    return {
        getBaseUrl:getBaseUrl,
        getSearchKey:getSearchKey,
        getHashKey:getHashKey,
        setBrowserHistoryFromBefore:setBrowserHistoryFromBefore,
        getSearchKeyByLocationSearch:getSearchKeyByLocationSearch
    }
})();

HB.save = (function(){

    const setStorage = function(obj){
        for(let prop in obj){
            localStorage[prop] = obj[prop];
        }
    };
    function isQuotaExceeded(e) {
        let quotaExceeded = false;
        if(e) {
            if(e.code) {
                switch(e.code) {
                    case 22:
                        quotaExceeded = true;
                        break;
                    case 1014: // Firefox
                        if(e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            quotaExceeded = true;
                        }
                        break;
                }
            } else if(e.number === -2147024882) { // IE8
                quotaExceeded = true;
            }
        }
        return quotaExceeded;
    }
    function setLocalStorageByLimitTime(key, value) {
        let curTime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
        let valueDate = JSON.stringify({
            val: value,
            timer: curTime
        });
        try {
            localStorage.setItem(key, valueDate);
        } catch(e) {
            // 兼容性写法
            if(isQuotaExceeded(e)) {
                console.log("Error: 本地存储超过限制");
                localStorage.clear();
            } else {
                console.log("Error: 保存到本地存储失败");
            }
        }
    }
    function getLocalStorageByLimitTime(key) {
        let exp = 60 * 60 * 1000; // 1个小时
        if(localStorage.getItem(key)) {
            let vals = localStorage.getItem(key); // 获取本地存储的值
            let dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
            console.log("dataObj:===",dataObj);
            console.log(new Date().getTime());
            // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
            let isTimed = (new Date().getTime() - dataObj.timer) > exp;
            if(isTimed) {
                console.log("存储已过期");
                localStorage.removeItem(key);
                return null;
            }
            return dataObj.val;
        } else {
            return null;
        }
    }
    return {
        setStorage:setStorage,
        setLocalStorageByLimitTime:setLocalStorageByLimitTime,
        getLocalStorageByLimitTime:getLocalStorageByLimitTime
    }
})();

HB.loading = (function(){
    // const picLoad = function (picArr, baseUrl = "") {
    //     let successCounter = 0;
    //     let isSuccess = false;
    //     for (let i = 0; i < picArr.length; i++) {
    //         const url = baseUrl + picArr[i];
    //         $.ajax({
    //             type: 'GET',
    //             url: url,
    //             async: false
    //         }).done(function () {
    //             console.log("加在成功");
    //             successCounter++;
    //         });
    //     }
    //     if (successCounter === picArr.length) {
    //         isSuccess = true;
    //     }
    //     return isSuccess;
    // };

    return {
        // picLoad:picLoad
    }
})();
HB.load = function(arr,func){
    for(let i = 0;i < arr.length;i++){
        if(arr[i] === false){
            alert("未连接到网络 请重新尝试");
            return false;
        }
    }
    func();
};


HB.CSS3 = (function () {

    const getCSS3PropsVal = function(name){
        let prop = "";
        for(let i = name.length - 1;i >= 0;i-- ){
            prop += name[i];
            if(name[i] === "("){
                return prop.split("").reverse().join("");
            }
        }
    };
    const toArray = function(name){
        let css3PropsVal = getCSS3PropsVal(name);
        let prop = "";
        let propArrIndex = 0;
        const propArr = [];

        css3PropsVal = css3PropsVal.substr(1);
        css3PropsVal = css3PropsVal.replace(/\)/g, ",");

        for(let i = 0; i < css3PropsVal.length;i++){
            if(css3PropsVal[i] !== ","){
                prop += css3PropsVal[i];
            }else{
                propArr[propArrIndex] = prop;
                prop = "";
                propArrIndex+=1;
            }
        }
        return propArr;
    };

    const replaceProp = function(name,i,replaceVal){
        const propArr = toArray(name);
        let newCSS3 = "";

        propArr[i] = replaceVal;
        const valStr = propArr.join(',');

        for(let i = 0;i < name.length;i++){

            if(name[i] !== "("){
                newCSS3 += name[i];
            }else{
                return newCSS3 += ("(" + valStr +")");
            }
        }
    };

    return {
        getCSS3PropsVal:getCSS3PropsVal,
        toArray:toArray,
        replaceProp:replaceProp
    }
})();

HB.slide = function(str,func){
    // var touchStart_x = 0,
    //     touchEnd_x = 0,
    //     touchStart_y = 0,
    //     touchEnd_y = 0;
    //
    // const left = function(){
    //     if(str === 'left'&&touchStart_x - touchEnd_x > 0 ){
    //         console.log('left');
    //         func();
    //     }
    // };
    // const right = function(){
    //     if(str === 'right'&&touchStart_x - touchEnd_x < 0 ){
    //         console.log('right');
    //         // func();
    //     }
    // };
    //
    // $('body').bind("touchstart",function(e){
    //     touchStart_x = e.touches[0].clientX;
    //     touchStart_y = e.touches[0].clientY;
    // });
    // $('body').bind("touchend",function(e){
    //     touchEnd_x = e.changedTouches[0].clientX;
    //     touchEnd_y = e.changedTouches[0].clientY;
    //     return {
    //         left:left(),
    //         // right:right(),
    //         // up:up(),
    //         // down:down()
    //     };
    //
    // });
};

HB.design = (function(){

    class Chain{
        constructor(fn){
            this.fn = fn;
            this.success = null;
        }
        setNextSuccessor( successor ){
            return this.successor = successor;
        };
        passRequest(){
            let ret = this.fn.apply(this,arguments);
            if ( ret === 'nextSuccessor' ){
                return this.successor && this.successor.passRequest.apply( this.successor, arguments );
            }
            return ret;
        }
    }



    return {
        Chain:Chain,
    }

})();

Function.prototype.after = function(fn) {
    let self = this;
    return function() {
        let ret = self.apply(this, arguments);
        if (ret === "nextSuccessor") {
            return fn.apply(this,arguments);
        }
        return ret;
    }
};
Function.prototype.before = function( beforefn ){
    let __self = this;
    return function(){
        beforefn.apply( this, arguments );
        return __self.apply( this, arguments );
    }
};
Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
};
