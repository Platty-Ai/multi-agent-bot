const fastify = require('fastify')({ 
    logger: true
});
const { bot } = require('./tools/telegram');

// Constants
const PORT = process.env.PORT || 3000;

// Register JSON parser
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, async (req, body) => {
    try {
        return JSON.parse(body);
    } catch (err) {
        throw new Error('Invalid JSON');
    }
});

// Root route
fastify.get('/', async () => {
    return { status: 'A.P.O.C.A.L.Y.P.S.E. system operational' };
});

// Simple webhook handler at root path
fastify.post('/', async (request, reply) => {
    try {
        await bot.handleUpdate(request.body);
        return { ok: true };
    } catch (error) {
        request.log.error('Neural pathway disruption:', error);
        return reply.status(500).send({ 
            ok: false,
            error: 'System malfunction detected' 
        });
    }
});

// Server startup
const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: '0.0.0.0' });
        fastify.log.info(`System initialized on port ${PORT}`);
    } catch (err) {
        fastify.log.error('Initialization failure:', err);
        process.exit(1);
    }
};

// Handle shutdown
process.on('SIGINT', () => fastify.close());
process.on('SIGTERM', () => fastify.close());

// Initialize system
start();