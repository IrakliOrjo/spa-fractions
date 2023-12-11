import React, {  useEffect, useState } from 'react'
import { selectSearchData, getSearchStatus, getSearchError, fetchData, searchCharacter  } from './searchSlice'
import { useSelector, useDispatch } from "react-redux"



const Search = ({}) => {
    const searchStatus = useSelector(getSearchStatus)
    const searchData = useSelector(selectSearchData)
    const showError = useSelector(getSearchError)
    const dispatch = useDispatch()
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    let receivedData;

    useEffect(() => {
    if (searchStatus === 'success') {
        console.log('useefect ran')
      receivedData = searchData;
    }
  }, [searchData]);
    

  const handleSearch = (e) => {
     e.preventDefault();
     switch(selectedCategory){
        case('characters'):
            dispatch(searchCharacter(searchTerm))
     }
    
  };



 
    console.log('error',showError,'searchterm: ', searchStatus, searchData)

  return (
     <div className="flex items-center justify-center">
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded p-2 mr-2"
        >
          <option value="characters">Character</option>
          <option value="alliance">Alliance</option>
          <option value="constellation">Constellation</option>
          <option value="corporation">Corporation</option>
          <option value="faction">Faction</option>
          <option value="region">Region</option>
          <option value="station">Station</option>
          <option value="inventory_type">Inventory Type</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
        <div className='h-14 bg-gray-100'>
            {<p className='mb-2'>enter min 3 symbols</p>}
            {searchData && 
            <p>Results Found: 
                {searchStatus === 'no data found' || showError === 'Request failed with status code 404' && 
            <span className=' text-red-500'>NOTHING FOUND</span>}</p>}
            
            
        </div>
        <div className='w-full p-3 h-[14em] bg-white overflow-y-auto max-h-[14em]'>
            {searchData !== null &&
             searchData.map((item) => (
                <div key={item?.characters?.id} className='flex justify-between'>
                  <p>NAME: {item?.characters?.name}</p>
                  <p>ID: {item?.characters?.id}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default Search