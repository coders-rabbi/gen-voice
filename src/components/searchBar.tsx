"use client";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { getAllNews } from "@/services/news/news.service";
import { TNews } from "@/types/news";
import Link from "next/link";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebounce(searchTerm, 500);
  const [results, setResults] = useState<TNews[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false); // dropdown visibility

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedTerm.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const data = await getAllNews({ searchTerm: debouncedTerm });
        setResults(data);
        setShowResults(true); // notun result asle abar show koro
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedTerm]);

  // outside click handle
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false); // shudhu dropdown hide, input text thake
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => {
          if (results.length > 0) setShowResults(true); // input a abar focus dile dropdown ফিরে আসবে
        }}
        placeholder="Search news..."
        className="w-full border rounded-md px-3 py-2"
      />

      {loading && showResults && (
        <p className="text-sm text-gray-400">Searching...</p>
      )}

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-1 z-10">
          {results.map((item) => (
            <div
              key={item._id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setShowResults(false)} // news click korleo hide hobe
            >
              <Link href={`/news/${item?.newsId}`}>{item.title}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
