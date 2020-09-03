import { User } from './users.model';
import { Router } from '../common/router';
import * as restify from 'restify';

class UserRouter extends Router {
  constructor() {
    super();
    this.on('beforeRender', (document) => {
      document.password = undefined;
    });
  }

  applyRoutes(application: restify.Server) {
    // FIND ALL
    application.get('/users', (req, resp, next) => {
      User.find().then(this.render(resp, next));
    });

    // FIND BY ID
    application.get('/users/:id', (req, resp, next) => {
      User.findById(req.params.id).then(this.render(resp, next));
    });

    // SAVE
    application.post('/users', (req, resp, next) => {
      let user = new User(req.body);
      user.save().then(this.render(resp, next));
    });

    // UPDATE ONE
    application.put('/users/:id', (req, resp, next) => {
      User.updateOne({ _id: req.params.id }, req.body)
        .exec()
        .then((result) => {
          if (result.n) {
            return User.findById(req.params.id);
          } else {
            resp.send(404);
          }
        })
        .then(this.render(resp, next));
    });

    // PATCH
    application.patch('/users/:id', (req, resp, next) => {
      User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(this.render(resp, next));
    });

    // DELETE
    application.del('/users/:id', (req, resp, next) => {
      User.deleteOne({ _id: req.params.id })
        .exec()
        .then((cmd) => {
          if (cmd.n) {
            resp.send(204);
          } else {
            resp.send(404);
          }
          return next();
        });
    });
  }
}

export const usersRouter = new UserRouter();
