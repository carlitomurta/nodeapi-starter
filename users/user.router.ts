import { User } from './users.model';
import { Router } from '../common/router';
import * as restify from 'restify';

class UserRouter extends Router {
  applyRoutes(application: restify.Server) {
    // FIND ALL
    application.get('/users', (req, resp, next) => {
      User.find().then((users) => {
        resp.json(users);
        return next();
      });
    });

    // FIND BY ID
    application.get('/users/:id', (req, resp, next) => {
      User.findById(req.params.id)
        .then((user) => {
          if (user) {
            resp.json(user);
            return next();
          }
          resp.send(404);
          return next();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // SAVE
    application.post('/users', (req, resp, next) => {
      let user = new User(req.body);
      user.save().then((user) => {
        resp.json(user);
        return next();
      });
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
        .then((user) => {
          resp.json(user);
          return next();
        });
    });

    // PATCH
    application.patch('/users/:id', (req, resp, next) => {
      User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((user) => {
        if (user) {
          resp.json(user);
          return next();
        }
        resp.send(404);
        return next();
      });
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
