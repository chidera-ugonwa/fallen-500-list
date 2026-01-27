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
 * Data is stored in billions (e.g., 0.7 = $700M)
 * Always displays in millions with capital M
 * @param amount - Amount in billions (e.g., 0.7 means $700M)
 * @returns Formatted string with M suffix (e.g., "$700M", "$50M")
 */
export const formatCurrentWorth = (amount: number): string => {
  if (amount === 0) return "$0";
  if (amount < 0) return "$0"; // Handle negative values as $0
  
  // Convert billions to millions for display
  const millions = amount * 1000;
  
  // If it's a whole billion or more, show as B
  if (millions >= 1000) {
    return `$${(millions / 1000).toFixed(1)}B`;
  }
  
  // Show in millions
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
