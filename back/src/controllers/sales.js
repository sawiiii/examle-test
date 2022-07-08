const axios = require('axios');
const filter = require('./filters');


function getCurrentSales(data,currentMonth,currentYear){
    var sellCurrentMonth = data.filter(function (sell) {
        const month = new Date(sell.date_closed).getMonth();
        const year = new Date(sell.date_closed).getFullYear();
        if (month == currentMonth && currentYear == year) {
            return sell; 
        }
    });
    var currentSales = 0;
    sellCurrentMonth.forEach(function(value, index){
        currentSales += value.total;
    });
    return currentSales;
};


function getBillsForMonth(data, currentMonth, currentYear){
    var sellCurrentMonth = data.filter(function (sell) {
        const month = new Date(sell.date_closed).getMonth();
        const year = new Date(sell.date_closed).getFullYear();
        if (month == currentMonth && currentYear == year) {
            return sell; 
        }
    });
    return sellCurrentMonth.length;
};

function getBillsByDay(data, currentMonth, currentYear, currentDay){
    total = 0;
    var sellCurrentDay = data.filter(function (sell) {
        const month = new Date(sell.date_closed).getMonth();
        const year = new Date(sell.date_closed).getFullYear();
        const day = new Date(sell.date_closed).getDay();
        if (month == currentMonth && currentYear == year && day == currentDay) {
            return sell; 
        }
    });
    sellCurrentDay.forEach(function(value, index){
        total += value.total;
    });
    return total;
};


function getAverageTableCost(data, currentMonth, currentYear){
    var total = 0;
    var average = 0.0;
    var counter = 0;
    var sellCurrentMonth = data.filter(function (sell) {
        const month = new Date(sell.date_closed).getMonth();
        const year = new Date(sell.date_closed).getFullYear();
        if (month == currentMonth && currentYear == year) {
            return sell; 
        }
    });
    sellCurrentMonth.forEach(function(value, index){
        total += value.total;
        counter += 1;
    });
    total != 0 ? average = (total / counter) : average = 0;
    return average.toFixed(0);
};

function getDateValues(data){
    var days = [];
    var months = [];
    var years = [];
    data.forEach(function(sell) {
        const month = new Date(sell.date_closed).getMonth();
        const year = new Date(sell.date_closed).getFullYear();
        const day = new Date(sell.date_closed).getDate();
        if (days.indexOf(day) == -1) {  
            days.push(day); 
        };
        if (months.indexOf(month) == -1) {  
            months.push(month); 
        };
        if (years.indexOf(year) == -1) {  
            years.push(year); 
        };
    });
    jsonSend = {
        days: days,
        months: months,
        years: years,
    };
    return jsonSend;
};


module.exports = {

    getBillsForMonth,
    getCurrentSales,
    getAverageTableCost,
    getBillsByDay,

    async getData(req, res) {
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const dates = getDateValues(data);
        const totalProfit = filter.getFullProfit(data);
        const profitByProduct  = filter.getProfitByProduct(data);
        jsonSend = {
            dates: dates,
            data: data,
            totalSales: totalProfit.total,
            AverageByTable: totalProfit.average,
            AverageDinersByTable: totalProfit.diners,
            earnByProducts: profitByProduct,
        }
        res.status(200).send(jsonSend);
    },

    async filters(req, res) {
        const params = req.query;
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const dates = getDateValues(data)
        const datas = filter.filterSales(data, params)
        const totalProfit = filter.getFullProfit(datas);
        const profitByProduct  = filter.getProfitByProduct(datas);
        jsonSend = {
            dates: dates,
            data: datas,
            totalSales: totalProfit.total,
            AverageByTable: totalProfit.average,
            AverageDinersByTable: totalProfit.diners,
            earnByProducts: profitByProduct,
        }
        res.status(200).send(jsonSend);
    },

    async showSale(req, res) {
        const { id } = req.params;
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const show = data.find( sale => sale.id === id);
        res.status(200).send(show);
    },
  }
  
