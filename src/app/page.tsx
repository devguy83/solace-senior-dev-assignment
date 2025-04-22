"use client";

import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
  }, []);

  useEffect(() => {
    console.log(`fetching advocates for ${searchTerm}...`);
    if (searchTerm.length > 0) {
      fetch(`/api/advocates?q=${searchTerm}`)
        .then((res) => res.json())
        .then((json) => setFilteredAdvocates(json.data));
    } else {
      setFilteredAdvocates(advocates); // or fetch all
    }
  }, [searchTerm]);

  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  const onReset = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-6">Solace Advocates</h1>

      <div className="mb-8 space-y-3 max-w-md">
        <label className="block text-lg font-medium">Search</label>
        <p className="text-sm text-gray-500">
          Searching for: <span className="font-semibold">{searchTerm}</span>
        </p>
        <input
          type = "text"
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name, degree, city..."
        />
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={onReset}
        >
          Reset Search
        </button>
      </div>
 
      {(filteredAdvocates?.length || 0) === 0 ? (
        <p className="text-gray-500">No advocates found.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="table-header">First Name</th>
              <th className="table-header">Last Name</th>
              <th className="table-header">City</th>
              <th className="table-header">Degree</th>
              <th className="table-header">Specialties</th>
              <th className="table-header">Years of Experience</th>
              <th className="table-header">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate) => (
                <tr key={advocate.id || advocate.phoneNumber} className="even:bg-gray-50 hover:bg-blue-50">
                  <td className="px-4 py-2">{advocate.firstName}</td>
                  <td className="px-4 py-2">{advocate.lastName}</td>
                  <td className="px-4 py-2">{advocate.city}</td>
                  <td className="px-4 py-2">{advocate.degree}</td>
                  <td className="px-4 py-2">
                    {advocate.specialties.map((s, i) => (
                      <div key={i}>{s}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2">{advocate.yearsOfExperience}</td>
                  <td className="px-4 py-2">{advocate.phoneNumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
