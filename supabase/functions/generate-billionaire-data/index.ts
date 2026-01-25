import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function callAI(name: string, LOVABLE_API_KEY: string, attempt: number = 1): Promise<string> {
  const maxAttempts = 3;
  const cleanName = name.replace(/[&]/g, 'and').trim();
  
  const prompt = `You are a financial research assistant. Generate detailed information about "${cleanName}" who was once a billionaire but experienced a significant decline in wealth.

Return a JSON object with these exact fields:
{
  "peak_net_worth": <number in billions, e.g., 5.2 for $5.2 billion - estimate if unknown>,
  "current_net_worth": <number in billions, can be 0 or negative for debt>,
  "country": "<country of origin or primary residence>",
  "industry": "<primary industry/sector>",
  "summary": "<2-3 sentence summary of their rise and fall>",
  "key_factors": "<comma-separated list of 3-5 key factors that led to their downfall>",
  "key_timelines": "<brief timeline of major events, e.g., '2010: Founded company, 2018: Peak wealth, 2022: Bankruptcy'>",
  "current_status": "<1-2 sentences about their current situation>",
  "lessons_learned": "<2-3 key lessons from their story>"
}

If you don't have specific information about this person, make reasonable estimates based on common patterns for fallen billionaires. Always provide complete data.

IMPORTANT: Return ONLY the JSON object, no markdown, no explanation.`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 55000); // 55s timeout

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a financial research assistant that provides accurate, well-researched information about wealthy individuals and their financial histories. Always respond with valid JSON only." },
          { role: "user", content: prompt }
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("RATE_LIMITED");
      }
      if (response.status === 402) {
        throw new Error("PAYMENT_REQUIRED");
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    
    if (!content || content.trim() === "") {
      if (attempt < maxAttempts) {
        console.log(`Empty AI response for ${name}, retrying (attempt ${attempt + 1}/${maxAttempts})...`);
        await new Promise(r => setTimeout(r, 2000 * attempt));
        return callAI(name, LOVABLE_API_KEY, attempt + 1);
      }
      throw new Error("No content in AI response after retries");
    }

    return content;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === "AbortError" || error.message?.includes("network") || error.message?.includes("connection")) {
      if (attempt < maxAttempts) {
        console.log(`Network error for ${name}, retrying (attempt ${attempt + 1}/${maxAttempts})...`);
        await new Promise(r => setTimeout(r, 3000 * attempt));
        return callAI(name, LOVABLE_API_KEY, attempt + 1);
      }
      throw new Error("Network connection failed after retries");
    }
    
    throw error;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, rank } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Generating data for: ${name} (rank ${rank})`);

    let content: string;
    try {
      content = await callAI(name, LOVABLE_API_KEY);
    } catch (error) {
      if (error.message === "RATE_LIMITED") {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (error.message === "PAYMENT_REQUIRED") {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw error;
    }

    // Parse the JSON from the response
    let parsedData;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Ensure all required fields have values
    const result = {
      name,
      rank,
      peak_net_worth: parsedData.peak_net_worth || 1.0,
      current_net_worth: parsedData.current_net_worth ?? 0,
      country: parsedData.country || "Unknown",
      industry: parsedData.industry || "Various",
      summary: parsedData.summary || `${name} experienced significant wealth decline.`,
      key_factors: parsedData.key_factors || "Market conditions, Business challenges",
      key_timelines: parsedData.key_timelines || "Timeline unavailable",
      current_status: parsedData.current_status || "Current status unknown",
      lessons_learned: parsedData.lessons_learned || "Diversification and risk management are crucial.",
      featured: rank <= 20,
      published: true,
    };

    console.log(`Successfully generated data for: ${name}`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
