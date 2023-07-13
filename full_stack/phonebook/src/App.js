import { useState, useEffect } from 'react';
import './App.css';
import pbService from './services/phonebook';

const Heading = ({ text }) => {
  return (
    <h2>{text}</h2>
  );
}

const ConfirmNotification = ({ message }) => {
  if (message) {
    return (
      <div className="confirm">{message}</div>
    );
  }
}

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <div className="error">{errorMessage}</div>
    );
  }
}

const Filter = ({ setFilter }) => {
  return (
    <p>
      filter shown with
      <input onChange={event => setFilter(event.target.value)}/>
    </p>
  );
}

const FormInput = ({ value, onChange }) => {
  return <input value={value} onChange={onChange} />
}

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage, setErrorMessage }) => {
  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.filter(person => person.name === newName);
    if (existingPerson.length > 0) {
      const person = existingPerson[0];
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        pbService
          .update(person.id, { name: newName, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
            setMessage(`updated ${newName}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName('');
            setNewNumber('');
          })
          .catch(() => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            return;
          });
      } else {
        return;
      }
     } else {
        pbService
          .create({ name: newName, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            setMessage('added ' + returnedPerson.name);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName('');
            setNewNumber('');
          });
      }
  }

  return (
    <div>
      <form onSubmit={addPerson}>
        name: 
        <FormInput
          value={newName}
          onChange={event => setNewName(event.target.value)}
        />
        <br />
        number:
        <FormInput
          value={newNumber}
          onChange={event => setNewNumber(event.target.value)}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ persons, setPersons, filter }) => {
  const displayFilter = () => {
    return persons.filter((person) => {
      return person.name.toLowerCase().includes(filter.toLowerCase());
    })
  }

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      pbService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        });
    } else {
      return;
    }
  }
  
  return (
    displayFilter().map((person) => (
      <article key={person.name}>
        {person.name} {person.number} 
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </article>)
    )
  );
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    pbService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes);
      });
    }, []);

  return (
    <div>
      <Heading text="Phonebook" />
      <ConfirmNotification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter setFilter={setFilter}/>
      <Heading text="add a new" />
      <PersonForm 
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
      />
      <Heading text="Numbers" />
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
