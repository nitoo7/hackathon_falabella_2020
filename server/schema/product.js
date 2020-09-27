const productSchema = {
    skuId :{
        type: "string",
        default: "",
        mapTo: "product_skuId"
    },
    productId: {
        type: "string",
        default: "",
        mapTo: "product.productId"
    },
    name: {
        type: "string",
        default: "",
        mapTo: "product.name"
    },
    merchantId: {
        type: "string",
        default: "",
        mapTo: "product.merchantCategoryId"
    },
    category: {
        type: "string",
        default: "",
        mapTo: "product.parentCategoryNames"
    },
    brand: {
        type: "string",
        default: "",
        mapTo: "product.brandName"
    },
    gender: {
        type: "string",
        default: "",
        mapTo: "product.gender"
    },
    rating: {
        type: "number",
        default: 2.5,
        mapTo:"product.avgOverallRating"
    },
    formato: {
        type: "string",
        default: "",
        mapTo: "product.formato"
    },
    topSpecifications: {
        type: "string",
        default: "",
        mapTo:"product.attr.top"
    },
    modelo: {
        type: "string",
        default: "",
        mapTo: "product.modelo"
    },
    type: {
        type: "string",
        default: "",
        mapTo: "product.tipo"
    },
    color: {
        type: "string",
        default: "",
        mapTo: "variant.colorGroup"
    },
    size: {
        type: "string",
        default: "m",
        mapTo: "variant.size"
    },
    price: {
        type: "number",
        default: 20000,
        mapTo: "product.normalPrice"
    },
    allAttributes: {
        type: "string",
        default: "",
        mapTo: "product.attr.all"
    },
    productPhotoUrl : {
        type: "string",
        default: "",
        mapTo: "product.photoUrl"
    },
    variantPhotoURL : {
        type: "string",
        default: "",
        mapTo: "variant.photoUrl"
    }
}

module.exports = {
    productSchema
}