"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    words: 0,
    categories: 0,
    recentWords: [] as any[],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      // Count words
      const { count: wordCount } = await supabase
        .from("words")
        .select("*", { count: "exact", head: true });

      // Count categories (future table)
      const { count: categoryCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });

      // Recent words
      const { data: recent } = await supabase
        .from("words")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        words: wordCount ?? 0,
        categories: categoryCount ?? 0,
        recentWords: recent ?? [],
      });

      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage Kutiit content, review recent activity, and access tools.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium text-gray-700">Total Words</h2>
          <p className="text-4xl font-bold mt-2">{stats.words}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium text-gray-700">Categories</h2>
          <p className="text-4xl font-bold mt-2">{stats.categories}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium text-gray-700">Recent Additions</h2>
          <p className="text-4xl font-bold mt-2">{stats.recentWords.length}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/words/new"
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            ➕ Add New Word
          </Link>

          <Link
            href="/admin/words"
            className="px-4 py-2 bg-gray-800 text-white rounded shadow hover:bg-gray-900"
          >
            📚 Manage Words
          </Link>

          <Link
            href="/admin/categories"
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
          >
            🗂 Manage Categories
          </Link>
        </div>
      </div>

      {/* Recent Words */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recently Added Words</h2>

        {stats.recentWords.length === 0 ? (
          <p className="text-gray-600">No words added yet.</p>
        ) : (
          <div className="bg-white border rounded-lg shadow divide-y">
            {stats.recentWords.map((w) => (
              <div key={w.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{w.word}</p>
                  <p className="text-gray-500 text-sm">{w.meaning}</p>
                </div>

                <Link
                  href={`/admin/words/edit/${w.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
