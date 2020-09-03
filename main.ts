import { usersRouter } from './users/user.router';
import { Server } from './server/server';

const server = new Server();
server
  .bootstrap([usersRouter])
  .then((server) => {
    console.log('API is listening on:', server.application.address());
  })
  .catch((error) => {
    console.error('Server failed to start');
    console.error(error);
    process.exit(1);
  });
