const connection = require('../../config/dbConnection');

const getOrdersQuery = () => connection
  .query(
    'SELECT orders.pk_i_id as key, orders.customer_name as customer, orders.fk_i_place_id as storeId, orders.s_customer_address as address, orders.s_customer_phone as phone, orders.i_status as b_status, array( select json_build_array("pk_i_id","s_name","f_price") from items where items.fk_i_order_id = orders.pk_i_id) as items , sum(items.f_price) as price, orders.dt_create_at as date, tuser.s_name as captain FROM orders inner join places on places.pk_i_id = orders.fk_i_place_id inner join items on items.fk_i_order_id = orders.pk_i_id inner join TUser_order on TUser_order.order_id = orders.pk_i_id inner join tuser on tuser_order.tuser_id = tuser.pk_i_id where tuser.i_type = 1 group by orders.pk_i_id, TUser.s_name',
  )
  .then(res => connection
    .query(
      'select tuser.s_name as customer, tuser_order.order_id as orderId from tuser inner join tuser_order on tuser_order.tuser_id = tuser.pk_i_id where tuser.i_type = 2',
    )
    .then((result) => {
      res.rows.forEach((e) => {
        e.date = `${e.date.getFullYear()}-${e.date.getMonth() + 1}-${e.date.getDate()}`;
        result.rows.forEach((element) => {
          if (element.orderid === e.key) {
            e.customer = element.customer;
          }
        });
        if (e.items[0][0]) {
          e.items = e.items.map(item => ({ itemid: item[0], name: item[1], price: item[2] }));
        }
      });
      return res.rows;
    }));

module.exports = getOrdersQuery;
