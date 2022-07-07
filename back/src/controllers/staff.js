const axios = require('axios');


function getNumberOfWaiter(data){
    var waiters = [];
    data.forEach(function(sell) {
        // console.log(waiters.indexOf(sell.waiter));
        if (waiters.indexOf(sell.waiter) == -1) {  
            waiters.push(sell.waiter); 
        }
    });
    return waiters.length;
};

function getNumberOfCashiers(data){
    var cashiers = [];
    data.forEach(function(sell) {
        if (cashiers.indexOf(sell.cashier) == -1) {  
            cashiers.push(sell.cashier); 
        }
    });
    return cashiers.length;
};

function getStaffNumberMonthly(data,currentMonth,currentYear){
    var cashiers = [];
    var waiters = [];
    data.forEach(function(sell) {
        if (cashiers.indexOf(sell.cashier) == -1) {  
            cashiers.push(sell.cashier); 
        };
        if (waiters.indexOf(sell.waiter) == -1) {  
            waiters.push(sell.waiter); 
        };
    });
    const counter = cashiers.length + waiters.length;
    return counter;
};

module.exports = {

    getNumberOfCashiers,
    getNumberOfWaiter,
    getStaffNumberMonthly,
  }
  