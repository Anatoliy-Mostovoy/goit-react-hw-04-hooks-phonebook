import React, { Component } from 'react';
import { Form } from './Components/Form/Form';
import { Contacts } from './Components/Contacts/Contacts';
import { Filter } from './Components/Filter/Filter';
import s from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const contactsPars = JSON.parse(contacts);
    if (contactsPars) {
      this.setState({ contacts: contactsPars });
    }
  }

  getSubmitData = data => {
    console.log(data);
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase(),
      )
    ) {
      toast.error('Hey, this name always here!');
      return;
    }

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, data] };
    });
  };

  changeFilterValue = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handelDelete = data => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== data),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;
    return (
      <>
        <h1 className={s.Title}>PhoneBook</h1>
        <Form submitMethod={this.getSubmitData} />
        <h2 className={s.Title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilterValue} />
        <Contacts
          contacts={visibleContacts}
          deleteFunction={this.handelDelete}
        />
        <ToastContainer />
      </>
    );
  }
}
