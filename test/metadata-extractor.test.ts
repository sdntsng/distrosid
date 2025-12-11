import { describe, it, expect } from 'vitest';
import { MetadataExtractor } from '../src/services/metadata-extractor.js';

describe('MetadataExtractor', () => {
  const extractor = new MetadataExtractor();

  it('should extract metadata from audio file', async () => {
    const mockBuffer = Buffer.from('mock audio data');
    const filename = 'Artist Name - Track Title.mp3';

    const metadata = await extractor.extractFromAudio(mockBuffer, filename);

    expect(metadata).toHaveProperty('title');
    expect(metadata).toHaveProperty('artist');
    expect(metadata).toHaveProperty('genre');
    expect(metadata).toHaveProperty('mood');
    expect(metadata).toHaveProperty('isrc');
    expect(metadata).toHaveProperty('upc');
    expect(metadata.artist).toBe('Artist Name');
    expect(metadata.title).toBe('Track Title');
  });

  it('should generate placeholder title when not in filename', async () => {
    const mockBuffer = Buffer.from('mock audio data');
    const filename = 'audio.mp3';

    const metadata = await extractor.extractFromAudio(mockBuffer, filename);

    expect(metadata.title).toBeTruthy();
    expect(metadata.title).not.toBe('audio');
  });

  it('should extract metadata from external link', async () => {
    const url = 'https://soundcloud.com/artist/track';

    const metadata = await extractor.extractFromLink(url);

    expect(metadata).toHaveProperty('title');
    expect(metadata).toHaveProperty('artist');
    expect(metadata).toHaveProperty('isrc');
    expect(metadata).toHaveProperty('upc');
  });
});
