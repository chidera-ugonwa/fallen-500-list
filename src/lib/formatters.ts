/**
 * Formats peak net worth values with "B" suffix
 * Always displays in billions with capital B
 * @param amount - Amount in dollars
 * @returns Formatted string with B suffix (e.g., "$1.0B", "$31.3B")
 */
export const formatPeakWorth = (amount: number): string => {
  if (amount === 0) return "$0B";
  const billions = amount / 1000000000;
  return `$${billions.toFixed(1)}B`;
};

/**
 * Formats current net worth with conditional M suffix for millions
 * - Millions (≥1M and <1B): Shows with "M" suffix
 * - Under 1M: Shows full number
 * - Over 1B: Shows with "B" suffix
 * @param amount - Amount in dollars
 * @returns Formatted string (e.g., "$850M", "$250,000", "$1.1B")
 */
export const formatCurrentWorth = (amount: number): string => {
  if (amount === 0) return "$0";
  
  // Over a billion - use B suffix
  if (amount >= 1000000000) {
    const billions = amount / 1000000000;
    return `$${billions.toFixed(1)}B`;
  }
  
  // In millions - use M suffix
  if (amount >= 1000000) {
    const millions = amount / 1000000;
    return `$${millions.toFixed(0)}M`;
  }
  
  // Under a million - show full number
  return `$${amount.toLocaleString()}`;
};
