"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// src/controllers/UserController.ts
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
// @ts-ignore
let UserController = (() => {
    let _classDecorators = [(0, inversify_1.injectable)(), (0, inversify_express_utils_1.controller)('/users')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createUser_decorators;
    let _getUserById_decorators;
    var UserController = _classThis = class {
        // @ts-ignore
        constructor(userService) {
            this.userService = (__runInitializers(this, _instanceExtraInitializers), void 0);
            this.userService = userService;
        }
        // @ts-ignore
        // @ts-ignore
        async createUser(req, res) {
            const { name, email, password } = req.body;
            const user = await this.userService.createUser(name, email, password);
            res.json(user);
        }
        // @ts-ignore
        // @ts-ignore
        async getUserById(req, res) {
            const userId = req.params.id;
            const user = await this.userService.getUserById(userId);
            res.json(user);
        }
    };
    __setFunctionName(_classThis, "UserController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createUser_decorators = [(0, inversify_express_utils_1.httpPost)('/')];
        _getUserById_decorators = [(0, inversify_express_utils_1.httpGet)('/:id')];
        __esDecorate(_classThis, null, _createUser_decorators, { kind: "method", name: "createUser", static: false, private: false, access: { has: obj => "createUser" in obj, get: obj => obj.createUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserById_decorators, { kind: "method", name: "getUserById", static: false, private: false, access: { has: obj => "getUserById" in obj, get: obj => obj.getUserById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserController = _classThis;
})();
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map