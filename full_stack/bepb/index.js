require('dotenv').config({ path: 'pb.env' });
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny', { 
  skip: (req, res) => { return req.method === 'POST' } 
}));

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', { 
  skip: (req, res) => { return req.method !== 'POST' }
}));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};
app.use(errorHandler);

// let persons = [
//   {
//     id: 1,
//     name: 'Steve Price',
//     number: '780-233-8792',
//   },
//   {
//     id: 2,
//     name: 'Joy Ramoso-Price',
//     number: '780-266-7887',
//   },
//   {
//     id: 3,
//     name: 'Jay Ramoso',
//     number: '780-123-4567',
//   }
// ];

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  Person.find({}).then(result => {
    res.send(
      `<p>Phonebook has info for ${result.length} people</p>
      <p>${new Date()}</p>`
      );
  })
  .catch(error => console.log(error));
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  }).catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson);
    })
    .catch(error => next(error));
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
