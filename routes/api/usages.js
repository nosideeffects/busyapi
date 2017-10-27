let storeSize = 2048;
let storeMask = storeSize - 1;

class Usages {
    constructor() {
        this.store = [];
        this.currentId = 0;
    }

    insert(usage) {
        let nextId = this.currentId++;
        // simulate buffer before persisting somewhere
        this.store[nextId & storeMask] = usage;

        return nextId;
    }
}

module.exports = function(app){
    app.usages = new Usages();

    app.post('/api/usages', function(req, res){

        // Store the supplied usage data
        let usageId = app.usages.insert(req.body);

        res.status(201).json({'id':usageId});
    });
};
