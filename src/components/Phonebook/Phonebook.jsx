import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContactAsync } from '../../redux/phonebookSlice';

const Phonebook = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '' || phone.trim() === '') {
      return;
    }

    dispatch(addContactAsync({ name, phone }));

    setName('');
    setPhone('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </label>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default Phonebook;
