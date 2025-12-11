import { describe, it, expect } from 'vitest';
import { DSPValidator } from '../src/services/dsp-validator.js';
import type { Metadata } from '../src/types/index.js';

describe('DSPValidator', () => {
  const validator = new DSPValidator();

  describe('validateAudio', () => {
    it('should validate audio format for Spotify', () => {
      const result = validator.validateAudio('mp3', 100, ['spotify']);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject unsupported audio format', () => {
      const result = validator.validateAudio('wma', 100, ['spotify']);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject oversized files', () => {
      const result = validator.validateAudio('mp3', 600, ['spotify']);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('size'))).toBe(true);
    });
  });

  describe('validateCoverArt', () => {
    it('should validate cover art dimensions', () => {
      const result = validator.validateCoverArt('jpg', 3000, 3000, ['apple_music']);
      
      expect(result.isValid).toBe(true);
    });

    it('should reject undersized cover art', () => {
      const result = validator.validateCoverArt('jpg', 500, 500, ['apple_music']);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('dimensions'))).toBe(true);
    });

    it('should warn about non-square images', () => {
      const result = validator.validateCoverArt('jpg', 3000, 2000, ['apple_music']);
      
      expect(result.warnings.some(w => w.includes('square'))).toBe(true);
    });
  });

  describe('validateMetadata', () => {
    it('should validate complete metadata', () => {
      const metadata: Metadata = {
        title: 'Test Track',
        artist: 'Test Artist',
        genre: 'Pop',
        mood: 'Happy',
        isrc: 'US-ABC-23-12345',
        upc: '012345678905',
      };

      const result = validator.validateMetadata(metadata, ['spotify']);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject metadata without required fields', () => {
      const metadata: Metadata = {
        title: '',
        artist: '',
        genre: 'Pop',
        mood: 'Happy',
      };

      const result = validator.validateMetadata(metadata, ['spotify']);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Title'))).toBe(true);
      expect(result.errors.some(e => e.includes('Artist'))).toBe(true);
    });

    it('should reject metadata without ISRC for platforms that require it', () => {
      const metadata: Metadata = {
        title: 'Test Track',
        artist: 'Test Artist',
        genre: 'Pop',
        mood: 'Happy',
      };

      const result = validator.validateMetadata(metadata, ['spotify']);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ISRC'))).toBe(true);
    });
  });

  describe('platform support', () => {
    it('should return all supported platforms', () => {
      const platforms = validator.getSupportedPlatforms();
      
      expect(platforms).toContain('spotify');
      expect(platforms).toContain('apple_music');
      expect(platforms).toContain('tiktok');
    });

    it('should return requirements for specific platform', () => {
      const reqs = validator.getRequirements('spotify');
      
      expect(reqs).toHaveProperty('audioFormats');
      expect(reqs).toHaveProperty('imageFormats');
      expect(reqs.requiresISRC).toBe(true);
    });
  });
});
