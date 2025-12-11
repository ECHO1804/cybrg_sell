// seeders/ordersData.js
const orders = [
    {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      cyborg_id: 'efd0eb15-5ea4-4d37-8f84-4ef605ee92b3',   // from cyborgsData
      seller_id: '225f5ee0-47e6-4590-b700-7c7e57b3ef1f',  // from sellerData
      total_price: 3499.98,
      status: 'completed',                                // matches CHECK constraint
      created_at: new Date()
    }
  ];
  
  module.exports = orders;
  