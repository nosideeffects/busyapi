// API
let pathMap = {};
require('./routes/api/usages')(pathMap);

module.exports = (request, response) => {

  const { method, url } = request;

  response.on('error', (err) => {
    response.statusCode = 500;
    response.end();
  });

  if (method === 'POST') {
      let endpoint = pathMap[url];
      if (endpoint) {
        endpoint(request, response);
        return;
      }
  }

  response.statusCode = 404;
  response.end();
};
