# Train Location Tracker Backend Application Documentation

This backend application integrates WebSocket and Socket.io servers with an Express.js web framework to provide real-time communication services. The application primarily handles the reception, caching, and retrieval of location data from IoT devices and serves this data to client applications upon request. Redis is used as a cache database to store the location data temporarily.

## Overview

The application consists of two main parts: the `index.js` file, which contains the server setup and real-time communication logic, and the `cache_db.js` file, which encapsulates the operations related to storing and retrieving data from the Redis cache.

### Key Features

- Real-time communication with IoT devices using the WebSocket protocol.
- Real-time communication with client applications using Socket.io.
- Caching of IoT device data in Redis with automatic expiration.
- Environment variable management for sensitive information like server ports and Redis server URLs.

## Setup and Configuration

### Dependencies

- `ws`: WebSocket implementation for Node.js.
- `express`: Web application framework for Node.js.
- `http`: HTTP server functionalities.
- `cors`: Middleware to enable CORS (Cross-Origin Resource Sharing).
- `socket.io`: Real-time bidirectional event-based communication library.
- `redis`: Node.js Redis client for communication with Redis server.
- `dotenv`: Module to load environment variables from a `.env` file.

### Environment Variables

- `PORT`: The port on which the server will listen.
- `REDIS_SERVER`: URL of the Redis server for caching data.

## Application Components

### Express.js Setup

- The application uses Express.js to set up the HTTP server and configure middlewares like CORS and JSON parsing.
- EJS is set as the view engine for rendering server-side templates.
- An HTTP server is created using Express.js and the `http` module.

### WebSocket Server

- A WebSocket server is instantiated to handle real-time communication with IoT devices, configured to work alongside the HTTP server.
- IoT devices send location data to this server, which is then parsed, cached in Redis, and acknowledged.

### Socket.io Server

- A Socket.io server is set up to facilitate real-time communication with client applications, such as web or mobile apps.
- It is configured to accept connections on the same HTTP server and uses a specific path and CORS settings for security.
- Client applications can request location data, which the server retrieves from Redis and emits back to the requesting client.

### Redis Client

- The Redis client is configured to connect to the Redis server using the URL provided in the environment variables.
- The client has error handling in place to log any issues encountered during its operation.

### Data Caching and Retrieval

- `setValue`: Caches the location data sent by IoT devices into Redis, using the device ID as the key. Each entry is set to expire after 20 seconds.
- `getValue`: Retrieves and removes the latest location data from Redis for a given device ID.

## API Endpoints

- `GET /`: Serves the main page rendered by the EJS view engine.

## Real-time Communication Events

### WebSocket Events for IoT Devices

- `connection`: Establishes a connection with an IoT device.
- `message`: Receives messages (location data) from devices, caches the data, and sends an acknowledgment.

### Socket.io Events for Client Applications

- `connection`: Establishes a connection with a client application.
- `location-request`: Listens for location data requests from clients and sends the requested data.

## Starting the Server

The server is started by listening on the port specified in the environment variables. Upon starting, it logs a message indicating that it is ready to accept connections.

## Error Handling

- WebSocket and Socket.io connections include basic error handling for logging and acknowledgment purposes.
- The Redis client includes error logging to capture and log any issues encountered during its operation.

This documentation provides an overview of the application's functionality and structure. For detailed information on specific functions or configurations, refer to the corresponding sections of the codebase.
