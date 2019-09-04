"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddleware = ({ middleware, app }) => {
    for (const f of middleware) {
        f(app);
    }
};
exports.applyRoutes = ({ routes, router }) => {
    for (const route of routes) {
        const { path, method, handler } = route;
        router[method](path, handler);
    }
};
//# sourceMappingURL=index.js.map