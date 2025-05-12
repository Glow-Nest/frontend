"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import { useGetProductsByNameQuery } from '@/store/api/productApi';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const { data, isFetching } = useGetProductsByNameQuery(
    { productName: query },
    { skip: query.trim().length < 2 }
  );

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current || highlightedIndex < 0) return;
    const listItems = listRef.current.querySelectorAll('li');
    const currentItem = listItems[highlightedIndex] as HTMLElement;
    if (currentItem) {
      currentItem.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const trimmedQuery = query.trim();

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!data?.products) return;
      setHighlightedIndex((prev) =>
        prev < data.products.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!data?.products) return;
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : data.products.length - 1
      );
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && data?.products?.[highlightedIndex]) {
        const selected = data.products[highlightedIndex];
        setQuery(selected.name);
        onSearch(selected.name);
      } else {
        onSearch(trimmedQuery);
      }
      setShowDropdown(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-6">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full rounded-full border border-gray-300 px-4 py-2 shadow-sm focus:outline-none"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
          setHighlightedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      <div className="absolute top-2 right-3 text-gray-400">
        <Search size={18} />
      </div>

      {showDropdown && query.trim() && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md max-h-60 overflow-auto shadow-md"
        >
          {isFetching ? (
            <li className="px-4 py-2 text-gray-500">Loading...</li>
          ) : data?.products.length === 0 ? (
            <li className="px-4 py-2 text-gray-500">No results found.</li>
          ) : (
            data?.products.map((product, index) => (
              <li
                key={product.productId}
                className={`px-4 py-2 cursor-pointer ${
                  index === highlightedIndex ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(-1)}
                onClick={() => {
                  const trimmedName = product.name.trim();
                  setQuery(trimmedName);
                  onSearch(trimmedName);
                  setShowDropdown(false);
                  setHighlightedIndex(-1);
                }}
              >
                {product.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
