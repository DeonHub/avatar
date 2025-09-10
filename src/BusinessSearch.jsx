import { useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import ResultsList from "./components/ResultsList";

export default function BusinessSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (service, location) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json`,
        {
          params: {
            query: `${service} in ${location}`,
            key: import.meta.env.VITE_GOOGLE_API_KEY,
          },
        }
      );
      setResults(response.data.results || []);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-bold py-6 bg-blue-600 text-white">
        Business Directory
      </h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <p className="text-center py-6 text-gray-700">Loading results...</p>
      ) : (
        <ResultsList results={results} />
      )}
    </div>
  );
}
