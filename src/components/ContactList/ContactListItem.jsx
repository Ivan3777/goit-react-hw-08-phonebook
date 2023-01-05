import css from './ContactList.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from 'redux/contacts/operations';

export const ContactListItem = ({ contact }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        return;
      case 'number':
        setNumber(value);
        return;
      default:
        return;
    }
  };

  const handleEdit = () => {
    setIsEdit(prev => !prev);
    if (isEdit && (name !== contact.name || number !== contact.number)) {
      return dispatch(
        editContact({
          ...contact,
          name,
          number,
        })
      );
    }
  };

  return (
    <li className={css.contactListItem}>
      {isEdit ? (
        <>
          <label>
            Name
            <input
              onChange={handleChange}
              name="name"
              type="text"
              value={name}
            />
          </label>{' '}
          <label>
            Number
            <input
              onChange={handleChange}
              name="number"
              type="text"
              value={number}
            />
          </label>
        </>
      ) : (
        <>
          <span>Name: {contact.name}</span>
          <span>Number: {contact.number}</span>
        </>
      )}
      <button
        type="button"
        className={css.contactListItemBtn}
        onClick={handleEdit}
      >
        {isEdit ? 'Save' : 'Edit'}
      </button>
      <button
        type="button"
        className={css.contactListItemBtn}
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Delete
      </button>
    </li>
  );
};
