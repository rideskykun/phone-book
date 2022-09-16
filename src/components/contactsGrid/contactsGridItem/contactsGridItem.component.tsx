import React, {FC} from 'react'
import styled from "@emotion/styled";

import {Contact} from "../../../common/interfaces/contact.interface";

const ContactCard = styled.div`
  width: 100%;
  border: 1px solid #c9c9c9;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px 1px rgb(0 0 0 / 0.1);
  overflow: hidden;

  div {
    width: 15%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.1rem;
  }

  p {
    padding: 1rem;
    width: 35%;
    white-space: normal;
  }

  ul {
    padding: 1rem;
    width: 50%;
  }
`

const FavButton = styled.button`
  height: 2.5rem;
  border-bottom-left-radius: 0.8rem;
  padding: 0 0.7rem;
  background-color: #e8e8e8;
  color: gray;
  border: none;
  font-size: 1rem;
  transition: 0.3s;

  :hover {
    background-color: #ffe221;
    color: white;
    cursor: pointer;
  }

`

const ContactsGridItem:FC<{contact: Contact}> = ({contact} : { contact:Contact }) => {
    return(
        <ContactCard>
            {/*<p>ID : {contact.id}</p>*/}
            <p>{`${contact.first_name} ${contact.last_name}`}</p>
            <ul>
                {contact.phones.map(p => (
                    <li>{p.number}</li>
                ))}
            </ul>
            <div>
                <FavButton>&#9733;</FavButton>
            </div>
        </ContactCard>
    )
}

export default ContactsGridItem;