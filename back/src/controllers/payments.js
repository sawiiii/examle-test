const axios = require('axios');
const filter = require('./filters');


function getBillByCard(data, currentMonth, currentYear){
    var counterCredit = 0;
    var counterCash = 0;
    var counterDebit = 0;
    var sells = data.filter(function (sell) {
        const month = new Date(sell.date_closed).getMonth();
        const year = new Date(sell.date_closed).getFullYear();
        if (month == currentMonth && currentYear == year) {
            return sell; 
        }
    });
    payments = [];
    sells.forEach(function(value, index){
        value.payments.filter(function(pay){
                if (pay.type == 'Tarjeta crédito' ) {
                    counterCredit += 1;
                    payments.push(pay);
                } else if (pay.type == 'Tarjeta débito') {
                    counterDebit += 1;
                    payments.push(pay);
                } else if (pay.type == 'Efectivo') {
                    counterCash += 1;
                    payments.push(pay);
                };
            })
        
    });
    const counterBills = payments.length;
    jsonSend = {
        bills: counterBills,
        credit: counterCredit,
        debit: counterDebit,
        cash: counterCash,
    };
    return jsonSend;
};

function getValues(data){
    var days = [];
    var months = [];
    var years = [];
    var types = [];
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
        sell.payments.forEach(function(pay){
            if (types.indexOf(pay.type) == -1) {  
                types.push(pay.type); 
            };
        });
    });
    jsonSend = {
        days: days,
        months: months,
        years: years,
        types: types,
    };
    return jsonSend;
};



module.exports = {
    getBillByCard,
    getValues,
    
    async getData(req, res) {
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const dates = getValues(data);
        const info = filter.getBillsAndPorcentages(data);
        
        jsonSend = {
            dates: dates,
            data: data,
            porDeb: info.counterDeb,
            porCred: info.counterCred,
            porCash: info.counterCash,
            numberBills: info.counter,
            profitTypes: info.earn,
            total: info.total,
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
        const dates = getValues(data);
        const datas = filter.filterPayments(data, params);
        const info = filter.getBillsAndPorcentages(datas);
       
        jsonSend = {
            dates: dates,
            data: datas,
            porDeb: info.counterDeb,
            porCred: info.counterCred,
            porCash: info.counterCash,
            numberBills: info.counter,
            profitTypes: info.earn,
            total: info.total,
        }
        res.status(200).send(jsonSend);
    },


  }
  
