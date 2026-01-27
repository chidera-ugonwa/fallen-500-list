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
 * Formats current net worth values with "M" suffix
 * Data is stored in billions (e.g., 0.7 = $70M using custom scale)
 * Uses custom app scale: 1B = 100M (NOT real-world 1000M)
 * Always displays in millions with capital M, NEVER shows B
 * @param amount - Amount in billions (e.g., 1.5 means $150M)
 * @returns Formatted string with M suffix (e.g., "$150M", "$80M") or "$0"
 */
export const formatCurrentWorth = (amount: number): string => {
  if (amount === 0) return "$0";
  if (amount < 0) return "$0"; // Handle negative values as $0
  
  // Convert billions to millions using custom scale: 1B = 100M
  const millions = amount * 100;
  
  // Always show in millions, never billions
  if (millions >= 1) {
    return `$${Math.round(millions)}M`;
  }
  
  // Very small amounts (under $1M with custom scale) show as $0
  return "$0";
};
