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

        removeFields.forEach(key => delete queryCopy[key])
        this.query = this.query.find(queryCopy);
        return this;
    }
}

module.exports = ApiFeatures;