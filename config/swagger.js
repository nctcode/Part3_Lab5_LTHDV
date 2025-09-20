const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Supplier & Product API",
            version: "1.0.0",
            description: "API CRUD cho Supplier & Product",
        },
        servers: [
            { url: "http://localhost:3000" }
        ],
    },
    apis: ["./routes/*.js"], // Swagger sẽ đọc JSDoc trong các file routes
};

const specs = swaggerJsdoc(options);
module.exports = specs;