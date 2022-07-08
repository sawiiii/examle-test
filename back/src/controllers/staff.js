const axios = require('axios');
const filter = require('./filters');


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

function getCashiersAndWaiters(data){
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
    const json = {
        cashier: cashiers,
        waiter: waiters,
    }
    return json;
};

module.exports = {

    getNumberOfCashiers,
    getNumberOfWaiter,
    getStaffNumberMonthly,

    async getData(req, res) {
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            // console.log(response.data[1].products);
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const people = getCashiersAndWaiters(data);
        const infoSummary = filter.getInfoCashierWaiter(data);

        jsonSend = {
            people: people,
            cashiers: infoSummary.cashiers,
            waiters: infoSummary.waiters,
            data: data,
        };
        res.status(200).send(jsonSend);
    },
    async filters(req, res) {
        // console.log(req.query);
        const params = req.query;
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            // console.log(response.data[1].products);
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const people = getCashiersAndWaiters(data);
        const newData = filter.getSalesByCashierOrWaiter(data, params);
        const infoSummary = filter.getInfoCashierWaiter(data);
        jsonSend = {
            people: people,
            cashiers: infoSummary.cashiers,
            waiters: infoSummary.waiters,
            data: newData,
        };
        res.status(200).send(jsonSend);
    },

  }
  