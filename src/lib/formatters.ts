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
 * Data is now stored in millions (e.g., 150 = $150M)
 * Always displays in millions with capital M, or $0 for zero
 * @param amount - Amount in millions (e.g., 150 means $150M)
 * @returns Formatted string with M suffix (e.g., "$150M", "$50M") or "$0"
 */
export const formatCurrentWorth = (amount: number): string => {
  if (amount <= 0) return "$0";
  
  // Value is already in millions, display directly
  if (amount >= 1) {
    return `$${Math.round(amount)}M`;
  }
  
  // Sub-million amounts (less than $1M) - show in thousands
  const thousands = amount * 1000;
  if (thousands >= 1) {
    return `$${Math.round(thousands)}K`;
  }
  
  return "$0";
};
