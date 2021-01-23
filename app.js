//BUDGET CONTROLLER
var budgetController = (function(){
        var Expense=function(id,description,value){

            this.id=id;
            this.description=description;
            this.value=value;
        this.percentage=-1;
        } ;
        Expense.prototype.calcPercentage=function(totalincome){
          if(totalincome>0)
          {  this.percentage=Math.round((this.value/totalincome)*100);
          } 
          else{
              this.percentage=-1;
          }
        };

        Expense.prototype.getPercentage=function(){
         return this.percentage;


        };
         var Income=function(id,description,value){
            this.id=id;
            this.description=description;
        
            this.value=value;
} ;

var calculateTotal=function(type){
var sum=0;
data.allItems[type].forEach(function(current){
sum=sum+current.value;

});
data.totals[type]=sum;

};
var allexpenses=[];
var allincome=[];
var totalexpenses=0;
var data ={
allItems:{
exp:[],
inc:[]
     },            
   totals:{
    exp:0,
    inc:0 
},
budget:0,
percentage:-1


    
};
return {
    additem:function(type,des,val){
        var newitem,ID ;
        if(data.allItems[type].length>0)
     {
         ID=data.allItems[type][data.allItems[type].length-1].id+1;

     }   //create id to push
    else{
        ID=0;
    }
        if(type==='exp'){
            newitem =new Expense(ID,des,val);
        }     else if(type==='inc'){
        newitem =new Income(ID,des,val);
    }//push item
          data.allItems[type].push(newitem);
          return newitem;
},
deleteItem:function(type,id)
{ var ids,index; 
    ids= data.allItems[type].map(function(current){
    return current.id ;
});
index=ids.indexOf(id);

if(index !== -1){
data.allItems[type].splice(index,1);
}

},
calculateBudget:function(){


    //calculate total income and expenses
       calculateTotal('exp');
       calculateTotal('inc');    

   //calculate the budget :income-expenses

data.budget=data.totals.inc-data.totals.exp;

   //calculatae teh percentage of income that we spent  
   if(data.totals.inc>0){
data.percentage= Math.round((data.totals.exp/data.totals.inc)*100);
   }else{
   data.percentage=-1;
}


} ,
calculatePercentages:function(){

data.allItems.exp.forEach(function(curr){
curr.calcPercentage(data.totals.inc);
});

},
getPercentages:function(){
var allParc=data.allItems.exp.map(function(curr){
return allParc.getPercentage();
});
return allParc;
},
getbudget:function(){
return{
    budget:data.budget,
    totalInc:data.totals.inc,
    totalExp:data.totals.exp,
    percentage:data.percentage
}
},
testing :function(){
    console.log(data);
}
};

})();

   
    //UI CONTROLLER
    var UIController = (function(){
        //some code

var DOMstrings={
    inputType:'.add__type',
    inputdescription:'.add__description',
    inputvalue:'.add__value',
    inputBtn:'.add__btn',
    incomeContainer:'.income__list',
    expensesContainer:'.expenses__list',
    budgetLabel:'.budget__value',
    incomelabel:'.budget__income--value',
    expensesLabel:'.budget__expenses--value',
    percentageLabel:'.budget__expenses--percentage',
    container:'.container ',
    expensesPercentageLabel:'.item__percentage',dateLabel:'.budget__title--month'
    

}  ;      

 var formatNumber=function(num,type){
    var int,num,dec;
    num=Math.abs(num);
    num=num.toFixed(2);
    numSplit=num.split('.');
    int =numSplit[0];
    if(int.length>3)
    {
        int=int.substr(0,int.length-3) + ','+int.substr(int.length-3,3);
    
    }
    dec=numSplit[1];
    
    return (type==='exp '? '-' : '+') + ' ' + int + '.' + dec;
    
    
    };
    var nodeListForEach=function(list,callback){
        for(var i=0;i<list.length;i++){
        callback(list[i],i);
        
        }
        };

      return  {
getinput:function(){
    return{
    type:document.querySelector(DOMstrings.inputType).value,
 description:document.querySelector(DOMstrings.inputdescription).value,
  value:parseFloat(document.querySelector(DOMstrings.inputvalue).value)
};
},
addListItem:function(obj,type){
//create HTML string with placeholder text

var html,newhtml,element;      
if(type==='inc'){
    element=DOMstrings.incomeContainer;
 html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
}
else if(type==='exp'){
    element=DOMstrings.expensesContainer;
html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
}
//replace the placeholder test  with actual data
newhtml=html.replace('%id%',obj.id);
newhtml=newhtml.replace('%description%',obj.description);
newhtml=newhtml.replace('%value%',formatNumber(obj.value,type));

//insert the HTML into  in DOM 
document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);


},
deleteListItem:function(selectorID){
var el;
el=document.getElementById(selectorID);
el.parentNode.removeChild(el);
       
},                
clearFields:function(){
var fields,fieldsArr;
    fields=document.querySelectorAll(DOMstrings.inputdescription + ' ,'+ DOMstrings.inputvalue);
fieldsArr=Array.prototype.slice.call(fields);
fieldsArr.forEach(function(current,index,array){
current.value="";

});           
fieldsArr[0].focus();
},
displayBudget:function(obj){
    obj.budget>0 ? type='inc' : type='exp';
document.querySelector(DOMstrings.budgetLabel).textContent= formatNumber(obj.budget,type);
document.querySelector(DOMstrings.incomelabel).textContent= formatNumber(obj.totalInc,'inc');
document.querySelector(DOMstrings.expensesLabel).textContent= formatNumber(obj.totalExp,'exp');

if(obj.percentage>0){   
    document.querySelector(DOMstrings.percentageLabel).textContent= obj.percentage + '%';
}else{
    document.querySelector(DOMstrings.percentageLabel).textContent='---';
}

},
displayPercentages:function(percentage){
var fields;
fields=document.querySelectorAll(DOMstrings.expensesPercentageLabel);

nodeListForEach(fields,function(current,index){
if(percentage[index>0]){
    current.textContent=percentage[index] + '%';
}
else{
    current.textContent='---';
}


});


},
displayMonth:function(){
var now,year;
 now=new Date();
//var christmas=new Date();

day=now.getDate();
months=['January','february','March','April','May','June','July','August','September','October','November','December'];
month=now.getMonth();
year=now.getFullYear();
document.querySelector(DOMstrings.dateLabel).textContent= day+'-'+ months[month] + '-' + year;


},
changedType:function(){
var fields=document.querySelectorAll(DOMstrings.inputType  + ',' + DOMstrings.inputdescription + ','+ DOMstrings.inputvalue);

nodeListForEach(fields,function(curr){
curr.classList.toggle('red-focus');
});
document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

},
getDOMstrings: function(){   
    return DOMstrings;  
}
      };                   

      
        
    
    })();            
    //global app controller
    var controller =(function(budgetCtrl,UICtrl){
        var setEventListeners=function() {
            var DOM=UICtrl.getDOMstrings();
            document.querySelector(DOM.inputBtn).addEventListener('click',ctrAddItem);
        
            document.addEventListener('keypress',function(event){       
                 if(event.keyCode===13 || event.which===13) 
                 {
                     ctrAddItem();
                 }});
                 document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('Change',UICtrl.changedType);       };

       
     var updateBudget=function(){
     //1.calculate budget
     budgetCtrl.calculateBudget();
     //2.return the budgetController
     var budget=budgetCtrl.getbudget();
     //3.display the biudget in hte UI
     UICtrl.displayBudget(budget);
     console.log(budget);

     };

     var updatePercentage = function(){
//1.calculate percentages
budgetCtrl.calculatePercentages();

//2.read oercentage from budget controller
var percentage=budgetCtrl.getPercentages();
//3.update the UI with new percentage
UICtrl.displayPercentages(percentage);        
console.log(percentage);
     };
        var ctrAddItem=function(){
            var input,newItem;
                   
             input=UICtrl.getinput();
            console.log(input);

            if(input.description!="" && !isNaN(input.value) &&  input.value>0){
            newItem=budgetCtrl.additem(input.type,input.description,input.value);
            //get the input 2.add budget to the controller
             //3.Add the item to UI
             UICtrl.addListItem(newItem,input.type);
             //clear the fields;
            UICtrl.clearFields();     
             
            //4.calculate and update budget
                  updateBudget();
             //calculate and update percentages
             updatePercentage();
            } 

             
    };
    var ctrlDeleteItem=function(event){
        var itemID,splitID;       
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
  if(itemID){
 splitID=itemID.split('-');
  type=splitID[0];
ID=parseInt(splitID[1]);
// delete item form dT structue
budgetCtrl.deleteItem(type,ID);
//delete item from user interface
UICtrl.deleteListItem(itemID);
//Update and show new budget
updateBudget();
//calculate and update the percentage
updatePercentage();


                
}


    };
    return {
        init:function(){

            console.log('Application has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget( {
                 budget:0,
                totalInc:0,
                totalExp:0,
                percentage:-1});

                setEventListeners();  
        }
    };
      
    
    
        })(budgetController,UIController);
        controller.init();     