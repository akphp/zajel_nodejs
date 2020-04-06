const updateOrdersQuery = require('../../database/queries/order/editOrder');
const checkIfItemExistQuery = require('../../database/queries/item/checkItem');
const insertItemQuery = require('../../database/queries/item/insertItem');
const deleteItemQuery = require('../../database/queries/item/deleteItem');

const queriesPromise = (items, orderId) => new Promise((resolve, reject) => {
  let insertedItemsId = [];
  checkIfItemExistQuery(items, orderId)
    .then(async (result) => {
      if (result.deleteItems) {
        const itemsIds = items.deleted.map(e => e.itemid);
        deleteItemQuery(itemsIds).catch((e) => {
          reject(e);
        });
      }
      if (result.insertItems) {
        await insertItemQuery(items.edited, orderId)
          .then((res) => {
            insertedItemsId = res;
          })
          .catch(e => reject(e));
      }
    })
    .then(() => {
      resolve(insertedItemsId);
    })
    .catch((e) => {
      reject(e);
    });
});

const updateOrder = (req, res) => {
  const {
    phone, address, items, storeID,
  } = req.body;
  updateOrdersQuery(phone, address, storeID, req.params.id)
    .then(() => queriesPromise(items, req.params.id).then((result) => {
      res.status(200).send(result);
    }))
    .catch(() => {
      res.status(500).send('Internal server error');
    });
};
module.exports = { updateOrder };
