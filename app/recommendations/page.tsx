"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Event = {
  id: number;
  title: string;
  category: string;
  location: string;
  date: string;
};

export default function RecommendationsPage() {
  const [interest, setInterest] = useState("sports");
  const [events, setEvents] = useState<Event[]>([]);

  async function getRecommendations() {
    const { data, error } = await supabase
      .from("Events")
      .select("*")
      .eq("category", interest);

    if (!error) {
      setEvents(data || []);
    }
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        🧠 Event Recommendations
      </h1>

      <div className="space-y-4 mb-6">

        <label className="block font-medium">
          Select your interest:
        </label>

        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="academic">Academic</option>
          <option value="social">Social</option>
        </select>

        <button
          onClick={getRecommendations}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get Recommendations
        </button>

      </div>

      <div className="grid gap-4">

        {events.map((event) => (
          <div key={event.id} className="border rounded p-4">

            <h2 className="text-xl font-bold">
              {event.title}
            </h2>

            <p>{event.category}</p>
            <p>{event.location}</p>
            <p>{event.date}</p>

          </div>
        ))}

      </div>

    </main>
  );
}