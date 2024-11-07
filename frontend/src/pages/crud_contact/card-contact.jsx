import PropTypes from "prop-types";
import { useState } from "react";
import { DialogContact } from "./dialog-contact.jsx";

export function CardContact({
  id,
  username,
  useremail,
  usernumber,
  usermessage,
  contact_at,
  setListContact,
}) {
  const [open, setOpen] = useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };

  return (
    <>
      <DialogContact
        id={id}
        username={username}
        useremail={useremail}
        usernumber={usernumber}
        usermessage={usermessage}
        contact_at={contact_at}
        setListContact={setListContact}
        open={open}
        setOpen={setOpen}
      />

      <div className="card--container">
        <p className="card--name">{username}</p>

        <svg
          onClick={handleClickCard}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 card--svg"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>

        <p className="card--email">{useremail}</p>
        <p className="card--phone">{usernumber}</p>
        <p className="card--message">{usermessage}</p>
        <p className="card--created_at">{contact_at}</p>
      </div>
    </>
  );
}

CardContact.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  useremail: PropTypes.string.isRequired,
  usernumber: PropTypes.string.isRequired,
  usermessage: PropTypes.string.isRequired,
  contact_at: PropTypes.string.isRequired,
  setListContact: PropTypes.func.isRequired,
};