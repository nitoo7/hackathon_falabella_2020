const productSchema = {
    name: {
        type: "string",
        default: "",
        mapTo: "product.name"
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
    }
}

module.exports = {
    productSchema
}