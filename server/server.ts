import * as restify from 'restify';
import * as mongoose from 'mongoose';
import { enviroment } from './../common/enviroment';
import { Router } from '../common/router';
import { mergePatchBodyParser } from './merge-patch.parser';

export class Server {
  application: restify.Server;

  initializeDb(): Promise<any> {
    (<any>mongoose.Promise) = global.Promise;
    return mongoose.connect(enviroment.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  initRoutes(routers: Router[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: 'nodeapi-starter',
          version: '1.0.0',
        });

        // PLUGINS
        this.application.use(restify.plugins.queryParser());
        this.application.use(restify.plugins.bodyParser());
        this.application.use(mergePatchBodyParser);

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
    return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
  }
}
