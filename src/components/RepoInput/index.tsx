import { useEffect, useRef, useState, ChangeEvent, memo } from "react";
import { getLastRepoUrls } from "@/utils/localStorageUtils";

interface RepoInputProps {
  value: string;
  onChange: (value: string) => void;
}

const HHVM_REPO = "https://github.com/facebook/hhvm";

function RepoInput({ value, onChange }: RepoInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [repoSuggestions, setRepoSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedUrls = getLastRepoUrls();
    const recent = savedUrls.slice(0, 5);

    const combined = recent.includes(HHVM_REPO) ? recent : [HHVM_REPO, ...recent];

    setRepoSuggestions(combined);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (url: string) => {
    onChange(url);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        className="w-full border h-9 border-gray-700 rounded-2xl pl-5 pr-10"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Example: https://github.com/nestjs/nest"
        required
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />

      {value && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black block w-7 h-7 cursor-pointer"
          onClick={() => onChange("")}
          aria-label="Clear input"
        >
          <img src="/images/delete_icon.svg" alt="delete_icon" />
        </button>
      )}

      {showSuggestions && repoSuggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-lg rounded-lg mt-1 w-full border border-gray-200 max-h-40 overflow-auto">
          {repoSuggestions.map((url) => (
            <li
              key={url}
              className="cursor-pointer p-2 hover:bg-gray-100 text-sm"
              onMouseDown={() => handleSuggestionClick(url)}
            >
              {url}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(RepoInput);
