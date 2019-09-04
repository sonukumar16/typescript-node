"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const middleware_1 = __importDefault(require("./middleware"));
const services_1 = __importDefault(require("./services"));
const errorHandlers_1 = __importDefault(require("./middleware/errorHandlers"));
const app = express_1.default();
const { PORT = 3000 } = process.env;
utils_1.applyMiddleware({ middleware: middleware_1.default, app });
utils_1.applyRoutes({ routes: services_1.default, router: app });
utils_1.applyMiddleware({ middleware: errorHandlers_1.default, app });
const server = http_1.default.createServer(app);
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}...`));
exports.default = server;
//# sourceMappingURL=server.js.map