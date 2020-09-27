const productSchema = {
    skuId :{
        type: "string",
        default: "",
        mapTo: "skuid"
    },
    productId: {
        type: "string",
        default: "",
        mapTo: "productId"
    },
    name: {
        type: "string",
        default: "",
        mapTo: "product_name"
    },
    merchantId: {
        type: "string",
        default: "",
        mapTo: "merchant_category"
    },
    category: {
        type: "string",
        default: "",
        mapTo: "category_name"
    },
    brand: {
        type: "string",
        default: "",
        mapTo: "brand"
    },
    gender: {
        type: "string",
        default: "",
        mapTo: "gender"
    },
    rating: {
        type: "number",
        default: 2.5,
        mapTo:"rating"
    },
    formato: {
        type: "string",
        default: "",
        mapTo: "attr_formato"
    },
    topSpecifications: {
        type: "string",
        default: "",
        mapTo:"attr_to_specification"
    },
    modelo: {
        type: "string",
        default: "",
        mapTo: "attr_modelo"
    },
    type: {
        type: "string",
        default: "",
        mapTo: "attr_tipo"
    },
    color: {
        type: "string",
        default: "",
        mapTo: "variant_attr_color_group"
    },
    size: {
        type: "string",
        default: "m",
        mapTo: "variant_attr_size"
    },
    price: {
        type: "number",
        default: 20000,
        mapTo: "price_normal_default"
    },
    allAttributes: {
        type: "string",
        default: "",
        mapTo: "all_product_attributes"
    },
    productPhotoUrl : {
        type: "string",
        default: "",
        mapTo: "product_image_url"
    },
    variantPhotoURL : {
        type: "string",
        default: "",
        mapTo: "variant_image_url"
    }
}

module.exports = {
    productSchema
}