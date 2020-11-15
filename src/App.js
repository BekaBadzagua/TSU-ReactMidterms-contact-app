import React from 'react'
import Header from './Header'
import ContactList from './contact-list/ContactList'
import AddContact from './AddContact'
import Search from './search/Search'
import DetailedSearch from './search/detailedSearch'
import * as db from './data'
import './App.css'

class App extends React.Component {
  state = {
    contacts: null,
    isEnable: true,
    searchValue: '',
    addForm: false,
    editMode: false,
    editingContactId: null,
    detailedSearch: {
      enabled: false,
      name: '',
      phone: '',
      email: ''
    }
  }

  componentDidMount() {
    const data = db.getContacts()
    this.setState({ contacts: data })
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate', prevState, this.state)
    if (prevState.searchValue !== this.state.searchValue || prevState.detailedSearch !== this.state.detailedSearch) {

      let data = null;

      if (this.state.detailedSearch.enabled) {
        data = db
          .getContacts()
          .filter((contact) =>
            contact.name
              .toUpperCase()
              .includes(this.state.detailedSearch.name.toUpperCase()) &&
            contact.email
              .toUpperCase()
              .includes(this.state.detailedSearch.email.toUpperCase()) &&
            contact.phone
              .toUpperCase()
              .includes(this.state.detailedSearch.phone.toUpperCase())
          )
      }
      else {
        data = db
          .getContacts()
          .filter((contact) =>
            contact.name
              .toUpperCase()
              .includes(this.state.searchValue.toUpperCase())
          )
      }


      this.setState({ contacts: data })
    }
  }

  handleClick = (id) => {
    const contactData = this.state.contacts.filter((x) => x.id !== id)
    this.setState({ contacts: contactData })
  }
  handleClose = () => {
    this.setState({ addForm: false, editMode: false, editingContactId: null })
  }
  hendleShowAddForm = () => {
    this.setState({ addForm: true, editMode: false, editingContactId: null })
  }
  handleShowEditForm = (id) => {
    this.setState({ addForm: true, editMode: true, editingContactId: id })
  }
  showDetailedSearchFormHandler = () => {
    this.setState({
      ...this.state,
      detailedSearch: {
        ...this.state.detailedSearch,
        enabled: !this.state.detailedSearch.enabled
      }
    })
  }
  handleRemoveContact = (id) => {
    db.removeContact(id);
    let newContacts = [...this.state.contacts].filter(c => c.id !== id);
    this.setState({ contacts: newContacts });
  }
  handleAddContact = (contact) => {
    this.setState({ contacts: [...this.state.contacts, contact] })
  }
  handleEditContact = (newContacts) => {
    this.setState({ contacts: newContacts })
  }
  onSearch = (e) => {
    this.setState({ searchValue: e.target.value })
  }
  onDetailedSearch = (event, inputName) => {
    this.setState({
      ...this.state,
      detailedSearch: {
        ...this.state.detailedSearch,
        [inputName]: event.target.value
      }
    });
  }

  render() {
    let searchComponent = this.state.detailedSearch.enabled ?
      <DetailedSearch
        detailedSearch={this.state.detailedSearch}
        handleSearch={this.onDetailedSearch} />
      :
      <Search
        searchValue={this.state.searchValue}
        handleSearch={this.onSearch}
      />


    return (
      <>
        <Header />
        <button
        className="custoButton"
          type='button'
          onClick={this.showDetailedSearchFormHandler}

        >{this.state.detailedSearch.enabled ? 'ძებნა სახელით' : 'დეტალური ძებნა'}</button>

        {searchComponent}

        {/* დამატების ღილაკი ამოვიღე ძებნის კომპონენტიდან და აქ ჩავსვი, 
          ძებნის კომპონენტის შეცვლისას რომ არ გამქრალიყო*/}
        < button
          className='btn btn-outline-secondary'
          id="addButton"
          type='button'
          onClick={this.hendleShowAddForm}
          disabled={this.state.editMode}
        >
          დამატება
          </button>

        {
          this.state.addForm ? (
            <AddContact
              close={this.handleClose}
              handleAddContact={this.handleAddContact}
              handleEditContact={this.handleEditContact}
              editMode={this.state.editMode}
              editingContactId={this.state.editingContactId}
            />
          ) : (
              <ContactList
                contacts={this.state.contacts}
                handleRemoveContact={this.handleRemoveContact}
                handleShowEditForm={this.handleShowEditForm}
              />
            )
        }
      </>
    )
  }
}
export default App
