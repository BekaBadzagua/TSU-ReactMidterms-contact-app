import React, { Component } from 'react'
import * as db from './data'
import './addContacts.css'
import PropTypes from 'prop-types'

class AddContact extends Component {
  state = {
    id: this.props.editingContactId ? this.props.editingContactId : Date.now(),
    name: '',
    phone: '',
    email: '',
    errors: []
  }

  componentDidMount() {
    if (this.props.editingContactId) {
      const contactArr = db.getContacts();
      const contact = contactArr.find(c => c.id === this.props.editingContactId);
      this.setState({
        name: contact.name,
        phone: contact.phone,
        email: contact.email
      })
    }

  }

  hanldeChange = (event) => {
    const { name, value } = event.target
    this.setState(
      {
        [name]: value,
      },
      () => { }
    )

  }
  // ფორმის ვალიდაცია
  checkValidity = (contactData) => {
    let newErrors = [];
    if (contactData.name.trim() === "") {
      newErrors.push("Name is Required!");
    }
    if (contactData.phone.trim() === "") {
      newErrors.push("Phone is Required!");
    } else if (!contactData.phone.match(/^[0-9]+$/)) {
      newErrors.push("Phone is in wrong Format!");
    }

    if (contactData.email.trim() === "") {
      newErrors.push("Email is Required!");
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(contactData.email)) {
      newErrors.push("Email is in wrong Format!");
    }

    return newErrors;
  }

  save = () => {
    const contactData = {
      id: this.state.id,
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email
    }
    
    // შეამოწმე ვალიდურობა
    const errorsArr = this.checkValidity(contactData);
    if (errorsArr.length !== 0) {
      this.setState({
        ...this.state,
        errors: errorsArr
      })
      return;
    }

    db.addContact(contactData)
    this.props.handleAddContact(contactData)
    this.props.close()
  }
  edit = () => {
    const contactData = {
      id: this.state.id,
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email
    }

    // შეამოწმე ვალიდურობა
    const errorsArr = this.checkValidity(contactData);
    if (errorsArr.length !== 0) {
      this.setState({
        ...this.state,
        errors: errorsArr
      })
      return;
    }

    db.editContact(contactData);
    const newContacts = db.getContacts();
    this.props.handleEditContact(newContacts)
    this.props.close()
  }


  render() {
    let actionButton = null;
    if (!this.props.editMode) {
      actionButton = (
        <button
          type='button'
          className='btn btn-primary mr-1'
          onClick={this.save}
        >
          დამატება
          </button>
      );
    }
    else {
      actionButton = (
        <button
          type='button'
          className='btn btn-primary mr-1'
          onClick={this.edit}
        >
          რედაქტირება
          </button>
      );
    }

    let errorMassages = this.state.errors !== [] ?
      <div className="ErrorMassageWrapper">
        <ul>
          {this.state.errors.map((errMsg, index) => <li key={index}>{errMsg}</li>)}
        </ul>
      </div> : null;

    return (
      <div className='container filter-form'>
        <h4>კონტაქტის დამატება</h4>
        <hr />
        <br />

        {errorMassages}

        <form>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>დასახელება</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              value={this.state.name}
              name='name'
              onChange={this.hanldeChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>ტელეფონი</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputPassword1'
              value={this.state.phone}
              name='phone'
              onChange={this.hanldeChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>ელ.ფოსტა</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputPassword1'
              value={this.state.email}
              name='email'
              onChange={this.hanldeChange}
            />
          </div>
          {actionButton}
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => this.props.close()}
          >
            დახურვა
          </button>
        </form>
      </div>
    )
  }
}

AddContact.propTypes = {
  editingContactId: PropTypes.number,
  editMode: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  handleAddContact: PropTypes.func.isRequired,
  handleEditContact: PropTypes.func.isRequired
}

export default AddContact;
