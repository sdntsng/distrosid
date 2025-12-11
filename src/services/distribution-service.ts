import type {
  Distribution,
  DistributionForm,
  Platform,
  SmartLink,
} from '../types/index.js';
import { generateId } from '../utils/id-generator.js';

/**
 * Distribution Service
 * Handles submission to multiple DSPs via API/aggregator
 */
export class DistributionService {
  private distributions: Map<string, Distribution> = new Map();

  /**
   * Submit track for distribution to selected platforms
   */
  async submitDistribution(form: DistributionForm): Promise<Distribution> {
    const distribution: Distribution = {
      id: generateId(),
      metadata: form.metadata,
      platforms: form.platforms,
      status: 'pending',
      releaseDate: form.releaseDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store distribution
    this.distributions.set(distribution.id, distribution);

    // Start async processing
    this.processDistribution(distribution.id, form).catch(err => {
      console.error(`Distribution ${distribution.id} failed:`, err);
      this.updateStatus(distribution.id, 'failed');
    });

    return distribution;
  }

  /**
   * Process distribution asynchronously
   */
  private async processDistribution(
    id: string,
    form: DistributionForm
  ): Promise<void> {
    // Update status to processing
    this.updateStatus(id, 'processing');

    // Simulate API calls to various platforms
    // In production, this would:
    // 1. Authenticate with each platform's API
    // 2. Upload audio and cover art to CDN
    // 3. Submit metadata to platform APIs
    // 4. Handle platform-specific requirements
    // 5. Monitor submission status

    const platformPromises = form.platforms.map(platform =>
      this.submitToPlatform(platform, form)
    );

    try {
      await Promise.all(platformPromises);
      this.updateStatus(id, 'submitted');
    } catch (error) {
      throw new Error(`Platform submission failed: ${error}`);
    }
  }

  /**
   * Submit to individual platform
   */
  private async submitToPlatform(
    platform: Platform,
    form: DistributionForm
  ): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, implement platform-specific submission logic:
    switch (platform) {
      case 'spotify':
        // Use Spotify for Artists API or aggregator like DistroKid/TuneCore
        break;
      case 'apple_music':
        // Use Apple Music for Artists API or aggregator
        break;
      case 'tiktok':
        // Use TikTok Commercial Music Library API
        break;
      case 'youtube_music':
        // Use YouTube Content ID or aggregator
        break;
      case 'amazon_music':
        // Use Amazon Music for Artists API or aggregator
        break;
      case 'deezer':
        // Use Deezer API or aggregator
        break;
      case 'tidal':
        // Use Tidal API or aggregator
        break;
    }

    console.log(`Submitted to ${platform}:`, form.metadata.title);
  }

  /**
   * Get distribution by ID
   */
  getDistribution(id: string): Distribution | undefined {
    return this.distributions.get(id);
  }

  /**
   * List all distributions
   */
  listDistributions(): Distribution[] {
    return Array.from(this.distributions.values());
  }

  /**
   * Update distribution status
   */
  private updateStatus(id: string, status: Distribution['status']): void {
    const distribution = this.distributions.get(id);
    if (distribution) {
      distribution.status = status;
      distribution.updatedAt = new Date().toISOString();
      this.distributions.set(id, distribution);
    }
  }

  /**
   * Add smart link to distribution
   */
  addSmartLink(id: string, smartLink: SmartLink): void {
    const distribution = this.distributions.get(id);
    if (distribution) {
      distribution.smartLink = smartLink;
      distribution.updatedAt = new Date().toISOString();
      this.distributions.set(id, distribution);
    }
  }

  /**
   * Update distribution with generated content
   */
  updateWithGeneratedContent(
    id: string,
    content: Partial<Pick<Distribution, 'socialMediaContent' | 'playlistPitches'>>
  ): void {
    const distribution = this.distributions.get(id);
    if (distribution) {
      Object.assign(distribution, content);
      distribution.updatedAt = new Date().toISOString();
      this.distributions.set(id, distribution);
    }
  }
}
