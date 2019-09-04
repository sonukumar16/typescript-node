import { Request, Response } from 'express';
import { checkSearchParams } from './validation';
import { getPlacesByName } from './SearchController';
import { AxiosResponse } from 'axios';

export default [
  {
    path: '/api/v1/search',
    method: 'get',
    handler: [
      checkSearchParams /*We can chain things like checking authorization, add caching and many more */,
      async ({ query }: Request, res: Response) => {
        const result:any  = await getPlacesByName(query.q);
        const {data } = result;
        res.status(200).send(data);
      }
    ]
  }
];
