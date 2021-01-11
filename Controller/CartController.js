const Cart = require('../models/cart');
const validateCartInput = require('../validation/cart');

exports.addToCart = (req,res) =>{
  const { errors, isValid } = validateCartInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const cartFields = {}
  cartFields.user = req.user.id
  cartFields.delivery_charge = req.body.delivery_charge
  cartFields.item = {};
  if (req.body.product) cartFields.item.product = req.body.product;
  if (req.body.quantity) cartFields.item.quantity = req.body.quantity;
  if (req.body.size) cartFields.item.size = req.body.size;
  
  Cart.findOne({ user: req.user._id }).then(cart => {
    if (cart) {  
        const product = cartFields.item.product;
        const addQuantity = cart.item.find(c => c.product == product)
        let condition,action;
        if(addQuantity){
            condition = {user: req.user._id, "item.product": product};
            action = {
                "$set":{
                    "item.$":{
                        ...cartFields.item,
                        quantity : parseInt(req.body.quantity) + parseInt(addQuantity.quantity)
                    }
                }
            };
        }
        else{
            condition = {user: req.user._id };
            action = {
                "$push":
                  { "item" : cartFields.item } 
            };
        }

        Cart.findOneAndUpdate(condition,action)
        .exec((err,_cart)=>{
            if(err) return res.status(400).json({err})
            if(_cart){
                return res.status(200).json({cart : _cart})
            }
        });
    } else {
      const cart = new Cart(cartFields);
      cart
      .save()
      .then(cart => res.json(cart))
      .catch(err => console.log(err));
    }
  }); 
}

exports.removeCartItems = (req, res) => {
  const productId  = req.params.product_id;
  Cart.findOne({ user: req.user._id }).then(cart => {
    if (cart) { 
      const minusQuantity = cart.item.find(c => c.product == productId)
      let condition,action; 
      if(minusQuantity){
        if(minusQuantity.quantity == 1){
          console.log(minusQuantity.quantity)
          condition = {user: req.user._id, "item.product": productId};
          action = {
              $pull: {item: {product: productId}}, 
              multi: true
          };
        }else{
          console.log(minusQuantity.quantity)
          minusQuantity.quantity = minusQuantity.quantity - parseInt(1)
          condition = {user: req.user._id, "item.product": productId};
          action = {
              "$set":{
                  "item.$":{
                      ...minusQuantity,
                  } 
              }
          };
        }
        Cart.findOneAndUpdate(condition,action)
        .exec((err,_cart)=>{
            if(err) return res.status(400).json({err})
            if(_cart){
                return res.status(200).json({cart : _cart})
            }
        });
      } 
    }
  });
}
