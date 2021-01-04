const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    short_description : {
        type: String,
        required : true,
        max : 30
    },
    price : {
        type: Number,
        required : true
    },
    offer_price :{
        type: Number,
    },
    discount : {
        type : Number
    },
    main_category : {
        type: Schema.Types.ObjectID,
        ref: 'main_category',
        required: true
    },
    category : {
        type: Schema.Types.ObjectID,
        ref: 'category',
        required: true
    },
    sub_category : {
        type: Schema.Types.ObjectID,
        ref: 'sub_category',
        required: true
    },
    product_description : {
        type: String,
        required : true,
    },
    review_count : {
        type: Number,
    },
    brand:{
        type: String,
        required : true,
    },
    sold_by : {
        type: String,
        required : true,
    },
    thumbnail : {
        type: String,
        required : true,
    },
    photos:[
        {
            url:{
                type: String,
                required : true,
            }
        }
    ],
    reviews : [
        {
            text : {
                type: String,
                required : true,
            },
            user : {
                type: Schema.Types.ObjectID,
                ref: 'users',
                required: true
            },
            review_photos:[
                {
                    url:{
                        type: String,
                        required : true,
                    }
                }
            ],
            likes : [
                {
                    user : {
                        type: Schema.Types.ObjectID,
                        ref: 'users',
                    }
                }
            ],
            date : {
                type:Date,
                default : Date.now,
                required : true
            }
        }
    ],
    specifications : [
        {
            title : {
                type: String,
                required : true,
            },
            spec_description : {
                type: String,
                required : true,
            }
        }
    ],
    stock : {
        type: Number,
        required : true,
    },
    size : {
        type: String,
    },
    color : {
        type: String,
    },
    created_date : {
        type: Date,
        default : Date.now,
        required : true,
    },
    is_active : {
        type: Boolean,
        default : true
    },
    added_by : {
        type: Schema.Types.ObjectID,
        ref: 'users',
    },
    modefied_by : {
        type: Schema.Types.ObjectID,
        ref: 'users',
    },
    modified_date : {
        type: Date,
        default : Date.now
    },

});

module.exports = Product = mongoose.model('product',productSchema);