"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TuitController {
    constructor(app, tuitDao) {
        this.findAllTuits = (req, res) => this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
        this.findTuitById = (req, res) => this.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit));
        this.createTuit = (req, res) => this.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
        this.deleteTuit = (req, res) => this.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status));
        this.updateTuit = (req, res) => this.tuitDao.updateTuit(req.params.findTuitById, req.body)
            .then(status => res.json(status));
        this.findTuitsByUser = (req, res) => this.tuitDao.findTuitsByUser(req.params.userId)
            .then(tuit => res.json(tuit));
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tuitid', this.findTuitById);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tuitid', this.deleteTuit);
        this.app.put('/tuits/:tuitid', this.updateTuit);
        this.app.get('/tuits/:userid', this.findTuitsByUser);
    }
}
exports.default = TuitController;
