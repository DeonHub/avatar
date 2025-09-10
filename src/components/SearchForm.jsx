import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (service && location) {
      onSearch(service, location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 md:flex-row md:items-center">
      <input
        type="text"
        placeholder="Service (e.g., plumber, salon)"
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="border rounded p-2 w-full md:w-1/3"
      />
      <input
        type="text"
        placeholder="Location (e.g., Accra, Atlanta)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border rounded p-2 w-full md:w-1/3"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}
