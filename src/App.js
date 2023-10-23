
import React, { useEffect, useState } from 'react';
import Fetch from './components/fetch';
//import serverUrl from './utils/ghostconst';

function App() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const fetchData = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/scraped-data`);
      if (res.ok) {
        const result = await res.json();
        setData(result);
        setDataLength(result.length);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const serverUrl = 'http://localhost:4000'
  


  return (
    <>
    <div className=" bg-black text-white flex flex-col justify-center">
      <div className='z-40  fixed inset-0 h-20 flex justify-center font-bold text-2xl p-4 bg-slate-800 '>
    WELCOME TO SCRAPING LIBRARY
      </div>
      <Fetch  />
        </div>
        </>
   
    
  );
}

export default App;