import React, {useState } from 'react';
import './App.css';
import List from './components/List';
import AddToList from './components/AddToList';

export interface IState {
  people: {
    name: string
    age: number
    url: string
    note?: string
  }[]
}

function App() {

  const [people, setPeople] = useState<IState["people"]>([
    {
      name: "Kawhi Leonard",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Kawhi_Leonard_%287440607%29_%28cropped%29.jpg/800px-Kawhi_Leonard_%287440607%29_%28cropped%29.jpg",
      age: 34,
      note: "Has No MCLs or ACLs"
    }
  ]);


 
  return (
    <div className="App">
      <h1>People Invited to my Party</h1>
      <List people={people} />
      <AddToList people={people} setPeople={setPeople} />
    </div>
  );
}

export default App;
