import { PureComponent } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section';
import ContactForm from './ContactForm';
import Contacts from './Contacts';
import Filter from './Filter';

export class App extends PureComponent {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState(() => {
      return { [name]: value };
    });
  };

  onAddContact = e => {
    e.preventDefault();

    const { name, number } = e.target;

    if (this.onCheckContact(name.value.toLowerCase())) {
      this.setState(() => {
        return { name: '', number: '' };
      });

      return alert(`${name.value} is already in contacts`);
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          { id: nanoid(), name: name.value, number: number.value },
        ],
        name: '',
        number: '',
      };
    });
  };

  onCheckContact = value => {
    return this.state.contacts.some(
      ({ name, number }) => name.toLocaleLowerCase() === value
    );
  };

  onSearchContacts = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  onFilterContacts = () => {
    const contacts = this.state.contacts;
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(this.state.filter)
    );
  };

  onRemoveContact = contactId => {
    const newContacts = this.state.contacts.filter(
      ({ id }) => id !== contactId
    );

    this.setState({
      contacts: newContacts,
    });
  };

  render() {
    return (
      <Section>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          onInputChange={this.onInputChange}
          onAddContact={this.onAddContact}
        />

        {this.state.contacts.length > 0 && (
          <Filter
            label="Find contacts by name"
            value={this.state.filter}
            onSearchContacts={this.onSearchContacts}
          />
        )}

        {this.state.contacts.length > 0 && (
          <Contacts
            contacts={this.onFilterContacts()}
            onRemoveContact={this.onRemoveContact}
          />
        )}
      </Section>
    );
  }
}
