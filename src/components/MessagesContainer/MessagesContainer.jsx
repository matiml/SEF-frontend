import React, { useState } from 'react';
import ClientsColumn from '../ClientsColumn/ClientsColumn';
import SellerColumn from '../SellerColumn/SellerColumn';
import MessagesColumn from '../MessagesColumn/MessagesColumn.jsx';
import './MessagesContainer.scss';

function MessagesContainer() {
  const [selectedSeller, setSelectedSeller] = useState({});
  const [selectedClient, setSelectedClient] = useState({});

  return (
    <div className="msg-container">
      <SellerColumn
        setSelectedSeller={setSelectedSeller}
        selectedSeller={selectedSeller}
      />

      <ClientsColumn
        selectedSeller={selectedSeller}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />

      <MessagesColumn
        selectedClient={selectedClient}
        selectedSeller={selectedSeller}
      />
    </div>
  )
}

export default MessagesContainer;