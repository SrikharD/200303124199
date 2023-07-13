import React, { useState } from 'react';
import axios from 'axios';

const NumberManagement = () => {
  const [urls, setUrls] = useState('');
  const [numbers, setNumbers] = useState([]);

  const handleFetchNumbers = async () => {
    if (!urls) {
      alert('Please enter at least one URL.');
      return;
    }

    const urlArray = urls.split(',');

    try {
      const responsePromises = urlArray.map((url) => axios.get(url));

      const responses = await Promise.allSettled(responsePromises);
      let mergedNumbers = [];

      for (const response of responses) {
        if (response.status === 'fulfilled') {
          mergedNumbers = [...mergedNumbers, ...response.value.data.numbers];
        }
      }

      const uniqueNumbers = [...new Set(mergedNumbers)].sort((a, b) => a - b);
      setNumbers(uniqueNumbers);
    } catch (error) {
      console.error('Error retrieving numbers:', error);
      alert('An error occurred while retrieving numbers. Please try again.');
    }
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <div>
        <label htmlFor="urls">Enter URLs (comma-separated):</label>
        <input type="text" id="urls" value={urls} onChange={(e) => setUrls(e.target.value)} />
      </div>
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      {numbers.length > 0 && (
        <div>
          <h2>Result:</h2>
          <ul>
            {numbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NumberManagement;
