"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const utils_1 = require("../../utils");
const axios_1 = __importDefault(require("axios"));
const middleware_1 = __importDefault(require("../../middleware"));
const errorHandlers_1 = __importDefault(require("../../middleware/errorHandlers"));
const routes_1 = __importDefault(require("../../services/search/routes"));
jest.mock('axios');
/* jest.setTimeout(50000); */
axios_1.default.get.mockImplementation(() => Promise.resolve({ data: { features: [] } }));
/*
const resp = { data: { features: [] } };
(axios as any).get.mockResolvedValue(resp); */
describe("Search Routes", () => {
    let app;
    beforeEach(() => {
        jest.setTimeout(30000);
        app = express_1.default();
        utils_1.applyMiddleware({ middleware: middleware_1.default, app });
        utils_1.applyRoutes({ routes: routes_1.default, router: app });
        utils_1.applyMiddleware({ middleware: errorHandlers_1.default, app });
    });
    test('a valid string query', (done) => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(app).get('/api/v1/search?q=Cham');
        expect(response.status).toEqual(200);
        done();
    }));
    test('a non-existing api method', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(app).get('/api/v11/search');
        expect(response.status).toEqual(404);
    }));
    test('an empty string', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield supertest_1.default(app).get('/api/v1/search?q=');
        expect(response.status).toEqual(400);
    }));
    /*  test('a service is not available', async () => {
      (axios as any).get.mockRejectedValue('Service Unavailable.');
       const response = await request(app).get('/api/v1/search?q=Paris');
       console.log("check response::::::::::::::",response)
       expect(response).toEqual('Service Unavailable.');
     }); */
});
//# sourceMappingURL=routes.test.js.map