import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Note = ({ note, onDelete }) => {
  return (
    <div className='maindiv'>
    <div className='notesdiv'>
      <span>{note.text}</span>
      <p>{note.timestamp}</p>
      <button onClick={() => onDelete(note.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
    </div>
  );
};

export default Note;

