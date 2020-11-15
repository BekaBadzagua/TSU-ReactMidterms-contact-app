import React from 'react'
import './detailedSearch.css'
import PropTypes from 'prop-types'

const detailedSearch = (props) => {

    return (
        <div className="detailedSearchContainer">
            <h5>დეტალური ძებნა:</h5>
            <form className='filter-form container' style={{ marginTop: '30px' }}>
                <div className='input-group'>
                    <div className="input-wrapper">
                        <label>სახელი</label>
                        <input
                            placeholder='სახელი'
                            name="name"
                            type='text'
                            className='form-control'
                            value={props.detailedSearch.name}
                            onChange={(e) => props.handleSearch(e,'name')}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label>ტელეფონი</label>
                        <input
                            placeholder='ტელეფონი'
                            name="phone"
                            type='text'
                            className='form-control'
                            value={props.detailedSearch.phone}
                             onChange={(e) => props.handleSearch(e,'phone')}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label>ელ.ფოსტა</label>
                        <input
                            placeholder='ელ.ფოსტა'
                            name="email"
                            type='text'
                            className='form-control'
                            value={props.detailedSearch.email}
                             onChange={(e) => props.handleSearch(e,'email')}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
detailedSearch.propTypes = {
    detailedSearch: PropTypes.object.isRequired,
    handleSearch: PropTypes.func.isRequired
  }
export default detailedSearch
