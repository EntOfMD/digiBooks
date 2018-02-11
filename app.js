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

        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    };

    return {
        additem: function (type, des, val) {
            var newItem, ID;
            ID = 0;

            //Create new 
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Create new item based on 'income' or 'expense' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            };

            //Push it to our data structure
            data.allItems[type].push(newItem);

            //Returns the new element
            return newItem;
        },
        testing: function () {
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
        addButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',

    };
    return {
        getinput: function () {
            return { //instead of having 3 var, return 3 properties.
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        addListItems: function (obj, type) {
            var html, newHTML, element;
            // Create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            // Insert the HTML into the DOM

            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },

        clearFields: function() {
            var fields,fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (value, index, array){
                value.value = "";

            });
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

        document.addEventListener('keypress', function (e) { //this makes sure when you hit 'ENTER', it enters the info.

            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }

        });

    };



    var ctrlAddItem = function () {
        var input, newItem;

        //1. Get field input data
        input = UICtrl.getinput();
        
        //2. Add the item to the budget controller
        newItem = budgetCtrl.additem(input.type, input.description, input.value);
        
        //3. Add the item to the UI
        UICtrl.addListItems(newItem, input.type);

        //4. Clear the fields
        UICtrl.clearFields();
        
        //5. Calculate the budget

        //6. Display the budget

    }
    return {
        init: function () {
            console.log('Application has started.');
            setupEventListeners();
        }
    };


})(budgetController, UIController);



controller.init();