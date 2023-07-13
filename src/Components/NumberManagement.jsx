import React, { useState } from 'react';
import axios from 'axios';

function NumberManagement() {
  const [numbers, setNumbers] = useState([]);

  const getNumbers = () => {
    const urls = [
      'http://20.244.56.144/numbers/primes',
      'http://20.244.56.144/numbers/fibo',
      'http://20.244.56.144/numbers/odd'
    ];

    axios.get('/numbers', {
      params: { url: urls }
    })
      .then(response => {
        setNumbers(response.data.numbers);
      })
      .catch(error => {
        console.log('Error retrieving numbers:', error);
      });
  };

  return (
    <div>
      <button onClick={getNumbers}>Get Numbers</button>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default NumberManagement;
