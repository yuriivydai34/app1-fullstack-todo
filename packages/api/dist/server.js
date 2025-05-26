"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./index"));
const swagger_config_1 = require("./config/swagger.config");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const server = new index_1.default(app);
// Serve Swagger documentation
app.get('/api-docs/swagger.json', (req, res) => {
    res.json(swagger_config_1.swaggerConfig);
});
// Serve Swagger UI
app.get('/api-docs', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Todo API Documentation</title>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui.css">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/api-docs/swagger.json',
              dom_id: '#swagger-ui',
            });
          };
        </script>
      </body>
    </html>
  `);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger documentation is available at http://localhost:${port}/api-docs`);
});
