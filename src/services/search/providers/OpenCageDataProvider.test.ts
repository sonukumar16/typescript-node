import axios from 'axios';
import * as Provider from './OpenCageDataProvider';

jest.mock('axios');

describe('OpenCageDataProvider', () => {
  
  test('an empty query string', async () => {
    const resp = { data: { features: [] } };
    (axios as any).get.mockResolvedValue(resp);
    const {data } = await Provider.getPlaces('Paris');
    expect(data).toEqual({ features: [] });
  });

   test('an invalid non-json response', async () => {
    (axios as any).get.mockRejectedValue('Service Unavailable.');
    await expect(Provider.getPlaces('Chamonix')).rejects.toEqual('Service Unavailable.');     
  });
  
});
