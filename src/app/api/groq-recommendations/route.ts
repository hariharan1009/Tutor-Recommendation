// app/api/groq-recommendations/route.ts
import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); // Ensure GROQ_API_KEY is in your .env.local

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    console.log('API Route - Received query:', query);

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Recommend online tutors based on the following criteria: ${query}. Provide the tutor's name, subject they teach, years of experience, and average rating. **Return ONLY a valid JSON array of tutor objects. Each object should have the keys: "name", "subject", "experience", and "rating" (as strings or numbers as appropriate). Do not include any introductory or concluding text.**`,        },
      ],
      model: 'llama3-70b-8192',
      // You can adjust parameters like temperature, max_tokens, etc.
    });

    const recommendationsData = response.choices[0]?.message?.content || '[]';
    console.log('API Route - Raw Groq Response:', recommendationsData);

    try {
      const parsedData = JSON.parse(recommendationsData);
      console.log('API Route - Parsed Data:', parsedData);
      return NextResponse.json(parsedData);
    } catch (jsonError) {
      console.error('API Route - Error parsing Groq response:', jsonError);
      console.error('API Route - Raw Groq Response (for error):', recommendationsData);
      return NextResponse.json({ error: 'Failed to process tutor recommendations.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('API Route - Error fetching from Groq:', error);
    return NextResponse.json({ error: 'Failed to fetch from Groq' }, { status: 500 });
  }
  async function fetchRecommendations() {
    try {
      const res = await fetch("http://localhost:5000/api/recommendations");
  
      console.log("Response status:", res.status);
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response text:", errorText);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log("Received data:", data);
  
      // Optional: validate structure
      if (!Array.isArray(data.recommendations)) {
        throw new Error("Invalid response format: expected 'recommendations' array.");
      }
  
      return data.recommendations;
    } catch (error) {
      console.error("Error in fetchRecommendations:", error);
      throw new Error("Failed to process tutor recommendations.");
    }
  }
  
}