import * as restify from 'restify';
import { enviroment } from './../common/enviroment';
import { Router } from '../common/router';

export class Server {
  application: restify.Server;

  initRoutes(routers: Router[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: 'nodeapi-starter',
          version: '1.0.0',
        });

        this.application.use(restify.plugins.queryParser());

        // routes
        routers.forEach((router) => {
          router.applyRoutes(this.application);
        });

        this.application.listen(enviroment.server.port, () => {
          resolve(this.application);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initRoutes(routers).then(() => this);
  }
}
