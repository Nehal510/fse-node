/**
 * @file Controller RESTful Web service API for tuits resource
 */
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /tuits to retrieve all the tuits
 *     </li>
 *     <li>GET /tuits/:tuitid to retrieve a tuit by id
 *     </li>
 *     <li>POST /tuits to create/post a new tuit
 *     </li>
 *     <li>DELETE /tuits/:tuitid to delete a tuit by id
 *     </li>
 *     <li>PUT /tuits/:tuitid to update a tuit by id
 *     </li>
 *     <li>GET /tuits/:userid to retrieve all the tuits by a specific user
 *     </li>
 * </ul>
 * @property {TuitDao} tuitDao DAO implementing tuits CRUD operations
 * @property {TuitController} TuitController Controller implementing
 * RESTful Web service API for tuits resource
 */
export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tuitid', this.findTuitById);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tuitid', this.deleteTuit);
        this.app.put('/tuits/:tuitid', this.updateTuit);
        this.app.get('/tuits/:userid', this.findTuitsByUser);
    }
    /**
     * Retrieves all the tuits in the database
     * @param {Request} req Represents request from client to find all the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    /**
     * Retrieves a tuit by id
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit object
     */
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit));
    /**
     * A tuit is created/posted by a user
     * @param {Request} req Represents request from client, including the
     * body which contains all the details of the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database
     */
    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    /**
     * Deleting a tuit
     * @param {Request} req Represents request from client, including the
     * path parameters tuitid representing the tuit that needs to be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the tuit was successful or not
     */
    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tuitid)
            .then(status => res.json(status));
    /**
     * Update a specific tuit from the database
     * @param {Request} req Represents request from client, including the
     * path parameters tid representing the tuit to be updated and the
     * body containing the updated tuit.
     * @param {Response} res Represents response to client, including status
     * on whether updating the tuit was successful or not
     */
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.findTuitById, req.body)
            .then(status => res.json(status));
    /**
     * Retrieves all tuits posted by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user for whom the tuits have to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that
     * are posted by a specific user
     */
    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.userId)
            .then(tuit => res.json(tuit));

}

