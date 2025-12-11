import type { FastifyInstance } from 'fastify';
import { MetadataExtractor } from '../services/metadata-extractor.js';
import { DSPValidator } from '../services/dsp-validator.js';
import type { UploadResult } from '../types/index.js';
import { PlatformSchema } from '../types/index.js';

export async function uploadRoutes(fastify: FastifyInstance) {
  const metadataExtractor = new MetadataExtractor();
  const dspValidator = new DSPValidator();

  /**
   * POST /api/upload/audio
   * Upload audio file and extract metadata
   */
  fastify.post('/api/upload/audio', async (request, reply) => {
    const data = await request.file();
    
    if (!data) {
      return reply.code(400).send({ error: 'No file uploaded' });
    }

    try {
      // Read file buffer
      await data.toBuffer(); // Validate can read file
      const filename = data.filename;
      const fileExtension = filename.split('.').pop() || '';

      // Extract metadata using AI
      const metadata = await metadataExtractor.extractFromAudio(buffer, filename);

      // Validate against DSP specs (using all platforms for comprehensive check)
      const platforms = dspValidator.getSupportedPlatforms();
      const validation = dspValidator.validateAudio(
        fileExtension,
        buffer.length / (1024 * 1024), // Convert to MB
        platforms
      );

      const result: UploadResult = {
        audioFileUrl: `/uploads/audio/${Date.now()}-${filename}`,
        extractedMetadata: metadata,
        isValid: validation.isValid,
        validationErrors: validation.errors,
      };

      // In production, upload to CDN (S3, Cloudflare R2, etc.)
      
      return result;
    } catch (error) {
      console.error('Upload error:', error);
      return reply.code(500).send({ error: 'Failed to process upload' });
    }
  });

  /**
   * POST /api/upload/cover
   * Upload cover art
   */
  fastify.post('/api/upload/cover', async (request, reply) => {
    const data = await request.file();
    
    if (!data) {
      return reply.code(400).send({ error: 'No file uploaded' });
    }

    try {
      await data.toBuffer(); // Validate can read file
      const filename = data.filename;
      const fileExtension = filename.split('.').pop() || '';

      // In production, analyze image dimensions from buffer
      const mockWidth = 3000;
      const mockHeight = 3000;

      const platforms = dspValidator.getSupportedPlatforms();
      const validation = dspValidator.validateCoverArt(
        fileExtension,
        mockWidth,
        mockHeight,
        platforms
      );

      const result = {
        coverArtUrl: `/uploads/cover/${Date.now()}-${filename}`,
        isValid: validation.isValid,
        validationErrors: validation.errors,
        dimensions: { width: mockWidth, height: mockHeight },
      };

      return result;
    } catch (error) {
      console.error('Cover upload error:', error);
      return reply.code(500).send({ error: 'Failed to process cover upload' });
    }
  });

  /**
   * POST /api/upload/from-link
   * Import track from external link (YouTube, SoundCloud, etc.)
   */
  fastify.post<{
    Body: { url: string };
  }>('/api/upload/from-link', async (request, reply) => {
    const { url } = request.body;

    if (!url) {
      return reply.code(400).send({ error: 'URL is required' });
    }

    try {
      // Extract metadata from link
      const metadata = await metadataExtractor.extractFromLink(url);

      const result: UploadResult = {
        audioFileUrl: url, // In production, download and re-upload to CDN
        extractedMetadata: metadata,
        isValid: true,
      };

      return result;
    } catch (error) {
      console.error('Link import error:', error);
      return reply.code(500).send({ error: 'Failed to import from link' });
    }
  });

  /**
   * GET /api/upload/validate
   * Validate metadata against platform requirements
   */
  fastify.post<{
    Body: {
      metadata: object;
      platforms: string[];
    };
  }>('/api/upload/validate', async (request, reply) => {
    const { metadata, platforms } = request.body;

    try {
      // Parse platforms
      const parsedPlatforms = platforms.map(p => PlatformSchema.parse(p));
      
      // Validate metadata
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const validation = dspValidator.validateMetadata(
        metadata as any,
        parsedPlatforms
      );

      return {
        isValid: validation.isValid,
        errors: validation.errors,
        warnings: validation.warnings,
      };
    } catch (error) {
      console.error('Validation error:', error);
      return reply.code(400).send({ error: 'Invalid input' });
    }
  });
}
