import type { Metadata, Platform } from '../types/index.js';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface DSPRequirements {
  minBitrate?: number; // kbps
  maxFileSize?: number; // MB
  audioFormats: string[];
  imageFormats: string[];
  minImageDimensions: { width: number; height: number };
  maxTitleLength?: number;
  maxArtistLength?: number;
  requiresISRC: boolean;
  requiresUPC: boolean;
}

/**
 * DSP (Digital Service Provider) Specification Validator
 * Validates that uploads meet platform-specific requirements
 */
export class DSPValidator {
  private requirements: Record<Platform, DSPRequirements> = {
    spotify: {
      minBitrate: 320,
      maxFileSize: 500,
      audioFormats: ['mp3', 'flac', 'wav', 'ogg'],
      imageFormats: ['jpg', 'jpeg', 'png'],
      minImageDimensions: { width: 640, height: 640 },
      maxTitleLength: 100,
      maxArtistLength: 100,
      requiresISRC: true,
      requiresUPC: true,
    },
    apple_music: {
      minBitrate: 256,
      maxFileSize: 500,
      audioFormats: ['m4a', 'flac', 'wav', 'alac'],
      imageFormats: ['jpg', 'jpeg', 'png'],
      minImageDimensions: { width: 3000, height: 3000 },
      maxTitleLength: 255,
      maxArtistLength: 255,
      requiresISRC: true,
      requiresUPC: true,
    },
    tiktok: {
      maxFileSize: 200,
      audioFormats: ['mp3', 'wav', 'm4a'],
      imageFormats: ['jpg', 'jpeg', 'png'],
      minImageDimensions: { width: 500, height: 500 },
      maxTitleLength: 50,
      requiresISRC: false,
      requiresUPC: false,
    },
    youtube_music: {
      minBitrate: 320,
      maxFileSize: 500,
      audioFormats: ['mp3', 'flac', 'wav'],
      imageFormats: ['jpg', 'jpeg', 'png'],
      minImageDimensions: { width: 1280, height: 720 },
      maxTitleLength: 100,
      requiresISRC: true,
      requiresUPC: true,
    },
    amazon_music: {
      minBitrate: 320,
      maxFileSize: 500,
      audioFormats: ['mp3', 'flac', 'wav'],
      imageFormats: ['jpg', 'jpeg', 'png'],
      minImageDimensions: { width: 1400, height: 1400 },
      requiresISRC: true,
      requiresUPC: true,
    },
    deezer: {
      minBitrate: 320,
      maxFileSize: 500,
      audioFormats: ['mp3', 'flac'],
      imageFormats: ['jpg', 'jpeg', 'png'],
      minImageDimensions: { width: 1000, height: 1000 },
      requiresISRC: true,
      requiresUPC: true,
    },
    tidal: {
      minBitrate: 320,
      maxFileSize: 500,
      audioFormats: ['flac', 'wav'],
      imageFormats: ['jpg', 'jpeg'],
      minImageDimensions: { width: 1280, height: 1280 },
      requiresISRC: true,
      requiresUPC: true,
    },
  };

  /**
   * Validate audio file meets DSP requirements
   */
  validateAudio(
    fileExtension: string,
    fileSizeMB: number,
    platforms: Platform[]
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const platform of platforms) {
      const reqs = this.requirements[platform];
      
      // Check audio format
      if (!reqs.audioFormats.includes(fileExtension.toLowerCase())) {
        errors.push(
          `${platform}: Audio format .${fileExtension} not supported. ` +
          `Accepted formats: ${reqs.audioFormats.join(', ')}`
        );
      }

      // Check file size
      if (reqs.maxFileSize && fileSizeMB > reqs.maxFileSize) {
        errors.push(
          `${platform}: File size ${fileSizeMB}MB exceeds maximum of ${reqs.maxFileSize}MB`
        );
      }

      // Bitrate warning (can't check without analyzing file)
      if (reqs.minBitrate) {
        warnings.push(
          `${platform}: Ensure audio bitrate is at least ${reqs.minBitrate}kbps for best quality`
        );
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate cover art meets DSP requirements
   */
  validateCoverArt(
    fileExtension: string,
    width: number,
    height: number,
    platforms: Platform[]
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const platform of platforms) {
      const reqs = this.requirements[platform];
      
      // Check image format
      if (!reqs.imageFormats.includes(fileExtension.toLowerCase())) {
        errors.push(
          `${platform}: Image format .${fileExtension} not supported. ` +
          `Accepted formats: ${reqs.imageFormats.join(', ')}`
        );
      }

      // Check dimensions
      if (width < reqs.minImageDimensions.width || height < reqs.minImageDimensions.height) {
        errors.push(
          `${platform}: Image dimensions ${width}x${height} too small. ` +
          `Minimum: ${reqs.minImageDimensions.width}x${reqs.minImageDimensions.height}`
        );
      }

      // Check aspect ratio
      if (width !== height) {
        warnings.push(
          `${platform}: Image should be square (1:1 aspect ratio) for best results`
        );
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate metadata meets DSP requirements
   */
  validateMetadata(metadata: Metadata, platforms: Platform[]): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const platform of platforms) {
      const reqs = this.requirements[platform];

      // Check title length
      if (reqs.maxTitleLength && metadata.title.length > reqs.maxTitleLength) {
        errors.push(
          `${platform}: Title exceeds maximum length of ${reqs.maxTitleLength} characters`
        );
      }

      // Check artist length
      if (reqs.maxArtistLength && metadata.artist.length > reqs.maxArtistLength) {
        errors.push(
          `${platform}: Artist name exceeds maximum length of ${reqs.maxArtistLength} characters`
        );
      }

      // Check ISRC requirement
      if (reqs.requiresISRC && !metadata.isrc) {
        errors.push(`${platform}: ISRC is required`);
      }

      // Check UPC requirement
      if (reqs.requiresUPC && !metadata.upc) {
        errors.push(`${platform}: UPC is required`);
      }
    }

    // General validation
    if (!metadata.title || metadata.title.trim() === '') {
      errors.push('Title is required');
    }

    if (!metadata.artist || metadata.artist.trim() === '') {
      errors.push('Artist name is required');
    }

    if (!metadata.genre || metadata.genre.trim() === '') {
      errors.push('Genre is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Get platform-specific requirements
   */
  getRequirements(platform: Platform): DSPRequirements {
    return this.requirements[platform];
  }

  /**
   * Get all supported platforms
   */
  getSupportedPlatforms(): Platform[] {
    return Object.keys(this.requirements) as Platform[];
  }
}
