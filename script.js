var budgetController = (function(){
var x=23;
var add=function(a){
    return x + a;
}
return {
    publictest: function(b){
        
        return (add(b));

    }
}
})();
var UIController = (function(){



})();
var controller =(function(budgetCtrl,UICtrl){

var z=budgetCtrl.publictest(5);
return {anotherPublic:function(){
     console.log(z);
}}

})(budgetController,UIController);