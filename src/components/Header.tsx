import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSearch = useCallback(() => {
    router.push(`/search/${encodeURIComponent(searchQuery)}`);
  }, [router, searchQuery]);

  return (
    <div className="bg-black text-white border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          {showBackArrow && (
            <BiArrowBack
              onClick={handleBack}
              color="white"
              size={20}
              className="cursor-pointer hover:opacity-70 transition"
            />
          )}
          <h1 className="text-xl font-semibold md:ml-4 mt-2 md:mt-0">
            {label}
          </h1>
        </div>
        <div className="relative mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-900 text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:bg-gray-800"
          />
          <IoSearchOutline
            onClick={handleSearch}
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 cursor-pointer"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;