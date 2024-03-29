import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note'; 

const Main = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/notes')
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error('Error fetching notes: ', error);
      });
  }, []);

  const addNote = () => {
    axios.post('http://localhost:5000/api/notes', { text: newNote })
      .then(() => {
        axios.get('http://localhost:5000/api/notes') // Fetch updated notes data
          .then(response => {
            setNotes(response.data);
            setNewNote('');
          })
          .catch(error => {
            console.error('Error fetching notes: ', error);
          });
      })
      .catch(error => {
        console.error('Error adding note: ', error);
      });
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(error => {
        console.error('Error deleting note: ', error);
      });
  };

  return (
    <div>
      <header>
        Notes
      </header>
      <div className='textdiv'>
        <input
          type="text"
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder='Take a Note...'
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <ul>
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </ul>
    </div>
  );
};

export default Main;
