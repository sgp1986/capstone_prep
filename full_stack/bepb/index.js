const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(cors());

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

let persons = [
  {
    id: 1,
    name: 'Steve Price',
    number: '780-233-8792',
  },
  {
    id: 2,
    name: 'Joy Ramoso-Price',
    number: '780-266-7887',
  },
  {
    id: 3,
    name: 'Jay Ramoso',
    number: '780-123-4567',
  }
];

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${Object.keys(persons).length} people</p>
    <p>${new Date()}</p>`
    );
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(c => c.id))
    : 0;
  return maxId + 1;
}

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    });
  } else if (persons.some(c => c.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  console.log(person);

  persons = persons.concat(person);

  res.json(person);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const contact = persons.find((c) => c.id === id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
   persons = persons.filter((c) => c.id !== id);

   res.status(204).end();
})

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
