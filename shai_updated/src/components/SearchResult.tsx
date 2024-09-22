import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f5f5;
`;

const HotelCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const HotelImage = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
`;

const HotelDetails = styled.div`
  flex-grow: 1;
`;

const HotelTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 5px;
  color: #333;
`;

const HotelInfo = styled.p`
  margin: 2px 0;
  font-size: 14px;
  color: #555;
`;

const PriceTag = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #1a73e8;
`;

interface SearchResultProps {
  searchResult: Array<any>;
}

const SearchResult: React.FC<SearchResultProps> = ({ searchResult }) => {
  return (
    <ResultContainer>
      <h3>Select your ski trip</h3>
      {searchResult.map((hotel) => (
        <HotelCard key={hotel.code}>
          <HotelImage src={hotel.images[0].url} alt={hotel.name} />
          <HotelDetails>
            <HotelTitle>{hotel.name}</HotelTitle>
            <HotelInfo>Rating: {hotel.rating} ★</HotelInfo>
            <HotelInfo>
              Location: {hotel.location.lat}, {hotel.location.long}
            </HotelInfo>
            <HotelInfo>
              Nearby: {hotel.location.nearBy[0]?.name}, {hotel.location.nearBy[0]?.distance}
            </HotelInfo>
            <PriceTag>Price: {hotel.priceAfterTax} per night</PriceTag>
          </HotelDetails>
        </HotelCard>
      ))}
    </ResultContainer>
  );
};

export default SearchResult;