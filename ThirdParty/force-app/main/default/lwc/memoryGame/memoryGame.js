import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import customCss from '@salesforce/resourceUrl/fontAwesome';
export default class MemoryGame extends LightningElement {
    isLoaded=false;
    showModal=false;
    openCard=[];
    timeRef;
    moves=0;
    totalTime='00:00';
    matchedCard=[];
    cards=[
        {id:1,listClass:'card',type:'diamond',icon:'fa fa-diamond'},
        {id:2,listClass:'card',type:'plane',icon:'fa fa-plane'},
        {id:3,listClass:'card',type:'yelp',icon:'fa fa-yelp'},
        {id:4,listClass:'card',type:'calculator',icon:'fa fa-calculator'},
        {id:5,listClass:'card',type:'anchor',icon:'fa fa-anchor'},
        {id:6,listClass:'card',type:'bolt',icon:'fa fa-bolt'},
        {id:7,listClass:'card',type:'leaf',icon:'fa fa-leaf'},
        {id:8,listClass:'card',type:'buySellAds',icon:'fa fa-buysellads'},
        {id:9,listClass:'card',type:'diamond',icon:'fa fa-diamond'},
        {id:10,listClass:'card',type:'yelp',icon:'fa fa-yelp'},
        {id:11,listClass:'card',type:'plane',icon:'fa fa-plane'},
        {id:12,listClass:'card',type:'bolt',icon:'fa fa-bolt'},
        {id:13,listClass:'card',type:'leaf',icon:'fa fa-leaf'},
        {id:14,listClass:'card',type:'anchor',icon:'fa fa-anchor'},
        {id:15,listClass:'card',type:'calculator',icon:'fa fa-calculator'},
        {id:16,listClass:'card',type:'buySellAds',icon:'fa fa-buysellads'},
    ];

    get gameRating(){
        let stars= this.moves < 12 ? [1,2,3] :this.moves> 12 ? [1,2] :[1];
        return this.matchedCard.length===16 ? stars:[];
    }

    timer(){
        let startTime=new Date();
        this.timeRef= setInterval(()=>{
            let diff= new Date().getTime() -startTime.getTime();
            let sec=Math.floor(diff/1000);
            let min=Math.floor(sec/60);
            sec=sec-(min*60);
            this.totalTime=min+':'+sec;
        },1000);
    }
    shuffle(){
        this.openCard=[];
        this.showModal=false;
        window.clearInterval(this.timeRef);
        this.moves=0;
        this.totalTime='00:00';
        this.matchedCard=[];
        let elem= this.template.querySelectorAll('.card');
        Array.from(elem).forEach(item=>{
            item.classList.remove('show','open','match','disable');
        });
        let array=[...this.cards];
        let counter=array.length;
        while(counter>0){
            let index=Math.floor(Math.random()*counter);
            counter--;
            let temp=array[counter];
            array[counter]=array[index];
            array[index]=temp;
        }
        this.cards=[...array];
    }
    displayCard(event){
        let currentCard=event.target;
        currentCard.classList.add('open','show','disable');
        console.log(currentCard);
        this.openCard=this.openCard.concat(event.target);
        console.log(this.openCard);
        let cardLength=this.openCard.length;
        console.log(cardLength);
        if(cardLength === 2){
            this.moves=this.moves+1;
            if(this.moves===1){
                this.timer();
            }
            console.log('Inside and moves:-'+this.moves);
            if(this.openCard[0].type === this.openCard[1].type){
                this.matchedCard=this.matchedCard.concat(this.openCard[0],this.openCard[1]);
                this.matchedCardfunc();
            }
            else{
                this.unMatchedCard();
            }
        }
    }
    
    matchedCardfunc(){
        this.openCard[0].classList.add('match','disable');
        this.openCard[1].classList.add('match','disable');
        this.openCard[0].classList.remove('show','open');
        this.openCard[1].classList.remove('show','open');
        this.openCard=[];
        if(this.matchedCard.length===16){
            window.clearInterval(this.timeRef);
            this.showModal=true;
        }
    }

    unMatchedCard(){
        this.openCard[0].classList.add('unmatch');
        this.openCard[1].classList.add('unmatch');
        this.action('DISABLE');
        setTimeout(()=>{
            this.openCard[0].classList.remove('show','open','unmatch');
            this.openCard[1].classList.remove('show','open','unmatch');
            this.action('ENABLE');
            this.openCard=[];
        },1000);
    }

    action(actions){
        let cards=this.template.querySelectorAll('.card');
        Array.from(cards).forEach((item)=>{
            if(actions ==='ENABLE'){
                let isMatch=item.classList.contains('match'); 
                if(!isMatch){
                    item.classList.remove('disable');
                }
            }
            if(actions==='DISABLE'){
                item.classList.add('disable');
            }
        });
    }


    renderedCallback(){
            if(this.isLoaded){
                return;
            }else{
            loadStyle(this,customCss+'/fontawesome/css/font-awesome.min.css').then(()=>{
                console.log('Style Loaded');
            }).catch((error)=>{
                console.log('Error Loading Style'+error);
            });
            this.isLoaded=true;
            }
        }
}
 
