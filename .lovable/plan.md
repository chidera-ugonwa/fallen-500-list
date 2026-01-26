
# Plan: Fix Bernie Madoff's Incorrect Data

## Summary
Bernie Madoff's entry has incorrect values because the AI confused his personal wealth with the $170B in Ponzi scheme victim losses. This needs a direct database correction.

## Root Cause
When the AI generated his data, it returned:
- Peak: $0.82B (wrong)
- Current: -$170.1B (fraud losses to victims, not his debt)

This caused him to falsely rank #1 with $170.92B "wealth lost."

## Solution

### Step 1: Update Bernie Madoff's Record
Run a SQL migration to correct his values:

```text
UPDATE fallen_billionaires 
SET 
  peak_net_worth = 17,
  current_net_worth = 0
WHERE name ILIKE '%bernie madoff%';
```

**Corrected values:**
- Peak Net Worth: $17B (reported personal fortune before 2008 arrest)
- Current Net Worth: $0 (died in federal prison in 2021)
- Wealth Lost: $17B (computed automatically)

### Step 2: Recalculate All Rankings
Call the ranking function to ensure proper ordering:

```text
SELECT recalculate_rankings();
```

### Step 3: Verify the Fix
Query to confirm the update and new ranking.

## Expected Result After Fix
- Bernie Madoff will display: Peak $17.0B, Current $0
- His wealth lost will be $17B
- He will rank appropriately among other fallen billionaires (likely around rank 8-15 based on the current data)

## Technical Notes
- The `wealth_lost` column is computed automatically (`peak_net_worth - current_net_worth`)
- The trigger for Title Case normalization will run on update, keeping his name formatted correctly
- No code changes are needed; this is purely a data correction
