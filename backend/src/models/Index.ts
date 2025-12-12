import { Sequelize } from 'sequelize';

import initSeller, { Seller } from './Seller.js';
import initCyborg, { Cyborg } from './Cyborg.js';
import initCart, { Cart } from './Cart.js';
import initCartItem, { CartItem } from './CartItem.js';
import initPerk, { Perk } from './Perk.js';
import initPart, { Part } from './Part.js';
import initAttachment, { Attachment } from './Attachment.js';
import initPartPerk, { PartPerk } from './PartPerk.js';
import initPartAttachment, { PartAttachment } from './PartAttachment.js';
import initCartItemPerk, { CartItemPerk } from './CartItemPerk.js';
import initCartItemAttachment, { CartItemAttachment } from './CartItemAttachment.js';
import initOrder, { Order } from './Order.js';
import initOrderItem, { OrderItem } from './OrderItem.js';
import initOrderItemPerk, { OrderItemPerk } from './OrderItemPerk.js';
import initOrderItemAttachment, { OrderItemAttachment } from './OrderItemAttachment.js';

export function initModels(sequelize: Sequelize) {
  initSeller(sequelize);
  initCyborg(sequelize);
  initCart(sequelize);
  initCartItem(sequelize);
  initPerk(sequelize);
  initPart(sequelize);
  initAttachment(sequelize);
  initPartPerk(sequelize);
  initPartAttachment(sequelize);
  initCartItemPerk(sequelize);
  initCartItemAttachment(sequelize);
  initOrder(sequelize);
  initOrderItem(sequelize);
  initOrderItemPerk(sequelize);
  initOrderItemAttachment(sequelize);

  const models = {
    Seller,
    Cyborg,
    Cart,
    CartItem,
    Perk,
    Part,
    Attachment,
    PartPerk,
    PartAttachment,
    CartItemPerk,
    CartItemAttachment,
    Order,
    OrderItem,
    OrderItemPerk,
    OrderItemAttachment,
  };

  Object.values(models).forEach((model: any) => {
    if (typeof model.associate === 'function') {
      model.associate(models);
    }
  });

  return models;
}

export {
  Seller,
  Cyborg,
  Cart,
  CartItem,
  Perk,
  Part,
  Attachment,
  PartPerk,
  PartAttachment,
  CartItemPerk,
  CartItemAttachment,
  Order,
  OrderItem,
  OrderItemPerk,
  OrderItemAttachment,
};
