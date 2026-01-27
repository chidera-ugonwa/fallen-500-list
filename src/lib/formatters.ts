/**
 * Formats peak net worth values with "B" suffix
 * Data is stored in billions (e.g., 45.3 = $45.3B)
 * Always displays in billions with capital B
 * @param amount - Amount in billions (e.g., 45.3 means $45.3B)
 * @returns Formatted string with B suffix (e.g., "$1.0B", "$45.3B")
 */
export const formatPeakWorth = (amount: number): string => {
  if (amount === 0) return "$0";
  return `$${amount.toFixed(1)}B`;
};

/**
 * Formats current net worth values
 * Data is stored in BILLIONS (e.g., 0.5 = $500M, 2.63 = $2.6B)
 * Displays in appropriate unit: B for billions, M for millions, K for thousands
 * @param amount - Amount in billions (e.g., 0.5 means $500M, 2.63 means $2.63B)
 * @returns Formatted string with appropriate suffix (e.g., "$500M", "$2.6B", "$50K")
 */
export const formatCurrentWorth = (amount: number): string => {
  if (amount === 0) return "$0";
  if (amount < 0) return "$0"; // Handle negative values as $0
  
  // Convert to millions for easier calculation
  const millions = amount * 1000;
  
  // If >= 1000 million = 1+ billion, show as B
  if (millions >= 1000) {
    return `$${(millions / 1000).toFixed(1)}B`;
  }
  
  // If >= 1 million, show in millions
  if (millions >= 1) {
    return `$${Math.round(millions)}M`;
  }
  
  // Very small amounts (under $1M) - show in thousands
  const thousands = millions * 1000;
  if (thousands >= 1) {
    return `$${Math.round(thousands)}K`;
  }
  
  return "$0";
};
