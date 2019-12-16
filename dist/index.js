"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./LoadEnv");
const _server_1 = __importDefault(require("@server"));
const _shared_1 = require("@shared");
const port = Number(process.env.PORT || 5000);
_server_1.default.listen(port, () => {
    _shared_1.logger.info('Express server started on port: ' + port);
});
