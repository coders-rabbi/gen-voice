import { useState } from "react";
import { useDebounce } from "use-debounce";

export function useDebouncedSearch(delay = 500) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebounce(searchTerm, delay);

  return { searchTerm, setSearchTerm, debouncedTerm };
}
