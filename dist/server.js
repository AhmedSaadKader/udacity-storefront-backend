"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const dashboardRoutes_1 = __importDefault(require("./services/dashboard/dashboardRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || '5000';
const address = `localhost:${port}`;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/items', itemRoutes_1.default);
app.use('/api/v1/orders', orderRoutes_1.default);
app.use('/api/v1/dashboard', dashboardRoutes_1.default);
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
