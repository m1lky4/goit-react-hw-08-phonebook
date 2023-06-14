import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContactAsync } from '../../redux/phonebookSlice';

const ContactsPage = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDelete = contactId => {
    dispatch(deleteContactAsync(contactId));
  };

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.phone}
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
