import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import { uploadRoutes } from './routes/upload.js';
import { distributionRoutes } from './routes/distribution.js';

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

async function buildServer() {
  const fastify = Fastify({
    logger: true,
  });

  // Register plugins
  await fastify.register(cors, {
    origin: true, // Allow all origins in development
  });

  await fastify.register(multipart, {
    limits: {
      fileSize: 500 * 1024 * 1024, // 500MB max file size
    },
  });

  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // API info
  fastify.get('/', async () => {
    return {
      name: 'DistroSid API',
      version: '0.1.0',
      description: 'AI-native music distribution platform',
      endpoints: {
        upload: {
          audio: 'POST /api/upload/audio',
          cover: 'POST /api/upload/cover',
          fromLink: 'POST /api/upload/from-link',
          validate: 'POST /api/upload/validate',
        },
        distribution: {
          submit: 'POST /api/distribution/submit',
          get: 'GET /api/distribution/:id',
          list: 'GET /api/distribution',
          smartLink: 'POST /api/distribution/:id/smart-link',
          socialContent: 'POST /api/distribution/:id/social-content',
          playlistPitches: 'POST /api/distribution/:id/playlist-pitches',
        },
      },
    };
  });

  // Register routes
  await fastify.register(uploadRoutes);
  await fastify.register(distributionRoutes);

  return fastify;
}

async function start() {
  try {
    const fastify = await buildServer();
    
    await fastify.listen({ port: PORT, host: HOST });
    
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🎵 DistroSid - AI Music Distribution Platform 🎵   ║
║                                                       ║
║   Export → Published → Promoted                       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

Server running at: http://${HOST}:${PORT}
API Documentation: http://${HOST}:${PORT}/

Features:
  ✓ AI Metadata Extraction
  ✓ DSP Validation
  ✓ ISRC/UPC Generation
  ✓ Multi-Platform Distribution
  ✓ Smart Link Generation
  ✓ Social Content Creation
  ✓ Playlist Pitch Generation
`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nGracefully shutting down...');
  process.exit(0);
});

start();

export { buildServer };
