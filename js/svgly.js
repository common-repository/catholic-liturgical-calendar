var CathLit=function(){
    this.p=null;
};
CathLit.prototype={
    
    open:function(u){
        window.open(u);
    },
    create:function(){
        var angle=0;
        var data=[];
        var y=this.p.ho.getFullYear();
        var dradius=this.p.radius*0.70;
        var wradius=this.p.radius*0.80;
        var mradius=this.p.radius*0.90;
        var cradius=this.p.radius*0.95;
        var cx=this.p.radius;
        var cy=this.p.radius;
        var host="http://www.vercalendario.info/";
        var self=this;
        function e(n){
            return document.createElementNS("http://www.w3.org/2000/svg",n);
        }
        function a(e,an,av){
            e.setAttributeNS(null,an,av);
        }
        function a2(e,an,av,ns){
            e.setAttributeNS(ns?ns:null,an,av);
        }
        function getWeekNumberSun(d) {
            
            
            d.setHours(0,0,0);
            
            
            d.setDate(d.getDate() + 0 - (d.getDay()||7));
            
            var yearStart = new Date(d.getFullYear(),0,1);
            
            var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
            
            return [d.getFullYear(), weekNo];
        }

        
        function easter(Y) {var C = Math.floor(Y/100);var N = Y - 19*Math.floor(Y/19);var K = Math.floor((C - 17)/25);var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;I = I - 30*Math.floor((I/30));I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);J = J - 7*Math.floor(J/7);var L = I - J;var M = 3 + Math.floor((L + 40)/44);var D = L + 28 - 31*Math.floor(M/4);return new Date(Y,M-1,D);}
        function d(i){return document.getElementById(i);}

        
        var find_adv=function(y){
            var chr=new Date(y-1, 11, 25);
            var advday=chr;
            var c=0;
            var cc=0;
            while( true ){
                if(cc>0&&advday.getDay()===0){
                    ++c;
                }
                if(c>=4){break;}
                advday.setDate(advday.getDate()-1);

                if(cc > 1000){break;}
                cc++;
            }return advday;
        };
        var adv1=find_adv(y);
        var adv2=find_adv(y+1);
        if(this.p.ho.getTime()>=adv2.getTime()){
            
            data["c"]=y+"-"+(y+1);
            ++y;
            adv1=adv2;
            adv2=find_adv(y+1);
        }else{
            data["c"]=(y-1)+"-"+y;
        }
        var temp=new Date(adv1.getTime());
        var days=0;
        var doffset=0;
        var ti="adv";
        var day_lit_hash=[];
        var end_ti_hash=[];
        var end_ti_dcount=1;
        var su=0;
        var easter_sunday=easter(y);
        var ash_wednesday=new Date(easter_sunday.getTime());
            ash_wednesday.setDate(ash_wednesday.getDate() - 47);
        var pentecost=new Date(easter_sunday.getTime());
            pentecost.setDate(pentecost.getDate() + 49);
        var epiphany=new Date(y,0,6);
        var lastchr=new Date(y-1, 11, 25);
        var mul=0;
        if(!d("cathlits")){mul++;}


        while(temp.getTime() < adv2.getTime()){
            if(temp.getTime() === this.p.ho.getTime()){
                doffset=days;
            }

            day_lit_hash[temp.getTime()]=ti;

            if(temp.getDay()===0){
                    ++su;
            }

            if(temp.getTime() === pentecost.getTime()){
                end_ti_hash[temp.getTime()]={cycle:"pas",daycount:end_ti_dcount};
                end_ti_dcount=0;
                ti="ord2";
                su=0;
            }else if(temp.getTime() === easter_sunday.getTime()){
                end_ti_hash[temp.getTime()]={cycle:"cua",daycount:end_ti_dcount};
                end_ti_dcount=0;
                ti="pas";
                su=0;
            }else if(temp.getTime() === ash_wednesday.getTime()){
                end_ti_hash[temp.getTime()]={cycle:"ord1",daycount:end_ti_dcount};
                end_ti_dcount=0;
                ti="cua";
                su=0;
            }else if(ti==="adv"){
                if(temp.getTime() === lastchr.getTime()){
                    end_ti_hash[temp.getTime()]={cycle:"adv",daycount:end_ti_dcount};
                    end_ti_dcount=0;
                    ti="nav";
                    su=0;
                }
            }else if(ti==="nav"){
                if((temp.getTime() > epiphany.getTime()) && temp.getDay()===0){
                    end_ti_hash[temp.getTime()]={cycle:"nav",daycount:end_ti_dcount};
                    end_ti_dcount=0;
                    ti="ord2";
                    su=0;
                }
            }

            temp.setDate(temp.getDate()+1);
            days++;
            end_ti_dcount++;
        }

        end_ti_hash[new Date(adv2.getTime()).setDate(adv2.getDate()-1)]={cycle:"ord2",daycount:end_ti_dcount-1};
        data["t"]=day_lit_hash;

        

        var palmsunday=new Date(easter_sunday.getTime());
            palmsunday.setDate(palmsunday.getDate()-7);
        var goodfriday=new Date(easter_sunday.getTime());
            goodfriday.setDate(goodfriday.getDate()-2);

        var special_dates=[];
            special_dates[palmsunday.getTime()]="palmsun";
            special_dates[goodfriday.getTime()]="goodfri";
            special_dates[pentecost.getTime()]="penteco";
            special_dates[this.p.ho.getTime()]="today";
            
        
        var incre=360/days;
        temp=new Date(adv1.getTime());
        var currentmonth=temp.getMonth();
        var daycount=0;
        var dparr=[];
        var wparr=[];
        var mparr=[];
        var cparr=[];

        var wtarr=[];
        var mtarr=[];
        var ctarr=[];
        var defs=e("defs");

        function createweekpath(daycount, temp){
            

                
                var tempminus1=new Date(temp.getTime());
                    tempminus1.setDate(tempminus1.getDate()-1);
                var vals=getWeekNumberSun(tempminus1);
                var wnum=vals[1];
                var wy=vals[0];
                var wp=e("path");
                a(wp,"class","w-w w-"+wnum);
                

                x1deg=(angle-(basedeg+(daycount*incre)));
                x2deg=(angle-(basedeg));

                var x1=(cx+wradius*Math.cos(x1deg*Math.PI/180));
                var y1=(cy+wradius*Math.sin(x1deg*Math.PI/180));
                var x2=(cx+wradius*Math.cos(x2deg*Math.PI/180));
                var y2=(cy+wradius*Math.sin(x2deg*Math.PI/180));
                a(wp,"d",
                         "M "+cx+" "+cy
                         +" L "+x1+" "+y1
                         +" A "+wradius+" "+wradius+" 0 0 1 " +x2+" "+y2
                         +" z"
                );

                
                var tpdef=e("path");
                a(tpdef,"id","wtp"+wnum+"-"+wy);
                a(tpdef,"d","M "+x1+" "+y1+" A "+wradius+" "+wradius+" 0 0 1 " +x2+" "+y2);
                defs.appendChild(tpdef);

                var te=e("text");
                    te.wnum=vals[1];
                    te.wy=vals[0];
                a(te,"class", "wte");
                a(te,"dy","20px");


                    te.onmouseover=function(){
                        var e=d("text_info");
                        while(e.firstChild){
                            e.removeChild(e.childNodes[0]);
                        }

                        var text_info=document.createTextNode(self.p.tr.week+" "+this.wnum+" [ "+this.wy+" ]");
                        e.appendChild(text_info);
                    };
                var tp=e("textPath");
                a(tp,"startOffset","50%");
                a(tp,"class","wtp");
                a2(tp,"xlink:href", "#wtp"+wnum+"-"+wy,"http://www.w3.org/1999/xlink");

                var tsp=e("tspan");
                a(tsp,"class", "wtsp");
                tsp.appendChild(document.createTextNode( ""+wnum ));
                tp.appendChild(tsp);
                te.appendChild(tp);
                wtarr[wtarr.length]=te;

                wp.year=tempminus1.getFullYear();
                wp.week=wnum;


                wparr[wparr.length]=wp;
        }
        function createmonthpath(currentmonth, daycount, temp){

                
                var tempminus1=new Date(temp.getTime());
                    tempminus1.setDate(tempminus1.getDate()-1);

                var mp=e("path");
                a(mp,"class","m-m m-m"+currentmonth);

                x1deg=(angle-(basedeg+(daycount*incre)));
                x2deg=(angle-(basedeg));

                var x1=(cx+mradius*Math.cos(x1deg*Math.PI/180))+(mul*360);
                var y1=(cy+mradius*Math.sin(x1deg*Math.PI/180))+(mul*360);
                var x2=(cx+mradius*Math.cos(x2deg*Math.PI/180));
                var y2=(cy+mradius*Math.sin(x2deg*Math.PI/180));
                a(mp,"d",
                         "M "+cx+" "+cy
                         +" L "+x1+" "+y1
                         +" A "+mradius+" "+mradius+" 0 0 1 " +x2+" "+y2
                         +" z"
                );

                if(daycount > 18){
                    
                    var tpdef=e("path");
                    a(tpdef,"id","mtp"+currentmonth);
                    a(tpdef,"d","M "+x1+" "+y1+" A "+mradius+" "+mradius+" 0 0 1 " +x2+" "+y2);
                    defs.appendChild(tpdef);

                    var te=e("text");
                        te.month=tempminus1.getMonth();
                        te.year=tempminus1.getFullYear();
                        te.daycount=daycount;
                        te.onmouseover=function(){
                            var e=d("text_info");
                            while(e.firstChild){
                                e.removeChild(e.childNodes[0]);
                            }

                            var text_info=document.createTextNode(
                                    self.p.tr.mnames[this.month] + " " + tempminus1.getFullYear()+", "+daycount+" "+self.p.tr.days
                            );
                            e.appendChild(text_info);
                        };
                        te.onclick=function(){
                            self.open(host+self.to_ascii(self.p.tr.lang+"/"+self.p.tr.event+"/"+self.p.tr.prefix+"-"+self.p.tr.month+"-"+self.p.tr.mnames[this.month]+"-"+this.year+".html"));
                        };
                    a(te,"class", "mte");
                    a(te,"dy","20px");
                    var tp=e("textPath");
                    a(tp,"startOffset","50%");
                    a(tp,"class","mtp");
                    a2(tp,"xlink:href", "#mtp"+currentmonth,"http://www.w3.org/1999/xlink");

                    var tsp=e("tspan");
                    a(tsp,"class", "mtsp");
                    tsp.appendChild(document.createTextNode(self.p.tr.mnames[currentmonth].substring(0,3) + " " + tempminus1.getFullYear()));
                    tp.appendChild(tsp);
                    te.appendChild(tp);
                    mtarr[mtarr.length]=te;
                }


                mparr[mparr.length]=mp;
        }

        function createcyclepath(temp){
            if(end_ti_hash[temp.getTime()]){
                var cp=e("path");
                a(cp,"class","c-c c-"+end_ti_hash[temp.getTime()].cycle);
                a(cp,"id",end_ti_hash[temp.getTime()].cycle);

                x1deg=angle - (basedeg+((end_ti_hash[temp.getTime()].daycount)*incre)-incre);
                x2deg=angle - (basedeg-incre);

                var greatarc=0;
                if(end_ti_hash[temp.getTime()].daycount > 182){
                    greatarc=1;
                }

                var x1=(cx+cradius*Math.cos(x1deg*Math.PI/180))+(mul*360);
                var y1=(cy+cradius*Math.sin(x1deg*Math.PI/180))+(mul*360);
                var x2=(cx+cradius*Math.cos(x2deg*Math.PI/180));
                var y2=(cy+cradius*Math.sin(x2deg*Math.PI/180));
                a(cp,"d",
                         "M "+cx+" "+cy
                         +" L "+x1+" "+y1
                         +" A "+cradius+" "+cradius+" 0 "+greatarc+" 1 " +x2+" "+y2
                         +" z"
                );

                
                var tpdef=e("path");
                a(tpdef,"id","ctp"+end_ti_hash[temp.getTime()].cycle);
                a(tpdef,"d","M "+x1+" "+y1+" A "+cradius+" "+cradius+" 0 "+greatarc+" 1 " +x2+" "+y2);
                defs.appendChild(tpdef);

                var te=e("text");
                a(te,"class", "cte");
                    te.cycle=end_ti_hash[temp.getTime()].cycle;
                    te.daycount=end_ti_hash[temp.getTime()].daycount;
                    te.onmouseover=function(){
                        var e=d("text_info");
                        while(e.firstChild){
                            e.removeChild(e.childNodes[0]);
                        }

                        var text_info=document.createTextNode(self.p.tr.cyna[this.cycle]+", "+this.daycount+" "+self.p.tr.days);
                        e.appendChild(text_info);
                    };
                var tp=e("textPath");
                a(tp,"startOffset","50%");
                a2(tp,"xlink:href", "#ctp"+end_ti_hash[temp.getTime()].cycle,"http://www.w3.org/1999/xlink");

                var tsp=e("tspan");
                tsp.appendChild(document.createTextNode( self.p.tr.cyna[end_ti_hash[temp.getTime()].cycle].toUpperCase() ));
                tp.appendChild(tsp);
                te.appendChild(tp);
                ctarr[ctarr.length]=te;

                cp.daycount=end_ti_hash[temp.getTime()].daycount;
                cp.cycle=end_ti_hash[temp.getTime()].cycle;

                cparr[cparr.length]=cp;
            }
        }

        var count=0;
        var wdays=0;
        var x1deg,x2deg=0;
        var basedeg=90+(doffset*incre)+(incre/2);
        while(Math.round(angle) < 360){
            
             createcyclepath(temp);

           if(currentmonth !== temp.getMonth()){
                
                createmonthpath(currentmonth, daycount, temp);
                daycount=0;
           }

           if(temp.getDay() === 0){
               
                createweekpath(wdays, temp);
                wdays=0;
           }

            if(temp.getTime() >= adv2.getTime()){
                temp=new Date(adv1.getTime());
                temp.setDate(adv1.getDate()-1);
            }

           
           

           x1deg=(angle-basedeg);
           x2deg=(angle-(basedeg-incre));

           var el=e("path");
            var x1=(cx+dradius*Math.cos(x1deg*Math.PI/180));
            var y1=(cy+dradius*Math.sin(x1deg*Math.PI/180));
            var x2=(cx+dradius*Math.cos(x2deg*Math.PI/180))+(mul*360);
            var y2=(cy+dradius*Math.sin(x2deg*Math.PI/180))+(mul*360);
            a(el,"d",
                    "M "+cx+" "+cy
                    +" L "+x1+" "+y1
                    +" A "+dradius+" "+dradius+" 0 0 1 " +(x2)+" "+(y2)
                    +" z"
            );
            a(el,"class"," d-d "
                    +"d-"+(day_lit_hash[temp.getTime()]?day_lit_hash[temp.getTime()]:"ad")+" "
                    +" d-md"+temp.getMonth()+"-"+temp.getDate()+" "
                    +" d-my"+temp.getMonth()+"-"+temp.getFullYear()+" "
                    +"d-ymd"+temp.getFullYear()+"-"+temp.getMonth()+"-"+temp.getDate()+" "

            );

            if(special_dates[temp.getTime()]){
                a(el,"id",special_dates[temp.getTime()]);
            }
            el.onclick=function(){
                self.open(host+self.to_ascii(self.p.tr.lang+"/"+self.p.tr.event+"/"+self.p.tr.prefix+"-"+this.date.getDate()+"-"+self.p.tr.mnames[this.date.getMonth()]+"-"+this.date.getFullYear()+".html"));
            };
            el.onmouseover=function(){
                var dname=self.p.tr.dnames[(this.date.getDay()===0)?6:this.date.getDay()-1];
                var e=d("text_info");
                while(e.firstChild){
                    e.removeChild(e.childNodes[0]);
                }

                var isoformat=this.date.getFullYear()
                    +"-"+(this.date.getMonth()<9?"0"+(this.date.getMonth()+1):this.date.getMonth()+1)
                    +"-"+(this.date.getDate()<10?"0"+(this.date.getDate()):this.date.getDate());
                var text_info=document.createTextNode(
                        dname+", "+isoformat
                        + ((this.id)?" [ "+self.p.tr.special_dates_text[this.id]+" ]":"")
                );

                e.appendChild(text_info);
            };

            el.date=new Date(temp.getTime());

            dparr[dparr.length]=(el);

            daycount++;
            currentmonth=temp.getMonth();
            angle+=incre;
            temp.setDate(temp.getDate()+1);
            wdays++;
            count++;
        }
        createmonthpath(currentmonth, daycount, temp);
        createweekpath(wdays, adv2);


        var mySvg = e("svg");
            a(mySvg,"id", "svglit");
            a2(mySvg,"xmlns:rdf","http://www.w3.org/1999/02/22-rdf-syntax-ns#","http://www.w3.org/2000/xmlns/");
            a2(mySvg,"xmlns:cc", "http://creativecommons.org/ns#","http://www.w3.org/2000/xmlns/");
            a2(mySvg,"xmlns:dc", "http://purl.org/dc/elements/1.1/","http://www.w3.org/2000/xmlns/");
            a2(mySvg,"xmlns:xlink", "http://www.w3.org/1999/xlink","http://www.w3.org/2000/xmlns/");
            a2(mySvg, "xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/");

            a(mySvg,"version", "1.1");
            a(mySvg,"width", this.p.radius*2);
            a(mySvg,"height", this.p.radius*2);
            
            

        mySvg.appendChild(defs);

        for(var i=0;i<cparr.length;i++){
            mySvg.appendChild(cparr[i]);
        }
        for(i=0;i<ctarr.length;i++){
            mySvg.appendChild(ctarr[i]);
        }

        
        var mci = e("circle");
            a(mci, "cx", cx);
            a(mci, "cy", cy);
            a(mci, "r", mradius);
            a(mci, "id", "mci");
            mySvg.appendChild(mci);

        for(i=0;i<mparr.length;i++){
            mySvg.appendChild(mparr[i]);
        }
        for(i=0;i<mtarr.length;i++){
            mySvg.appendChild(mtarr[i]);
        }

        
        var wci = e("circle");
            a(wci, "cx", cx);
            a(wci, "cy", cy);
            a(wci, "r", wradius);
            a(wci, "id", "wci");
            mySvg.appendChild(wci);

        for(i=0;i<wparr.length;i++){
            mySvg.appendChild(wparr[i]);
        }
        for(i=0;i<wtarr.length;i++){
            mySvg.appendChild(wtarr[i]);
        }

        
        var dci = e("circle");
            a(dci, "cx", cx);
            a(dci, "cy", cy);
            a(dci, "r", dradius);
            a(dci, "id", "dci");
            mySvg.appendChild(dci);

        for(i=0;i<dparr.length;i++){
            mySvg.appendChild(dparr[i]);
        }


        var crismon=e("path");
        a(crismon,"id","cmn");
        
        var crw=dradius*0.20;
        var xoff=crw*0.20;
        a(crismon,"d",
            "M "+(cx-(crw/2))+" "+( (cy-(crw/2)) + xoff )+" L "+(cx+(crw/2))+" "+( (cy+(crw/2)) - xoff )
            +" M "+(cx+(crw/2))+" "+( (cy-(crw/2)) + xoff ) +" L "+(cx-(crw/2))+" "+( (cy+(crw/2)) - (xoff) )
            +" M "+(cx)+" "+(cy-(crw))+" V "+(cy+(crw*0.70) )
            +" M "+(cx)+" "+(cy-(crw))+" C "+(cx+(crw/2))+" "+(cy-(crw))+" "+(cx+(crw/2))+" "+(cy-(crw/2))+" "+(cx)+" "+(cy-(crw/2))

        );
        a(crismon,"stroke","black");
        a(crismon,"stroke-width","5px");
        a(crismon,"fill","transparent");
        
        mySvg.appendChild(crismon);


        var g_info=e("g");
        var rect_info=e("rect");
            a(rect_info,"id","rect_info");
            a(rect_info,"x",cx-(dradius*0.80));
            a(rect_info,"y",cy-(dradius/3));
            a(rect_info,"width",((dradius*0.80)*2));
            a(rect_info,"height","200");
        var text_info=e("text");
            a(text_info,"x",cx-(dradius*0.80));
            a(text_info,"y",cy-(dradius/3));
            a(text_info,"id","text_info");
        g_info.appendChild(rect_info);
        g_info.appendChild(text_info);
        mySvg.appendChild(g_info);


        var copyright=e("text");
            a(copyright,"x",(this.p.radius*2)-160);
            a(copyright,"y",(this.p.radius*2)-20);
            a(copyright,"id","copyright");
            copyright.appendChild(document.createTextNode("© vercalendario.info "+new Date().getFullYear()));
        mySvg.appendChild(copyright);

        d(this.p.target).appendChild(mySvg);

        
        return data;
    },
    to_ascii:function(string){
        var a=["á","é","í","ó","ú",  "ç","ÿ","ñ",    "ã","ẽ","ĩ","õ","ũ",    "â","ê","î","ô","û","ü",    "à","è","ì","ò","ù",     "ä","ë","ï","ö","ü",
                      "Á","É","Í","Ó","Ú",  "Ç","Ÿ","Ñ",    "Ã","Ẽ","Ĩ","Õ","Ũ",    "Â","Ê","Î","Ô","Û","Ü",    "À","È","Ì","Ò","Ù",     "Ä","Ë","Ï","Ö","Ü" ];
        var b=["a","e","i","o","u",  "c","y","n",    "a","e","i","o","u",    "a","e","i","o","u","u",    "a","e","i","o","u",     "a","e","i","o","u",
                      "A","E","I","O","U",  "C","Y","N",    "A","E","I","O","U",    "A","E","I","O","U","U",    "A","E","I","O","U",     "A","E","I","O","U",
                  "_"];
        for(var i=0;i<a.length;i++){
            string=string.replace(a[i],b[i]);
        }return string.toLowerCase();
    }
};
