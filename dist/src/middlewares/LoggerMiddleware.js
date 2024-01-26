"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
class LoggerMiddleware {
    static log(request, response, next) {
        console.log(`[${new Date().toISOString()}] ${request.method} ${request.path}`);
        next();
    }
}
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=LoggerMiddleware.js.map