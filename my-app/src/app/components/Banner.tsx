"use client";
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { CiFilter } from 'react-icons/ci';
import { SlRefresh } from 'react-icons/sl';
import { FiPrinter } from 'react-icons/fi';
import useStore from '@/zustand/store';
import { useDebounce } from 'use-debounce';

export default function Banner() {
    const { setSearch, setLevel, data } = useStore();
    const [localSearch, setLocalSearch] = useState(data.search);
    const [debouncedSearch] = useDebounce(localSearch, 1000);

    useEffect(() => {
        setSearch(debouncedSearch);
    }, [debouncedSearch, setSearch]);

    return (
        <div
            className="p-6 bg-blue-600 text-white rounded-lg shadow-lg relative"
            style={{
                backgroundImage: 'url(/path/to/background-image.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <h2 className="text-2xl font-bold">Customer</h2>
            <p className="mt-2 max-w-lg text-sm font-light leading-6">
                Manage customers efficiently—create, edit, delete, and easily manage customer data.
            </p>
            <div className="flex flex-wrap mt-4 gap-3">
                {/* Add New Customer Button */}
                <button className="px-4 py-3 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 transition-colors">
                    + Add New Customer
                </button>

                {/* Search Bar */}
                <div className="flex flex-1 justify-center items-center bg-white rounded-md shadow-sm px-0.5">
                    <FaSearch className="text-gray-500 mx-3" size={20} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-gray-800 focus:outline-none flex-1 text-sm py-3 px-3"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white rounded-md px-4 py-3 text-sm hover:bg-blue-700 transition-colors"
                        onClick={() => setSearch(localSearch)}
                    >
                        Search
                    </button>
                </div>

                {/* Filter Level */}
                <div className="flex items-center bg-gray-100 rounded-md shadow px-4 py-3">
                    <CiFilter size={20} className="text-gray-700 mr-2" />
                    <select
                        className="text-gray-700 bg-transparent focus:outline-none"
                        value={data.level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="">All Levels</option>
                        <option value="Warga">Warga</option>
                        <option value="Juragan">Juragan</option>
                        <option value="Sultan">Sultan</option>
                        <option value="Konglomerat">Konglomerat</option>
                    </select>
                </div>

                {/* Refresh Button */}
                <button className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-md shadow hover:bg-gray-200 transition-colors gap-2">
                    <SlRefresh size={20} />
                    Refresh
                </button>

                {/* Print Button */}
                <div className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-md shadow hover:bg-gray-200 transition-colors">
                    <FiPrinter size={20} />
                </div>
            </div>
        </div>
    );
}
