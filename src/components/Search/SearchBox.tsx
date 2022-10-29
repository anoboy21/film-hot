import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchKeywords } from "../../services/search";
import { htmlToText } from "../../shared/utils";

interface SearchBoxProps {
  autoFocus?: boolean;
}

const SearchBox: FC<SearchBoxProps> = ({ autoFocus }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const timeoutRef = useRef<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSuggestions([]);

    if (!inputValue.trim()) {
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      const data = await searchKeywords(inputValue.trim());

      setSuggestions(data.map((item) => htmlToText(item)));
    }, 500);
  }, [inputValue]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <div className="relative w-full group">
      <form onSubmit={submitHandler} className="relative">
        <input
          value={inputValue}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-transparent outline-none border border-gray-600 rounded-full py-2 pl-4 pr-8"
          type="text"
          placeholder="Search..."
          autoFocus={autoFocus}
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2">
          <i className="fas fa-search text-xl"></i>
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full z-10 bg-dark-lighten rounded overflow-x-hidden overflow-y-auto max-h-[200px] flex-col items-stretch hidden group-focus-within:flex">
          {suggestions.map((suggestion, index) => (
            <Link
              key={index}
              to={`/search?q=${encodeURIComponent(suggestion)}`}
            >
              <button
                className={`text-left p-2 w-full ${
                  index !== suggestions.length - 1
                    ? "border-b border-gray-500"
                    : ""
                }`}
              >
                {suggestion}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
