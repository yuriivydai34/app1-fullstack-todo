"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
exports.swaggerConfig = {
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
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
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
                    '400': {
                        description: 'Invalid input',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ['todos'],
                summary: 'Delete all todos',
                responses: {
                    '204': {
                        description: 'All todos deleted successfully',
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/todos/published': {
            get: {
                tags: ['todos'],
                summary: 'Get all completed todos',
                responses: {
                    '200': {
                        description: 'List of completed todos',
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
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/todos/{id}': {
            get: {
                tags: ['todos'],
                summary: 'Get a todo by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID of the todo to retrieve',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Todo found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Todo',
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Todo not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ['todos'],
                summary: 'Update a todo',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID of the todo to update',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TodoUpdate',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Todo updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Todo',
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Todo not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ['todos'],
                summary: 'Delete a todo',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID of the todo to delete',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    '204': {
                        description: 'Todo deleted successfully',
                    },
                    '404': {
                        description: 'Todo not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
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
            TodoUpdate: {
                type: 'object',
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
                        example: 'done',
                    },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Error message',
                        example: 'An error occurred',
                    },
                },
            },
        },
    },
};
