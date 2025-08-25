const SchoolFinance=require('../models/financemodel')
const { Op, fn, col, where } = require('sequelize');
const currentYear = new Date().getFullYear();
module.exports.getFinanceOfYear=async()=>{
     try {
    const results = await SchoolFinance.findAll({
  attributes: [
    [fn('DATE_FORMAT', col('date'), '%b'), 'month'],
    [fn('SUM', col('amount')), 'total_amount'],
    'type'
  ],
  where: where(fn('YEAR', col('date')), currentYear),
  group: ['month', 'type'],
  order: [['month', 'ASC']]
});
   return results.map(row => ({
      date: row.get('month'),
      type: row.get('type'),
      total: parseFloat(row.get('total_amount'))
    }));
  } catch (error) {
    console.error('Error fetching attendance counts:', error);
     throw new Error('Internal server error');
  }
}