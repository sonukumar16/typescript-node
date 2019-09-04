import express, { Router,Application } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import axios from "axios";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "../../services/search/routes";

jest.mock('axios');
/* jest.setTimeout(50000); */

(axios as any).get.mockImplementation(() =>
  Promise.resolve({ data: { features: [] } })
);
/* 
const resp = { data: { features: [] } };
(axios as any).get.mockResolvedValue(resp); */

describe("Search Routes",()=>{
    let app: Application;
  beforeEach(() => {
    jest.setTimeout(30000)
    app = express();
    applyMiddleware({middleware, app});
    applyRoutes({routes, router:app});
    applyMiddleware({middleware:errorHandlers, app});
  });

  test('a valid string query', async done => {      
     const response = await request(app).get('/api/v1/search?q=Cham');
     expect(response.status).toEqual(200);
     done();     
  });
   test('a non-existing api method', async () => {
     const response = await request(app).get('/api/v11/search');
     expect(response.status).toEqual(404);
   });

   test('an empty string', async () => {
     const response = await request(app).get('/api/v1/search?q=');
     expect(response.status).toEqual(400);
   });
   /*  test('a service is not available', async () => {
     (axios as any).get.mockRejectedValue('Service Unavailable.');
      const response = await request(app).get('/api/v1/search?q=Paris');
      console.log("check response::::::::::::::",response)
      expect(response).toEqual('Service Unavailable.');
    }); */
})

