import { useState } from 'react'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom';
import {
  Container, Paper, TextField, Button, Alert, AppBar, Toolbar, IconButton,
  Table, TableContainer, TableRow, TableBody, TableCell
} from '@mui/material';

const Menu = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
        </IconButton>
        <Button color='inherit' component={Link} to='/'>
          anecdotes
        </Button>
        <Button color='inherit'component={Link} to='/create'>
          create new
        </Button>
        <Button color='inherit' component={Link} to='/about'>
          about
        </Button>
      </Toolbar>
    </AppBar>
  )
}

const Anecdote = ({  findAnecdote }) => {
  const id = Number(useParams().id);
  const anecdote = findAnecdote(id);
  return (
    <div>
      <h2>{anecdote.content.value} by {anecdote.author.value}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info.value}>{anecdote.info.value}</a></p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {anecdotes.map(anecdote => 
            <TableRow key={anecdote.id} >
              <TableCell>
                <Link to={`/anecdotes/${anecdote.id}`}>
                  {anecdote.content.value}
                </Link>
              </TableCell>
              <TableCell>
                {anecdote.author.value}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew, setNotification }) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
    setNotification(`a new anecdote ${content.value} created!`)
    setTimeout(() => {
      setNotification(null)
    }, 5000);
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          <TextField label='content' />
        </div>
        <div>
          <TextField label='author' />
        </div>
        <div>
          <TextField label='info' />
        </div>
        <div>
          <Button 
            variant='contained' 
            color='primary' 
            onClick={handleSubmit}
          >
            create
          </Button>
          <Button 
            variant='contained' 
            color='secondary' 
            onClick={() => navigate('/create')}
          >
            reset
          </Button>
        </div>
      </form>
      {/* <Form>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control {...content} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control {...author} />
        </Form.Group>
        <Form.Group>
          <Form.Label>info</Form.Label>
          <Form.Control {...info} />
        </Form.Group>
        <Button variant='primary' onClick={handleSubmit}>create</Button>
        <Button>reset</Button>
      </Form> */}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: { value: 'If it hurts, do it more often' },
      author: { value: 'Jez Humble' },
      info: { value: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html' },
      votes: 0,
      id: 1
    },
    {
      content: { value:'Premature optimization is the root of all evil' },
      author: { value: 'Donald Knuth' },
      info: { value: 'http://wiki.c2.com/?PrematureOptimization' },
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Container>
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Menu />
          {(notification &&
            <Alert severity='success'>
              {notification}
            </Alert>
          )}
        </div>

        <Routes>
          <Route path='/anecdotes/:id' element={<Anecdote findAnecdote={anecdoteById} />} />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
          <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification} />}/>
          <Route path='/about' element={<About />}/>
        </Routes>

        <div>
          <Footer />
        </div>
      </Router>
    </Container>
  )
}

export default App
