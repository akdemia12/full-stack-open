// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import service from './services/contact';
import './index.css'
 
const Persons = ({filteredPersons, persons, setPersons}) => {
/* console.log(filteredPersons) */
  return (
    <>
      {filteredPersons.map( person => (
        <Person key={person.name} name={person.name} num={person.num} id={person.id} filteredPersons={filteredPersons} persons={persons} setPersons={setPersons}/>
      ))}
    </> 
  );
};
Persons.propTypes = {
  filteredPersons: PropTypes.array.isRequired
};

// eslint-disable-next-line react/prop-types
const Person = ({name, num, id, persons, setPersons }) =>{
  const deletePerson = (id) =>{

    if(window.confirm('Are you sure you want to delete this contact?')){
      service.clean(id)
      .then(() => {
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
      })
    }
    
  
    
    
  } 
  return(
    <>
    <p>{name}  {num}</p> 
    <button onClick={()=> deletePerson(id)} >Delete</button>
    </>
    

  )
  
}
Person.propTypes = {
  num: PropTypes.string.isRequired,
  name:PropTypes.string.isRequired 
};



const Filter = ({onChange, value}) =>{
  return(
    <>
     <h3>Search by name</h3>
   <input onChange={onChange} value={value} />
    </>
   
  )
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired 
};

const Form = ({addPerson, addNewName, newName, addNewNum, newNum}) => {

  return(
    <>
     <h3>Add a contact</h3>

     <form onSubmit={addPerson}>
        <div>
          name: <input onChange={addNewName} value={newName} />

        </div>
        <div>
          number: <input onChange={addNewNum}  value={newNum}/>

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )

}

Form.propTypes = {
  addPerson: PropTypes.func.isRequired,
  addNewName: PropTypes.func.isRequired,
  addNewNum: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  newNum: PropTypes.string.isRequired 
};

const Notification = ({message, isError}) =>{
  if (message === null) {
    return null
  }
  return(
    <div>
      {isError ? <h1 className='added'>{message}</h1> : <h1 className='error'>{message}</h1>  }
    </div>
  )

}
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(true)
 
 

  useEffect(() => {
    console.log('effect')
    service.get()
      .then(response => {
        console.log(response)
       setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

 

 
  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find((person) => person.name === newName || person.num === newNum);
    

    if (personExists) {
      if (persons.some((person) => person.num === newNum)) {
        alert(`${newNum} is already in use`);
        
      } else {
        
        if(window.confirm(`${newName} is already used, you want to change the numer`)){
          service.update(personExists, newNum)
          .then(() => {
            // actualizar la lista de contactos después de actualizar el número de teléfono
            service.get().then((response) => {
              setPersons(response.data);
              setNewName("");
              setNewNum("");
            });
          })
          .catch(error =>{

            setMessage(`The contact ${newName} has already been removed from the server`),
            setIsError(false)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
          );
            
          
        }
        
      }
      return;
    }
    
    const personObject = {
      name: newName,
      num: newNum
    };
  
    service.post(personObject)
    .then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNum("");
      setMessage(`${newName} was added`);
      setIsError(true);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    });
  };

  const addNewName = (event) => {
    /* console.log(event.target.value); */
    setNewName(event.target.value);
  };
  const addNewNum = (event) => {
    /* console.log(event.target.value) */
    setNewNum(event.target.value);
  };

  const handleSearch = (event) => {
    /* console.log(event.target.value); */
    setSearchName(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  ); 

 

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} isError={isError}/>
        <Filter onChange={handleSearch} value={searchName}/>
        <Form addPerson={addPerson} addNewName={addNewName} addNewNum={addNewNum} newName={newName} newNum={newNum} />
      <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} persons={persons} setPersons={setPersons}/>
    </div>
  );
};

export default App;
