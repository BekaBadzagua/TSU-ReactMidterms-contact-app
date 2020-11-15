import React from 'react'
import './ContactListItem.css'

function ContactListItem({ contact: { id, name, phone,email }, index, removeContact, editContact }) {
  return (
    <div className='card mt-3'>
      <div className='card-body'>
        <p  onClick={() => editContact(id)}>{name} <br/> {phone} || {email}</p> 
        
        <button
          className='btn btn-danger float-right'
          onClick={() => removeContact(id)}
        >
          X
        </button>
      </div>
    </div>
  )
}

export default ContactListItem
