//BUDGET CONTROLLER
var budgetController = (function() {
    
    //some code

}) ();

//UI CONTROLLER
var UIController = (function(){ 

    return {
        getinput: function(){
            return{ //instead of having 3 var, return 3 properties.
                type: document.querySelector('.add__type').value, // Will be either inc or exp
                description : document.querySelector('.add__description').value,
                value : document.querySelector('.add__value').value;
            } 
        }
    };
    
}) ();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
        var ctrlAddItem = function(){

            //1. Get field input data

            //2. Add the item to the budget controller

            //3. Add the item to the UI

            //4. Calculate the budget

            //5. Display the budget
            console.log('it works!')
        }
        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e){
            
            if(e.keyCode === 13 || e.which === 13){
                ctrlAddItem();
            }

        })

}) (budgetController, UIController);




 