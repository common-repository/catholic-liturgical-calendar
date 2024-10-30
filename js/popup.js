//document.title=chrome.i18n.getMessage("extname");//Stop script from changing the title of the webpage

var ddat=new Date();
var year=ddat.getFullYear();


//var ho=new Date(2012,11,7);//adviento
//var ho=new Date(2013,11,26);//navidad
//var ho=new Date(2013,0,26);//tiempo ordinario 1
//var ho=new Date(2013,2,25);//cuaresma
//var ho=new Date(2013,4,1);//pascua
//var ho=new Date(2013,7,10);//tiempo ordinario 2   

var p=[];
    p.target="cathlits";
    p.radius=cathlit_getradius();
    p.ho=new Date(ddat.getFullYear(),ddat.getMonth(),ddat.getDate());
    p.tr={
        lang:chrome.i18n.getMessage("l"),
        week:chrome.i18n.getMessage("week"),
        days:chrome.i18n.getMessage("days"),
        month:chrome.i18n.getMessage("month"),
        event:chrome.i18n.getMessage("event"),
        prefix:chrome.i18n.getMessage("urlprefix"),
        cyna:{
            adv:chrome.i18n.getMessage("adv"),
            nav:chrome.i18n.getMessage("nav"),
            ord1:chrome.i18n.getMessage("ord1"),
            cua:chrome.i18n.getMessage("cua"),
            pas:chrome.i18n.getMessage("pas"),
            ord2:chrome.i18n.getMessage("ord2")
        },
        special_dates_text:{
            today:chrome.i18n.getMessage("today"),
            palmsun:chrome.i18n.getMessage("palmsun"),
            goodfri:chrome.i18n.getMessage("goodfri"),
            penteco:chrome.i18n.getMessage("penteco")
        },
        mnames:[
            chrome.i18n.getMessage("m1"),
            chrome.i18n.getMessage("m2"),
            chrome.i18n.getMessage("m3"),
            chrome.i18n.getMessage("m4"),
            chrome.i18n.getMessage("m5"),
            chrome.i18n.getMessage("m6"),
            chrome.i18n.getMessage("m7"),
            chrome.i18n.getMessage("m8"),
            chrome.i18n.getMessage("m9"),
            chrome.i18n.getMessage("m10"),
            chrome.i18n.getMessage("m11"),
            chrome.i18n.getMessage("m12")
        ],
        dnames:[
            chrome.i18n.getMessage("d1"),
            chrome.i18n.getMessage("d2"),
            chrome.i18n.getMessage("d3"),
            chrome.i18n.getMessage("d4"),
            chrome.i18n.getMessage("d5"),
            chrome.i18n.getMessage("d6"),
            chrome.i18n.getMessage("d7")
        ]
};
var cathlit=new CathLit();
    cathlit.p=p;
    cathlit.open=function(u){chrome.tabs.create({url:u});};
var dt=cathlit.create();

var anionum=((year%3===0)?3:Math.ceil(year%3));
var anios=["","A","B","C"];
var atipo=anios[anionum];
var ddst=p.ho.toISOString().substring(0,10);

var mgd=document.getElementById("cathlitgadgetd");
    mgd.style.textAlign="center";
    mgd.innerHTML='<div id="date"></div>';

document.body.style.backgroundColor="white";
//document.body.style.backgroundImage="url(images/t/"+dt.t[tr.ho.getTime()]+".jpg)";
document.body.style.backgroundRepeat="no-repeat";

var ah1=document.createElement("a");
var h1=document.createElement("h1");
    h1.appendChild(document.createTextNode(chrome.i18n.getMessage("lity")+' "'+atipo+'" '+ dt.c));
var href="http://www.vercalendario.info/"+cathlit.to_ascii(chrome.i18n.getMessage("l")+"/"+chrome.i18n.getMessage("event")+"/"+chrome.i18n.getMessage("urlprefix")+"-"+chrome.i18n.getMessage("year")+"-"+chrome.i18n.getMessage("calendar")+"-"+year)+".html";
    ah1.href=href;
    ah1.onclick=function(){
        cathlit.open(this.href);
    };
    ah1.appendChild(h1);
var h3=document.createElement("h3");
    h3.className=dt.t[p.ho.getTime()];
    h3.appendChild(document.createTextNode(chrome.i18n.getMessage("today")+': '+ddst+' - '+chrome.i18n.getMessage(""+dt.t[p.ho.getTime()])));
var ah3=document.createElement("a");
    ah3.href='http://www.vercalendario.info/'+chrome.i18n.getMessage("todayurl");
    ah3.onclick=function(){
        cathlit.open(this.href);
    };
    ah3.appendChild(h3);
mgd.appendChild(ah1);
mgd.appendChild(ah3);


setTimeout(
    function(e){
        show_cathlit(e);
    },1000,document.getElementById(cathlit.p.target));


var t1=null;
function show_cathlit(e){
    if(e.style.opacity < 0.9){
        e.style.opacity=(e.style.opacity*1)+0.05;
        t1=setTimeout(function(e){show_cathlit(e);}, 100, e);
    }else{
        clearTimeout(t1);
    }
}
