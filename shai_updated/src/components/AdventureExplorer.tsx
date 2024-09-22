import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import styled from 'styled-components';
import axios from 'axios';

import { useAPI } from '../services/HotelSearch.service';
import useWebSocket from "react-use-websocket"
import {clientId} from '../utils/utils'
import _ from 'lodash';

const ExplorerContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Notification = styled.div<{ type: 'error' | 'success' }>`
  color: ${(props) => (props.type === 'error' ? 'red' : 'green')};
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

const WS_URL = "ws://127.0.0.1:5000";
const AdventureExplorer: React.FC = () => {
  const [result, setResult] = useState<Array<any>>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {lastJsonMessage, sendMessage} = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
      onOpen: () => sendMessage(clientId)
    },
  )

  useEffect(() => {
    if(lastJsonMessage && Array.isArray(lastJsonMessage)){
      setResult(prevHotel => _.uniqBy([...prevHotel, ...lastJsonMessage[0]], 'code'));
    }
  }, [lastJsonMessage]) 

  const onSearchHandler = async (search: any) => {
    try {
      setLoading(true);
      setResult([]);
      setNotification(null);

      const response = await axios.post('http://localhost:5000/hotels/search', {...search, clientId, source: useAPI});
      setResult(response.data);

      setLoading(false);
    } catch (e) {
      console.error('Search Error:', e);
      setNotification('Failed searching hotels');
      setLoading(false);
    }
  };

  return (
    <ExplorerContainer>
      <SearchBar onSearch={onSearchHandler} loading={loading} />
      {notification && <Notification type="error">{notification}</Notification>}
      {result && <SearchResult searchResult={result} />}
    </ExplorerContainer>
  );
};

export default AdventureExplorer;
