import { Request, Response } from 'express';
import db from '../models';

const Book = db.books;
const Op = db.Op;

// Create and Save a new Book
export const create = (req: Request, res: Response): void => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Book
  const book = {
    title: req.body.title,
    author: req.body.author,
    published: req.body.published ? req.body.published : false
  };

  // Save Book in database
  Book.create(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    });
};

// Retrieve all Books from the database.
export const findAll = (req: Request, res: Response): void => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Book.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books."
      });
    });
};

// Find a single Book with an id
export const findOne = (req: Request, res: Response): void => {
  const id = req.params.id;

  Book.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Book with id = ${id}`
      });
    });
};

// Update a Book by the id in the request
export const update = (req: Request, res: Response): void => {
  const id = req.params.id;

  Book.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Book with id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
export const deleteBook = (req: Request, res: Response): void => {
  const id = req.params.id;

  Book.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id
      });
    });
};

// Delete all Books from the database.
export const deleteAll = (req: Request, res: Response): void => {
  Book.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Books were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all books."
      });
    });
};

// Find all published Books
export const findAllPublished = (req: Request, res: Response): void => {
  Book.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books."
      });
    });
};
