import type { FastifyInstance } from 'fastify';
import { DistributionService } from '../services/distribution-service.js';
import { SmartLinkGenerator } from '../services/smart-link-generator.js';
import { SocialContentGenerator } from '../services/social-content-generator.js';
import { PlaylistPitchGenerator } from '../services/playlist-pitch-generator.js';
import { DistributionFormSchema } from '../types/index.js';

export async function distributionRoutes(fastify: FastifyInstance) {
  const distributionService = new DistributionService();
  const smartLinkGenerator = new SmartLinkGenerator();
  const socialContentGenerator = new SocialContentGenerator();
  const playlistPitchGenerator = new PlaylistPitchGenerator();

  /**
   * POST /api/distribution/submit
   * Submit track for distribution
   */
  fastify.post<{
    Body: unknown;
  }>('/api/distribution/submit', async (request, reply) => {
    try {
      // Validate distribution form
      const form = DistributionFormSchema.parse(request.body);

      // Submit distribution
      const distribution = await distributionService.submitDistribution(form);

      // Generate smart link if auto-generation enabled
      if (form.autoGenerateContent) {
        const smartLink = await smartLinkGenerator.generateSmartLink(
          form.metadata.title,
          form.metadata.artist,
          form.platforms,
          {} // Platform URLs would be populated after submission
        );
        distributionService.addSmartLink(distribution.id, smartLink);

        // Generate social media content
        const socialContent = await socialContentGenerator.generateContent(
          form.metadata,
          form.audioFileUrl,
          form.coverArtUrl
        );

        // Generate playlist pitches
        const playlistPitches = await playlistPitchGenerator.generatePitches(
          form.metadata
        );

        // Update distribution with generated content
        distributionService.updateWithGeneratedContent(distribution.id, {
          socialMediaContent: socialContent,
          playlistPitches: playlistPitches,
        });
      }

      // Return updated distribution
      const updatedDistribution = distributionService.getDistribution(distribution.id);
      
      return updatedDistribution;
    } catch (error) {
      console.error('Distribution submission error:', error);
      return reply.code(400).send({ 
        error: 'Failed to submit distribution',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  /**
   * GET /api/distribution/:id
   * Get distribution status
   */
  fastify.get<{
    Params: { id: string };
  }>('/api/distribution/:id', async (request, reply) => {
    const { id } = request.params;
    const distribution = distributionService.getDistribution(id);

    if (!distribution) {
      return reply.code(404).send({ error: 'Distribution not found' });
    }

    return distribution;
  });

  /**
   * GET /api/distribution
   * List all distributions
   */
  fastify.get('/api/distribution', async () => {
    return distributionService.listDistributions();
  });

  /**
   * POST /api/distribution/:id/smart-link
   * Generate smart link for distribution
   */
  fastify.post<{
    Params: { id: string };
  }>('/api/distribution/:id/smart-link', async (request, reply) => {
    const { id } = request.params;
    const distribution = distributionService.getDistribution(id);

    if (!distribution) {
      return reply.code(404).send({ error: 'Distribution not found' });
    }

    const smartLink = await smartLinkGenerator.generateSmartLink(
      distribution.metadata.title,
      distribution.metadata.artist,
      distribution.platforms,
      {}
    );

    distributionService.addSmartLink(id, smartLink);

    return smartLink;
  });

  /**
   * POST /api/distribution/:id/social-content
   * Generate social media content
   */
  fastify.post<{
    Params: { id: string };
    Body: { audioUrl: string; coverArtUrl?: string };
  }>('/api/distribution/:id/social-content', async (request, reply) => {
    const { id } = request.params;
    const { audioUrl, coverArtUrl } = request.body;
    
    const distribution = distributionService.getDistribution(id);

    if (!distribution) {
      return reply.code(404).send({ error: 'Distribution not found' });
    }

    const socialContent = await socialContentGenerator.generateContent(
      distribution.metadata,
      audioUrl,
      coverArtUrl
    );

    distributionService.updateWithGeneratedContent(id, { socialMediaContent: socialContent });

    return socialContent;
  });

  /**
   * POST /api/distribution/:id/playlist-pitches
   * Generate playlist pitches
   */
  fastify.post<{
    Params: { id: string };
  }>('/api/distribution/:id/playlist-pitches', async (request, reply) => {
    const { id } = request.params;
    const distribution = distributionService.getDistribution(id);

    if (!distribution) {
      return reply.code(404).send({ error: 'Distribution not found' });
    }

    const playlistPitches = await playlistPitchGenerator.generatePitches(
      distribution.metadata
    );

    distributionService.updateWithGeneratedContent(id, { playlistPitches });

    return playlistPitches;
  });
}
