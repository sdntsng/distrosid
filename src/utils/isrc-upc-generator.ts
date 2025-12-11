/**
 * Generate ISRC (International Standard Recording Code)
 * Format: CC-XXX-YY-NNNNN
 * CC: Country code
 * XXX: Registrant code
 * YY: Year
 * NNNNN: Designation code
 */
export function generateISRC(): string {
  const countryCode = 'US'; // Default to US
  const registrantCode = 'DIS'; // DistroSid
  const year = new Date().getFullYear().toString().slice(-2);
  const designation = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  
  return `${countryCode}-${registrantCode}-${year}-${designation}`;
}

/**
 * Generate UPC (Universal Product Code)
 * 12-digit barcode for physical/digital products
 */
export function generateUPC(): string {
  // Generate 11 random digits
  let upc = '';
  for (let i = 0; i < 11; i++) {
    upc += Math.floor(Math.random() * 10);
  }
  
  // Calculate check digit
  let oddSum = 0;
  let evenSum = 0;
  
  for (let i = 0; i < 11; i++) {
    if (i % 2 === 0) {
      oddSum += parseInt(upc[i]);
    } else {
      evenSum += parseInt(upc[i]);
    }
  }
  
  const total = (oddSum * 3) + evenSum;
  const checkDigit = (10 - (total % 10)) % 10;
  
  return upc + checkDigit;
}

/**
 * Validate ISRC format
 */
export function validateISRC(isrc: string): boolean {
  const isrcPattern = /^[A-Z]{2}-[A-Z0-9]{3}-\d{2}-\d{5}$/;
  return isrcPattern.test(isrc);
}

/**
 * Validate UPC format
 */
export function validateUPC(upc: string): boolean {
  if (!/^\d{12}$/.test(upc)) {
    return false;
  }
  
  // Verify check digit
  let oddSum = 0;
  let evenSum = 0;
  
  for (let i = 0; i < 11; i++) {
    if (i % 2 === 0) {
      oddSum += parseInt(upc[i]);
    } else {
      evenSum += parseInt(upc[i]);
    }
  }
  
  const total = (oddSum * 3) + evenSum;
  const checkDigit = (10 - (total % 10)) % 10;
  
  return checkDigit === parseInt(upc[11]);
}
