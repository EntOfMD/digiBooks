//BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
 
    var data = {
 
        allitems:{
            exp: [],
            inc: []
        },
        totals:{
            exp:0,
            inc:0
        }
        
    }




})();


//UI CONTROLLER
var UIController = (function () {
    //one place for all DOMs.
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn'

    };
    return {
        getinput: function () {
            return { //instead of having 3 var, return 3 properties.
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();

//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (e) {

            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }

        });

    };



    var ctrlAddItem = function () {

        //1. Get field input data
        var input = UICtrl.getinput();
        // console.log(input);  //does this need to be here?


        //2. Add the item to the budget controller

        //3. Add the item to the UI

        //4. Calculate the budget

        //5. Display the budget

    }
    return {
        init: function () {
            console.log('Application has started.');
            setupEventListeners();
        }
    };


})(budgetController, UIController);



controller.init();