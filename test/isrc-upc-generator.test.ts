import { describe, it, expect } from 'vitest';
import {
  generateISRC,
  generateUPC,
  validateISRC,
  validateUPC,
} from '../src/utils/isrc-upc-generator.js';

describe('ISRC Generator', () => {
  it('should generate valid ISRC', () => {
    const isrc = generateISRC();
    
    expect(isrc).toMatch(/^[A-Z]{2}-[A-Z0-9]{3}-\d{2}-\d{5}$/);
    expect(validateISRC(isrc)).toBe(true);
  });

  it('should validate ISRC format', () => {
    expect(validateISRC('US-ABC-23-12345')).toBe(true);
    expect(validateISRC('USABC2312345')).toBe(false);
    expect(validateISRC('US-ABC-23-1234')).toBe(false);
  });
});

describe('UPC Generator', () => {
  it('should generate valid UPC', () => {
    const upc = generateUPC();
    
    expect(upc).toHaveLength(12);
    expect(upc).toMatch(/^\d{12}$/);
    expect(validateUPC(upc)).toBe(true);
  });

  it('should validate UPC format and check digit', () => {
    // Valid UPC with correct check digit
    expect(validateUPC('012345678905')).toBe(true);
    
    // Invalid length
    expect(validateUPC('12345')).toBe(false);
    
    // Invalid check digit
    expect(validateUPC('012345678901')).toBe(false);
  });
});
