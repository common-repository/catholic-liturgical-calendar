/**
 * 
 * This Javascript library was created by engineers from www.vercalendario.info. 
 * Copyright 2013 www.vercalendario.info. All rights reserved
 */
var chrome=new Object();
    chrome.radius=200;
    chrome.tabs=new Object();
    chrome.tabs.create=function(o){
        if(typeof o === "string"){
            window.open(o);
        }else{window.open(o.url);}
    };
    chrome.i18n=new Object();
    chrome.i18n.chrome=chrome;
    chrome.i18n.getMessage=function(s){
        return this.chrome.tr[s].message;
        //return "a";
    };
