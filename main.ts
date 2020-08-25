import * as restify from 'restify';

const server = restify.createServer({
  name: 'nodeapi-starter',
  version: '1.0.0',
});

server.get('/hello', (req, resp, next) => {
  resp.json({ message: 'hello' });
  return next();
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
