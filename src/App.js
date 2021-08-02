import React, { useState, useEffect } from 'react';
import { Form } from './Components/Form/Form';
import { Contacts } from './Components/Contacts/Contacts';
import { Filter } from './Components/Filter/Filter';
import s from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const contactsPars = JSON.parse(contacts);
    if (contactsPars) {
      setContacts(contactsPars);
    }
  }, []);

  const getSubmitData = data => {
    console.log(contacts);
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase(),
      )
    ) {
      toast.error('Hey, this name always here!');
      return;
    }

    setContacts([...contacts, data]);
  };

  const changeFilterValue = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const handelDelete = data => {
    setContacts(contacts.filter(contact => contact.id !== data));
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <h1 className={s.Title}>PhoneBook</h1>
      <Form submitMethod={getSubmitData} />
      <h2 className={s.Title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilterValue} />
      <Contacts contacts={visibleContacts} deleteFunction={handelDelete} />
      <ToastContainer />
    </>
  );
};
