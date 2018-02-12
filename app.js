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

    var calculateTotal = function (type) {
        var sum;

        sum = 0; //Base 
        data.allItems[type].forEach(function (e) { //this works for both exp and inc
            sum += e.value;
        });
        data.total[type] = sum; //storing the value of sum
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 //by using -1, it doesn't technically "exist"

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

            //Push it to the data structure
            data.allItems[type].push(newItem);

            //Returns the new element
            return newItem;
        },

        calculateBudget: function () {
            // calculates total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculates the budet : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculates the percentage of income that we spent
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            // if expense = 100 and income = 300, spent 33.333%, is written as  100/300 * 100, but we don't want decimals
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
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) //parseFloat converts string to floating integer
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

            // Replace the placeholder text with user data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        clearFields: function () {
            var fields, fieldsArr;

            //querySelectorAll outputs a list
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            //We need to trick the system by thinking its an array, use the 'call' function
            fieldsArr = Array.prototype.slice.call(fields);

            //Now loop it
            fieldsArr.forEach(function (value, index, array) {
                value.value = "";
            });

            //Cursor will focus on first field
            fieldsArr[0].focus();
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

    var updateBudget = function () {
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. Return the budget

        //3. Display the budget on the UI

    };


    var ctrlAddItem = function () {
        var input, newItem;

        //1. Get field input data
        input = UICtrl.getinput();

        //this checks whether the input fields are empty, below 1, and not NaN
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //2. Add the item to the budget controller
            newItem = budgetCtrl.additem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UICtrl.addListItems(newItem, input.type);

            //4. Clear the fields
            UICtrl.clearFields();

            //5. Calculate and update the budget
            updateBudget();
        }
    };
    return {
        init: function () {
            console.log('Application has started.');
            setupEventListeners();
        }
    };


    /////////////////////////////////////////////////////////////////////
    //   TESTING
    ////////////////////////////////////////////////////////////////////
    // TESTING how to save data to blobs
    // function download(data, filename, type) {
    //     var file = new Blob([data], {
    //         type: type
    //     });

    //     if (window.navigator.msSaveOrOpenBlob) { // IE10+
    //         window.navigator.msSaveOrOpenBlob(file, filename);
    //     } else { // Others
    //         var a = document.createElement("a"),
    //         url = URL.createObjectURL(file);
    //         a.href = url;
    //         a.download = filename;
    //         document.body.appendChild(a);
    //         a.click();
    //         setTimeout(function () {
    //             document.body.removeChild(a);
    //             window.URL.revokeObjectURL(url);
    //         }, 0);
    //     }
    // }

    // function setCookie(cname, cvalue, exdays) {
    //     var d = new Date();
    //     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    //     var expires = "expires="+d.toUTCString();
    //     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // }

    // function getCookie(cname) {
    //     var name = cname + "=";
    //     var ca = document.cookie.split(';');
    //     for(var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }

    // function checkCookie() {
    //     var user = getCookie("username");
    //     if (user != "") {
    //         alert("Welcome again " + user);
    //     } else {
    //         user = prompt("Please enter your name:", "");
    //         if (user != "" && user != null) {
    //             setCookie("username", user, 365);
    //         }
    //     }
    // }


})(budgetController, UIController);





controller.init();