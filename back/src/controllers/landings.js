const axios = require('axios');
const staff = require('./staff');
const sales = require('./sales');
const payments = require('./payments');
const products = require('./products');


module.exports = {

    async get_info(req, res) {
        var data = '';
        await axios.get('https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json')
        .then(response => {
            // console.log(response.data[1].products);
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });
        const currentMonth = new Date('2019-03-20 15:31:42').getMonth();
        const currentYear = new Date('2019-03-20 15:31:42').getFullYear();
        const currentDay = new Date('2019-03-20 15:31:42').getDay();

        const currentSales = sales.getCurrentSales(data,currentMonth,currentYear);
        const salesDaily = sales.getBillsByDay(data,currentMonth,currentYear, currentDay);
        const monthBills = sales.getBillsForMonth(data,currentMonth,currentYear);
        const tableAverage = sales.getAverageTableCost(data,currentMonth,currentYear);

        const product = products.getFoodWithPrice(data);

        const jsonCards = payments.getBillByCard(data,currentMonth,currentYear);

        const staffMonthly = staff.getStaffNumberMonthly(data,currentMonth,currentYear);
        const waiters = staff.getNumberOfWaiter(data);
        const cashiers = staff.getNumberOfCashiers(data);
        
        const jsonSend = {
            currentSales: currentSales,
            waiters: waiters,
            cashiers: cashiers,
            billsNumber: monthBills,
            tableAverage: tableAverage,
            counterCards: jsonCards,
            dailySales: salesDaily,
            staff: staffMonthly,
            products: product.data,
            totalProducts:  product.total,
        };

        res.status(200).send(jsonSend);
    },
  }
  