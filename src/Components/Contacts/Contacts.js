import React from 'react';
import PropTypes from 'prop-types';
import s from './Contacts.module.css';

export const Contacts = ({ contacts, deleteFunction }) => {
  return (
    <div>
      <ul>
        {contacts.map(contact => {
          return (
            <li className={s.List} key={contact.id}>
              {contact.name}: {contact.number}
              <button
                className={s.Button}
                type="button"
                onClick={() => {
                  deleteFunction(contact.id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteFunction: PropTypes.func.isRequired,
};
