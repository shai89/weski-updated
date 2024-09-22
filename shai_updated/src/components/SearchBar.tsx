import React, { useState } from 'react';
import styled from 'styled-components';
import { CircularProgress, MenuItem, Select as MuiSelect } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { siteData } from '../utils/utils';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SelectChangeEvent } from '@mui/material';
import weskiIcon from '../icon/weski-icon.svg';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SearchButton = styled.button`
  height: 40px;
  min-width: 120px;
  position: relative;
  padding: 10px 20px;
  border: none;
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

export type TripSearch = {
  ski_site: number;
  from_date: Dayjs | null;
  to_date: Dayjs | null;
  group_size: number;
};

const getDefaultSearch = (): TripSearch => ({
  ski_site: 1,
  from_date: dayjs(),
  to_date: dayjs().add(1, 'day'),
  group_size: 2,
});

interface Props {
  onSearch: (search: TripSearch) => void;
  loading?: boolean;
}

const SearchBar: React.FC<Props> = ({ onSearch, loading }) => {
  const [search, setSearch] = useState<TripSearch>(getDefaultSearch());

  const onSiteChange = (event: SelectChangeEvent<number>) => {
    setSearch((prev) => ({ ...prev, ski_site: event.target.value as number }));
  };

  const onGroupChange = (event: SelectChangeEvent<number>) => {
    setSearch((prev) => ({ ...prev, group_size: event.target.value as number }));
  };

  const onStartDateChange = (newValue: Dayjs | null) => {
    setSearch((prev) => ({
      ...prev,
      from_date: newValue || prev.from_date,
    }));
  };

  const onEndDateChange = (newValue: Dayjs | null) => {
    setSearch((prev) => ({
      ...prev,
      to_date: newValue || prev.to_date,
    }));
  };

  return (
    <SearchBarContainer>
        <img src={weskiIcon} alt="WeSki Icon" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
      <DropdownsContainer>
        <MuiSelect
          value={search.ski_site}
          onChange={onSiteChange}
          displayEmpty
          variant="outlined"
        >
          {siteData.map((site) => (
            <MenuItem key={site.id} value={site.id}>
              {site.name}
            </MenuItem>
          ))}
        </MuiSelect>

        <MuiSelect
          value={search.group_size}
          onChange={onGroupChange}
          displayEmpty
          variant="outlined"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <MenuItem key={index} value={index + 1}>
              {index + 1} people
            </MenuItem>
          ))}
        </MuiSelect>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={search.from_date}
            onChange={onStartDateChange}
          />
          <DatePicker
            label="End Date"
            value={search.to_date}
            onChange={onEndDateChange}
          />
        </LocalizationProvider>
      </DropdownsContainer>

      <SearchButton onClick={() => onSearch(search)} disabled={loading}>
        {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Search'}
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;