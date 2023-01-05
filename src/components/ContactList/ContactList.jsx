import { useSelector, useDispatch } from 'react-redux';
import { getIsLoading, getFilteredContacts } from 'redux/contacts/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';
import { ContactListItem } from './ContactListItem';

import css from './ContactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getFilteredContacts);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.wraperContactList}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className={css.contactList}>
          {contacts.map((contact, id) => (
            <ContactListItem key={id} contact={contact}/>
          ))}
        </ul>
      )}
    </div>
  );
};
