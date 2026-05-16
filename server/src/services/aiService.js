const fallbackLibrary = {
  chat: (input) =>
    `Here is a practical FlowPilot response:\n\n1. Clarify the outcome: ${input.slice(0, 120)}\n2. Break it into 3 focused tasks.\n3. Schedule the hardest task first.\n4. Review progress at the end of the day.\n\nAI mode: fallback demo response.`,
  summarize: (input) =>
    `Summary:\n${input.slice(0, 220)}${input.length > 220 ? "..." : ""}\n\nKey points:\n- Main idea identified from the pasted content.\n- Important decisions and study/work themes should be reviewed.\n- Convert unclear items into follow-up questions.\n\nAction items:\n- Create 2-3 tasks from this note.\n- Review the summary once today.\n- Save one flashcard for the most important concept.`,
  email: (input) =>
    `Subject: Request Regarding ${input.slice(0, 48) || "the Opportunity"}\n\nDear Sir/Madam,\n\nI hope you are doing well. I am writing to request your support regarding ${input || "the matter discussed"}. I would appreciate the opportunity to share the required details and proceed professionally.\n\nThank you for your time and consideration.\n\nBest regards,\nYour Name`,
  workflow: (input) =>
    `Suggested workflow:\n\nToday:\n- List all commitments related to: ${input || "your goal"}.\n- Pick the top 3 urgent tasks.\n- Block 90 minutes for deep work.\n\nThis week:\n- Complete the highest-impact deliverable first.\n- Use short review sessions every evening.\n- Keep one buffer slot for unexpected work.\n\nProductivity tip:\nProtect your first work session from notifications.`
};

function buildPrompt(feature, input) {
  const system = {
    chat: "You are FlowPilot AI, a concise productivity assistant.",
    summarize: "Summarize the content into a summary, key points, action items, and flashcard ideas.",
    email: "Generate a clear professional email for the user's requirement.",
    workflow: "Create a practical workflow plan with schedule, task breakdown, and productivity improvements."
  };

  return `${system[feature]}\n\nUser input:\n${input}\n\nResponse:`;
}

function parseHuggingFaceResponse(data) {
  if (Array.isArray(data) && data[0]?.generated_text) return data[0].generated_text;
  if (data?.generated_text) return data.generated_text;
  if (data?.choices?.[0]?.message?.content) return data.choices[0].message.content;
  if (data?.error) throw new Error(data.error);
  return JSON.stringify(data);
}

export async function generateAI(feature, input) {
  const cleanInput = String(input || "").trim();
  const fallback = fallbackLibrary[feature] || fallbackLibrary.chat;

  if (!process.env.HF_API_TOKEN) {
    return { text: fallback(cleanInput), provider: "fallback" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);

  try {
    const model = process.env.HF_MODEL || "HuggingFaceH4/zephyr-7b-beta";
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: buildPrompt(feature, cleanInput),
        parameters: {
          max_new_tokens: 420,
          temperature: 0.65,
          return_full_text: false
        }
      }),
      signal: controller.signal
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error || "Hugging Face request failed");

    return { text: parseHuggingFaceResponse(data).trim(), provider: "huggingface" };
  } catch (error) {
    console.error("Hugging Face API Error:", error.message);
    return {
      text: fallback(cleanInput),
      provider: "fallback"
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function parseNoteAI(text) {
  const lines = text.split("\n").map((line) => line.replace(/^[-*]\s*/, "").trim()).filter(Boolean);
  return {
    summary: text,
    keyPoints: lines.slice(0, 4),
    actionItems: lines.filter((line) => /task|review|create|complete|schedule|follow/i.test(line)).slice(0, 4),
    flashcards: lines.slice(0, 3).map((line, index) => ({
      question: `Flashcard ${index + 1}`,
      answer: line
    }))
  };
}
