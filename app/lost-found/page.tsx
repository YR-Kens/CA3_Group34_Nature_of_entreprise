"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Item = {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
  created_at: string;
};

export default function LostFoundPage() {
  const [items, setItems] = useState<Item[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("item");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("lost");

  async function fetchItems() {
    const { data, error } = await supabase
      .from("LostFound")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setItems(data || []);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("LostFound").insert([
      {
        title,
        description,
        category,
        location,
        status,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setTitle("");
      setDescription("");
      setCategory("item");
      setLocation("");
      setStatus("lost");

      fetchItems();
    }
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">📦 Lost & Found</h1>

      <form
  onSubmit={handleSubmit}
  className="bg-white shadow-md rounded-xl p-6 mb-8 space-y-5 border"
>
  <h2 className="text-xl font-semibold text-black">Report Lost or Found Item</h2>

  
  <div>
    <label className="block text-sm font-medium mb-1 text-black">
      Item Title
    </label>
    <input
      className="border rounded-lg p-2 w-full text-black"
      placeholder="e.g. Wallet, Keys, Laptop"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
  </div>

  
  <div>
    <label className="block text-sm font-medium mb-1 text-black">
      Description
    </label>
    <textarea
      className="border rounded-lg p-2 w-full text-black"
      placeholder="Colour, brand, details..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
    />
  </div>

  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    
    <div>
      <label className="block text-sm font-medium mb-1 text-black">
        Location
      </label>
      <input
        className="border rounded-lg p-2 w-full text-black"
        placeholder="e.g. Library, Canteen"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
    </div>

    
    <div>
      <label className="block text-sm font-medium mb-1 text-black">
        Category
      </label>
      <select
        className="border rounded-lg p-2 w-full text-black"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="item">Item</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
    </div>

  </div>

  
  <div>
    <label className="block text-sm font-medium mb-1 text-black">
      Status
    </label>
    <select
      className="border rounded-lg p-2 w-full text-black"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="lost">Lost</option>
      <option value="found">Found</option>
    </select>
  </div>

  
  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
  >
    Submit Report
  </button>
</form>

      {/* LIST */}
      <div className="space-y-4">

        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded">

            <h2 className="text-xl font-bold">{item.title}</h2>

            <p className="text-sm text-gray-600">{item.description}</p>

            <p className="text-sm mt-1">
              📍 {item.location}
            </p>

            <p className="text-sm mt-1">
              Category: {item.category}
            </p>

            <p
              className={`mt-2 font-semibold ${
                item.status === "found"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {item.status.toUpperCase()}
            </p>

          </div>
        ))}

      </div>

    </main>
  );
}
