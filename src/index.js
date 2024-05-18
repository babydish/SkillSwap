const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const { Server } = require("socket.io");
const http = require('http');
const MongoStore = require('connect-mongo').default; // Import MongoStore
const mongoose = require('mongoose'); // Import mongoose
const connect_db = require('./config/db');
const route = require('./routes');
const { onConnected } = require('./services/socketsConnected');

const app = express();
const server = http.createServer(app); // Create server using http module
const io = new Server(server);

const port = process.env.PORT || 5000;

connect_db.connect(); // Connect to MongoDB

// Create a new mongoose connection
const dbConnection = mongoose.createConnection(connect_db.uri);

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: dbConnection })
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Http logger
const morgan = require('morgan');
app.use(morgan('combined'));

// Template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes
route(app);

// Socket.io connection
io.on('connection', (socket) => onConnected(io, socket));

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
