import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { v4 as uuid } from 'uuid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    number: '',
  };

  handleAddContact = newContact => {
    if (this.handleCheckName(newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return false;
    }
    this.setState(({ contacts }) => ({
      contacts: [...contacts, { ...newContact, id: uuid() }],
    }));
    return true;
  };

  handleCheckName = name => {
    const { contacts } = this.state;
    const isExistContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    return isExistContact;
  };

  handleRemoveContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  handleFilterChange = filter => this.setState({ filter });
  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filterContacts = this.getContacts();

    return (
      <div className="formSection">
        <h1> Phone book </h1>
        <ContactForm onAdd={this.handleAddContact} />
        <h2> Contacts </h2>

        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filterContacts}
          onRemove={this.handleRemoveContact}
        />
      </div>
    );
  }
}
