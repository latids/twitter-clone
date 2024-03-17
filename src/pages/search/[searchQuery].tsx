import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchItem from "@/components/search/SearchItem";
import Header from "@/components/Header";
import { ClipLoader } from "react-spinners";
import fetcher from "@/libs/fetcher";

const SearchResults = () => {
  const router = useRouter();
  const { searchQuery } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetcher(
          `/api/search?searchQuery=${searchQuery}`
        );
        setSearchResults(response.searchResults);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto">
      <Header label="Search"></Header>
      {loading && (
        <div className="flex mt-6 justify-center items-center h-20">
          <ClipLoader color="lightblue" size={80} />
        </div>
      )}
      {!loading && searchResults.length === 0 && (
        <p className="text-white text-center mt-6">
          We couldn&apos;t find anything related to your search.
        </p>
      )}
      {!loading &&
        searchResults.length > 0 &&
        searchResults.map((post: any) => (
          <SearchItem key={post._id} data={post} />
        ))}
    </div>
  );
};

export default SearchResults;
