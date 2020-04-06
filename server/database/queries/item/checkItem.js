const connection = require('../../config/dbConnection');

const checkIfItemExistQuery = (items, OrderId) => new Promise((resolve, reject) => {
  connection
    .query(
      'SELECT s_name,pk_i_id,f_price,fk_i_order_id FROM items WHERE fk_i_order_id = $1 ',
      [OrderId],
    )
    .then((res) => {
      let deleteItems = true;
      let insertItems = true;
      if (items.deleted[0]) {
        for (let i = 0; i < items.deleted.length; i++) {
          let deleted = false;
          for (let j = 0; j < res.rows.length; j++) {
            if (
              res.rows[j].s_name === items.deleted[i].name
                && res.rows[j].f_price === items.deleted[i].price
                && res.rows[j].pk_i_id === parseInt(items.deleted[i].itemid, 10)
            ) {
              deleted = true;
            }
          }
          if (!deleted) {
            deleteItems = false;
          }
        }
      } else {
        deleteItems = false;
      }
      let edited = true;
      if (items.edited[0]) {
        for (let i = 0; i < items.edited.length; i++) {
          for (let j = 0; j < res.rows.length; j++) {
            if (
              res.rows[j].s_name === items.edited[i].name
              && res.rows[j].f_price === items.edited[i].price
              && res.rows[j].fk_i_order_id === OrderId
            ) {
              edited = false;
            }
          }
          if (!edited) {
            insertItems = false;
          }
        }
      } else {
        insertItems = false;
      }
      resolve({ deleteItems, insertItems });
    })
    .catch(e => reject(e));
});
module.exports = checkIfItemExistQuery;
