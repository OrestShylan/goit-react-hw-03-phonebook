import PropTypes from 'prop-types';

const ContactListItem = ({ id, name, phone, onRemove }) => {
  return (
    <li>
      {name}: {phone} <button onClick={() => onRemove(id)}> Delete</button>
    </li>
  );
};

export const ContactList = ({ contacts, onRemove }) => {
  if (contacts.lenght === 0) return null;
  return (
    <ul>
      {contacts.map(contact => (
        <ContactListItem key={contact.id} {...contact} onRemove={onRemove} />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
  onRemove: PropTypes.func.isRequired,
};
