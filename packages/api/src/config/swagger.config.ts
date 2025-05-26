export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API',
    description: 'API documentation for the Todo application',
    version: '1.0.0',
  },
  tags: [
    {
      name: 'todos',
      description: 'Todo operations',
    },
  ],
  paths: {
    '/api/todos': {
      get: {
        tags: ['todos'],
        summary: 'Get all todos',
        responses: {
          '200': {
            description: 'List of todos',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Todo',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['todos'],
        summary: 'Create a new todo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TodoCreate',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Todo created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Todo',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Todo: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'The unique identifier for the todo',
            example: 1,
          },
          text: {
            type: 'string',
            description: 'The text content of the todo',
            example: 'Buy groceries',
          },
          status: {
            type: 'string',
            description: 'The status of the todo',
            enum: ['done', 'undone'],
            example: 'undone',
          },
        },
      },
      TodoCreate: {
        type: 'object',
        required: ['text'],
        properties: {
          text: {
            type: 'string',
            description: 'The text content of the todo',
            example: 'Buy groceries',
          },
          status: {
            type: 'string',
            description: 'The status of the todo',
            enum: ['done', 'undone'],
            example: 'undone',
          },
        },
      },
    },
  },
}; 