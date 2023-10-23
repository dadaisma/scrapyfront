import React, { useEffect, useState } from 'react';
//import serverUrl from '../utils/ghostconst';

const Fetch = () => {
   const serverUrl = "http://localhost:4000";
    const [data, setData] = useState([]);
    const [dataLength, setDataLength] = useState(0);
   
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch(`${serverUrl}/api/scraped-data`);
          if (res.ok) {
            const result = await res.json();
            setData(result); // Set the fetched data in the state
           // console.log(result);
            setDataLength(result.length); // You can display it or process it as needed
          } else {
            console.error('Error fetching data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } 
  
      fetchData();
    }, []);
   
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
    
   

    const deleteBook = async (title) => {
        const encodedTitle = encodeURIComponent(title);
        console.log(title)
        console.log(`${serverUrl}/api/delete-api/${encodedTitle}`)
        try {
            const response = await fetch(`${serverUrl}/api/delete-api/${encodedTitle}`, {
                method: 'DELETE',
              });
            if (response.status === 200) {
                fetchData();
            } 
           
          } catch (error) {
            console.error('Error:', error);
           
          }
        };

        const deleteAllBook = async () => {
           
            console.log(555)
            
            try {
                 await fetch(`${serverUrl}/deleteAll-api`, {
                    method: 'DELETE',
                  });
               
                    setTimeout (()=>{
                        window.location.reload();
                        },3000) 
              
               
              } catch (error) {
                console.error('Error:', error);
               
              }
            };
     
            const handleScrapeBooks = async () => {
                try {
                  const response = await fetch(`${serverUrl}/api/scrape-books`, {
                    method: 'POST',
                  });
            
                  if (response.status === 200) {
                    setTimeout (()=>{
                      window.location.reload();
                    // fetchData()
                     },5000) 
                     // Set to null to trigger a re-render
                  } else {
                    alert('Error initiating scraping.');
                  }
                } catch (error) {
                  console.error('Error:', error);
                  alert('Error initiating scraping.');
                }
              };
            
             
              const handleCompareBooks = async () => {
               
                try {
                  const response = await fetch(`${serverUrl}/api/compare-data`, {
                    method: 'POST',
                  });
                  
                    setTimeout (()=>{
                      window.location.reload();
                     },8000) 
                     // Set to null to trigger a re-render
                  
                 
                } catch (error) {
                  console.error('Error:', error);
                  alert('Error initiating scraping.');
                }
              };

    return (
      <div className="z-10 grid grid-cols-2 sm:grid-cols-4 bg-black text-white mt-20">
       <div className='flex flex-col justify-center items-center'>
       <p className='font-bold text-xl text-center'>Total Books: {dataLength} /20</p>
       <label className='text-xs mt-1 text-center '>if library is empty, trig the scraping
       </label>
       <button className='bg-orange-600 rounded-lg p-1 mt-2 mb-2 hover:bg-yellow-600' onClick={handleScrapeBooks}>Trigger Scraping</button>
       
       <label className='text-xs mt-1 text-center  break-all'>if books are less than 20, trig compare, it will scrape again and will compare the files, keeping the last updated
       </label>
      <button className='bg-green-600 rounded-lg p-1 mt-4 mb-4 hover:bg-green-800' onClick={handleCompareBooks}>Compare Scraping</button>
      
       <button className='w-1/2 text-red-800 mb-4 bg-orange-400  hover:bg-red-800 hover:text-white rounded-xl p-1 mt-4'
          onClick={deleteAllBook}
          >delete All library</button>
        
       </div>
       
        {data.length === 0 ? (
  <div className=' flex justify-evenly mt-4'>NO BOOKS, <span className='italic'>click trigger Scraping for the magic</span></div>
) : (
        data.map((book) => (
          <div key={book.title} className='flex flex-col justify-center items-center border px-4 '>
           <h1 className='font-bold break-before-all mb-4 text-center mt-2 '> {book.title}</h1>
          
          <img src={book.imgSrc} alt={book.title} />
          <h1 className='mt-2'> ${book.price}</h1>
          <h1 className='mb-2 mt-1'>Star: {book.rating}</h1>
          <button className='text-red-800 mb-4 bg-orange-400 hover:bg-red-800 hover:text-white rounded-xl p-1'
          onClick={() => deleteBook(book.title)}
          >delete</button>
          </div>
        )))}
      </div>
    );
  }
  

export default Fetch