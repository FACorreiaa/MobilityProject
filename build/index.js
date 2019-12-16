"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./LoadEnv"); // Must be the first import
const server_1 = __importDefault(require("./server"));
const shared_1 = require("./shared");
// Start the server
const port = Number(process.env.PORT || 5000);
server_1.default.listen(port, () => {
    shared_1.logger.info('Express server started on port: ' + port);
});
//# sourceMappingURL=index.js.map