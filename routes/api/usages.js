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

module.exports = function(pathMap){
    let usages = new Usages();

    pathMap['/api/usages'] = function(request, response){
        let body = [];
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();

            // Store the supplied usage data
            let usageId = usages.insert(body);

            response.writeHead(201, {'Content-Type': 'application/json'});
            response.write('{"id":' + usageId + '}');
            response.end();
        });
    };
};
