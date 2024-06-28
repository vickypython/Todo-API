"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
// const uri: string = 'mongodb://localhost:27017/myTodos'
const MONGO_URL = "mongodb+srv://vickymlucky:vicky@cluster0.xaqfsym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    app.listen(PORT, () => console.log(`served running on http://localhost:${PORT}`));
})
    .catch((error) => {
    console.error(error);
});
