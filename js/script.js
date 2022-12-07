let quantity1 = 0;
let numberbox1 = document.querySelector(".numberbox1");
function add1(){
quantity1++;
numberbox1.value = quantity1;
}

function subtract1(){
    if(quantity1>0){
        quantity1--;
        numberbox1.value = quantity1;
    }


}


let quantity2 = 0;
let numberbox2 = document.querySelector(".numberbox2");
function add2(){
quantity2++;
numberbox2.value = quantity2;
}

function subtract2(){
    if(quantity2>0){
        quantity2--;
        numberbox2.value = quantity2;
    }


}

let quantity3 = 0;
let numberbox3 = document.querySelector(".numberbox3");
function add3(){
quantity3++;
numberbox3.value = quantity3;
}

function subtract3(){
    if(quantity3>0){
        quantity3--;
        numberbox3.value = quantity3;
    }


}
