"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("sports");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("Events").insert([
      {
        title,
        description,
        category,
        date,
        location,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error creating event: " + error.message);
    } else {
      alert("Event created successfully!");
      router.push("/events");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-xl space-y-5"
      >

        <h1 className="text-2xl font-bold text-black mb-2">
          Create New Event
        </h1>

        
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Event Title
          </label>
          <input
            className="border p-2 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Description
          </label>
          <textarea
            className="border p-2 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Category
          </label>
          <select
            className="border p-2 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-red-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="academic">Academic</option>
            <option value="social">Social</option>
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Date
          </label>
          <input
            type="date"
            className="border p-2 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Location
          </label>
          <input
            className="border p-2 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

       
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full transition"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>

      </form>

    </main>
  );
}