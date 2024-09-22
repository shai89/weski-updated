import { TripSearch } from '../components/SearchBar';
import axios from 'axios';
import { HotelSearchResult } from './HotelSearch.types';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';

export const useAPI = 'amazon';

const serverUrl = 'http://localhost:5000';

const formatDate = (date: Dayjs | null | undefined): string => {
  return date ? dayjs(date).format('MM/DD/YYYY') : ''; // Ensure date is Dayjs
};

const APIs = {
  'amazon': {
    queryKeys: ['ski_site', 'from_date', 'to_date', 'group_size'],
  },
};

export const initiateSearch = async (searchDetails: TripSearch): Promise<{ searchId: string }> => {
  const apiData = _.get(APIs, useAPI, null);
  const queryKeys = _.get(apiData, 'queryKeys', []);
  
  const searchPayload: any = {
    query: _.pick(searchDetails, queryKeys),
  };

  searchPayload.query.from_date = formatDate(searchPayload.query.from_date as Dayjs | null);
  searchPayload.query.to_date = formatDate(searchPayload.query.to_date as Dayjs | null);

  const response = await axios.post(`${serverUrl}/hotels/search`, searchPayload);
  return response.data;
};

export const fetchSearchResult = async (searchIdentifier: string): Promise<HotelSearchResult> => {
  const response = await axios.get(`${serverUrl}/hotels/search/${searchIdentifier}`);
  return response.data;
};
