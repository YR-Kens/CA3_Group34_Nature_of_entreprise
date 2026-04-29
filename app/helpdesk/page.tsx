"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type Ticket = {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  created_at: string;
};

export default function HelpdeskPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("low");

  async function fetchTickets() {
    const { data } = await supabase
      .from("Helpdesk")
      .select("*")
      .order("created_at", { ascending: false });

    setTickets(data || []);
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("Helpdesk").insert([
      {
        title,
        description,
        category,
        priority,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setTitle("");
      setDescription("");
      setCategory("general");
      setPriority("low");

      fetchTickets();
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Helpdesk</h1>

      
      <form onSubmit={handleSubmit} className="space-y-3 mb-8">

        <input
          className="border p-2 w-full"
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Describe your issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">General</option>
          <option value="technical">Technical</option>
          <option value="academic">Academic</option>
        </select>

        <select
          className="border p-2 w-full"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Submit Ticket
        </button>
      </form>

      
      <div className="space-y-4">
        {tickets.map((t) => (
          <div key={t.id} className="border p-4 rounded">
            <h2 className="font-bold">{t.title}</h2>
            <p className="text-sm text-gray-600">{t.description}</p>
            <p className="text-sm mt-1">
              {t.category} | {t.priority}
            </p>
          </div>
        ))}
      </div>

    </main>
  );
}