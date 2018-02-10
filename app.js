//BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
 
    var data = {
 
        allItems:{
            exp: [],
            inc: []
        },
        totals:{
            exp:0,
            inc:0
        }
        
    };

    return {
        additem: function(type, des, val){
            var newItem, ID;
            ID = 0;

            //Create new 
         if (data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }

        //Create new item based on 'income' or 'expense' type
        if(type=== 'exp'){
        newItem = new Expense(ID, des, val);
        } else if (type === 'inc'){
            newItem = new Income(ID, des, val);
        };

        //Push it to our data structure
        data.allItems[type].push(newItem);

        //Returns the new element
        return newItem;
    },
        testing:function(){
            console.log(data);
        }
    };




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

        addListItems: function(obj, type) {

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
        var input, newItem;
        //1. Get field input data
         input = UICtrl.getinput();
        // console.log(input);  //does this need to be here?


        //2. Add the item to the budget controller
       newItem = budgetCtrl.additem(input.type, input.description, input.value);
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