require('dotenv').config()

const express = require('express')

const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
)

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<div>Phonebook has info for ${
        persons.length
      } people</div> <div>${new Date()}</div>`,
    )
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person)
      else response.status(404).end()
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  const { body } = request

  if (body.name && body.number) {
    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person
      .save()
      .then((savedPerson) => {
        response.json(savedPerson)
      })
      .catch((error) => next(error))
  }

  return response.status(400).json({
    error: 'name or number missing',
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request

  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
