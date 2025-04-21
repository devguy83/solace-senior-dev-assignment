"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    <p>
      Searching for: <span>{searchTerm}</span>
    </p>

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="p-6 md:p-12">
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div className="mb-6 space-y-2">
        <label className="block text-lg font-medium">Search</label>
        <p className="text-sm text-gray-500">
          Searching for: <span className="font-semibold">{searchTerm}</span>
        </p>
        <input
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
          onChange={onChange}
        />
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={onClick}
        >
          Reset Search
        </button>
      </div>
      <br />
      <br />
      {filteredAdvocates.length === 0 ? (
        <p className="text-gray-500">No advocates found.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300 rounded-md overflow-hidden shadow advocate-table">
          <thead className="bg-gray-100">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Degree</th>
              <th>Specialties</th>
              <th>Years of Experience</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate) => {
              return (
                <tr key={advocate.id || advocate.phoneNumber} className="even:bg-gray-50 hover:bg-blue-50 transition">
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>
                    {advocate.specialties.map((s, i) => (
                      <div key={i}>{s}</div>
                    ))}
                  </td>
                  <td>{advocate.yearsOfExperience}</td>
                  <td>{advocate.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
