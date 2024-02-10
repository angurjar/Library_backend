import { Router, Request, Response } from 'express';
import { create, findAll, findAllPublished, findOne, update, deleteBook, deleteAll } from '../controllers/book.controller';

const router = Router();


router.post("/", create);

router.get("/", findAll);


router.get("/published", findAllPublished);

router.get("/:id", findOne);

router.put("/:id", update);

router.delete("/:id", deleteBook);


router.delete("/", deleteAll);

export default (app: any): void => {
  app.use("/api/books", router);
};
