const {weights} = require("./weights");

function sanitize(str) {
    //TODO: sanitize the string
    return str
}

function termFreqMap(str) {
    var sanitized = sanitize(str)
    var words = sanitized.split(' ');
    var termFreq = {};
    words.forEach(function (w) {
        termFreq[w] = (termFreq[w] || 0) + 1;
    });
    return termFreq;
}

function addKeysToDict(map, dict) {
    for (var key in map) {
        dict[key] = true;
    }
}

function termFreqMapToVector(map, dict) {
    var termFreqVector = [];
    for (var term in dict) {
        termFreqVector.push(map[term] || 0);
    }
    return termFreqVector;
}

function vecDotProduct(vecA, vecB) {
    var product = 0;
    for (var i = 0; i < vecA.length; i++) {
        product += vecA[i] * vecB[i];
    }
    return product;
}

function vecMagnitude(vec) {
    var sum = 0;
    for (var i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}

function cosineSimilarity(vecA, vecB) {
    return vecDotProduct(vecA, vecB) / (vecMagnitude(vecA) * vecMagnitude(vecB));
}

function textCosineSimilarity(strA, strB) {
    var termFreqA = termFreqMap(strA);
    var termFreqB = termFreqMap(strB);

    var dict = {};
    addKeysToDict(termFreqA, dict);
    addKeysToDict(termFreqB, dict);

    var termFreqVecA = termFreqMapToVector(termFreqA, dict);
    var termFreqVecB = termFreqMapToVector(termFreqB, dict);

    return cosineSimilarity(termFreqVecA, termFreqVecB);
}

const numberSimilarity = (num1, num2) => {
    // TODO: Find similarity between numberSimilarity. Max value = 1, Min value = 0
    return 1
}

const compareAttributes = (refProduct, newProduct) => {
    newProduct.coefficient = 0;
    let keys = Object.keys(weights);
    for (const key of keys) {
        var cosineVal;
        // console.log(refProduct[key], newProduct[key])
        if (typeof refProduct[key] === "number") {
            cosineVal = numberSimilarity(refProduct[key], newProduct[key])
        }
        else {
            cosineVal = textCosineSimilarity(refProduct[key], newProduct[key]);
        }
        newProduct.coefficient = newProduct.coefficient + (cosineVal * weights[key])
    }
    return newProduct;
}

const productSimilarity = (refProduct, products) => {
    var newProducts = [];
    for (let product of products) {
        let newProduct = { ...product };
        newProduct = compareAttributes(refProduct, newProduct);
        newProducts = [...newProducts, newProduct]
    }
    return newProducts;
}

const sortProducts = (refProduct, products) => {
    var productsWithCoefficients = productSimilarity(refProduct, products)
    return productsWithCoefficients;
}

module.exports = {
    sortProducts
}