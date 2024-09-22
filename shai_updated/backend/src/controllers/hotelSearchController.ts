import { Router } from 'express';
import { HotelSearchService } from '../services/hotelSearchService';
import { HotelSearchRequest } from '../types/hotelSearchTypes';
import { wsClients } from '../websocket';
import _ from 'lodash';
const router = Router();
const hotelSearchService = new HotelSearchService();


router.post('/search', async (req, res) => {
  try {
    const searchRequest: HotelSearchRequest = req.body;
    const requests = hotelSearchService.search(searchRequest, searchRequest.source);

    const clientId = _.get(searchRequest, 'clientId', null);

    if(_.isNil(clientId)) {
      res.status(400).json({ message: 'Invalid clientId' });
      return;
    }

    try {
      const allRequests = Array.isArray(requests) ? requests : [requests];
      const firstResolved = await Promise.race(allRequests);

      res.json(firstResolved);
  
      const remainingResponses = await Promise.allSettled(allRequests);
      const clientWs = wsClients[clientId];

      const finishedIndex = _.get(_.first(firstResolved), 'requestIndex');
      const successfulResponses = remainingResponses
      .filter(result => result.status === 'fulfilled' &&  _.get(_.first(result.value), 'requestIndex') !== finishedIndex)
        .map(result => _.get(result, 'value'));
  

      if (clientWs) {
        clientWs.send(JSON.stringify(successfulResponses));
      }
  
    } catch (error) {
      res.status(500).json({ message: 'Error handling requests', error });
    }


  } catch (error) {
    res.status(500).json({ success: false });
  }
});


export default router;
