"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type MenuItem = {
  id: number;
  item: string;
  category: string;
  price: number;
  available: boolean;
};

export default function CanteenMenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  async function fetchMenu() {
    const { data, error } = await supabase
      .from("CanteenMenu")
      .select("*");

    if (error) {
      console.error(error.message);
    } else {
      setMenu(data || []);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">🍽 Canteen Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {menu.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl p-5 shadow-sm transition hover:shadow-md bg-white border ${
              item.category === "main"
                ? "border-blue-300"
                : item.category === "drink"
                ? "border-green-300"
                : item.category === "snack"
                ? "border-orange-300"
                : item.category === "dessert"
                ? "border-pink-300"
                : "border-gray-200"
            }`}
          >

            
            <h2
              className={`text-xl font-bold ${
                item.category === "main"
                  ? "text-blue-600"
                  : item.category === "drink"
                  ? "text-green-600"
                  : item.category === "snack"
                  ? "text-orange-500"
                  : item.category === "dessert"
                  ? "text-pink-500"
                  : "text-gray-800"
              }`}
            >
              {item.item}
            </h2>

            <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-yellow-600 text-white font-medium">
            {item.category}
            </span>

            <p className="text-lg font-semibold mt-3 text-gray-900">
              €{item.price}
            </p>

            <p
              className={`mt-2 text-sm font-medium ${
                item.available ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.available ? "Available" : "Sold Out"}
            </p>

          </div>
        ))}

      </div>
    </main>
  );
}