class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,//  regex is from  mongodb
                $options: "i",// case insensitive   
            },
        } : {};
    
        this.query = this.query.find({...keyword});
        return this;
    }

    // Now filter functionality will be made
    filter() {
        const queryCopy = {...this.queryStr}
        // Removing some field for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        // Filter for price and rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;   // 50  - 10
        const skip = resultPerPage * (currentPage - 1 );

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;