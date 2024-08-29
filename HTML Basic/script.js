//import {add,sub} from  './utils.js';
import * as UTILS from './utils.js';
console.log(UTILS.add(2,4));
console.log(UTILS.sub(98,8));

let arrayListen=[1,2,3,4];
let newarrayListen=()=>arrayListen.map(
        (item)=>item*2
)
console.log(newarrayListen);
let objArr=[
    {name:'ShawShank'},
    {name:'Kinamaitics'}
];
let objArr1=JSON.parse(JSON.stringify(objArr));
objArr1[0].name='Redemption';
console.log(objArr);
console.log(objArr1);



let arr=[1,2,3,4,5,6];
let arrD=arr.map(function(currentItem,index,arr){
    return currentItem*2;
});
console.log(arrD);

//Filter in Map

let arrF=arr.filter(function(currentItem,index,arr){
    return currentItem>5;
});

console.log(arrF);

let arrSortAsc=arr.sort(function(a,b){
        return a-b;
});

console.log(arrSortAsc);
let arrSortDesc=arr.sort(function(a,b){
        return b-a;
});
console.log(arrSortDesc);

let totalSum=arr.reduce(function(total,currentItem){
    return total+currentItem;
},0);

console.log(totalSum);

function checkISSuccess(data){
    new Promise(function(resolve,reject){
        if(data==='Success'){
            return resolve('Successfully Done');
        }
        else{
            return reject('Not Successfull');
        }
    })
}

checkISSuccess('Success').then(function(result){
    console.log(result);
}).catch(function(error){
    console.log(error);
})

fetch('https://github.com/KritikWankhede').then(function(result){
    return result.JSON;
}).then(function(response){
    console.log(response);
})




