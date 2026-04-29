"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase.from("Events").select("*");

    if (!error) {
      setEvents(data || []);
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="p-6 max-w-6xl mx-auto">

      
      <h1 className="text-3xl font-bold mb-2">📅 Events</h1>
      <p className="text-gray-600 mb-6">
        Discover campus events and activities
      </p>

      
      <div className="flex flex-col md:flex-row gap-3 mb-6">

        <input
          type="text"
          placeholder="Search events..."
          className="border p-2 rounded-lg w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="academic">Academic</option>
          <option value="social">Social</option>
        </select>

      </div>

      
      {filteredEvents.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <h2 className="text-xl font-semibold">No Results Found</h2>
          <p>No events has been created for this category.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
          >

            
            <h2 className="text-xl font-bold mb-2 text-black">
              {event.title}
            </h2>

           
            <span className="inline-block bg-red-100 text-black text-xs px-2 py-1 rounded-full mb-2">
              {event.category}
            </span>

            <p className="text-gray-600 text-sm mb-3">
              {event.description}
            </p>

            
            <p className="text-sm text-black">📍 {event.location}</p>
            <p className="text-sm text-black">📅 {event.date}</p>

          </div>
        ))}

      </div>

    </main>
  );
}
