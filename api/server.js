// BUILD YOUR SERVER HERE

const express = require('express');
const server = express();
server.use(express.json());
const User = require('./users/model')


module.exports = server; // EXPORT YOUR SERVER instead of {}

server.get('/api/users', (req, res) => {
  User.find()
    .then((users => {
      res.json(users)
    }))
    .catch(err => {
      res.status(500).json({message: 'The users information could not be retrieved', err: err.message})
    })
})

server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({message: "The user with the specified ID does not exist"})
      } else {
        res.json(user)
      }
    })
    .catch(err => {
      res.status(500).json({message: 'The user information could not be retrieved', err: err.message})
    })
})

server.post('/api/users', (req, res) => {
  let user = req.body;
  User.insert(user)
    .then(user => {
      if (!user.name || !user.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
      } else {
        res.status(201).json(user)
      }
    })
    .catch(err => {
      res.status(500).json({message: 'There was an error while saving the user to the database', err: err.message})
    })
})

server.put('/api/users/:id', (req, res) => {
  let id = req.params.id;
  let user = req.body;

  User.update(id, user)
    .then( updatedUser => {

      if (!updatedUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      } else if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
      } else {
        res.status(200).json(updatedUser)
      }
    })
    .catch(err => {
      res.status(500).json({message: 'message: "The user information could not be modified', err: err.message})
    })
})

server.delete('/api/users/:id', (req, res) => {
  User.remove(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({message: "The user with the specified ID does not exist"})
      } else {
        res.status(202).json(user)
      }
    })
    .catch(err => {
      res.status(500).json({message: 'message: "The user could not be removed"', err: err.message})
})
})