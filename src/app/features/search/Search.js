import React, {  useEffect, useState } from 'react'
import { charactersData, getSearchStatus, 
    getSearchError, fetchInventoryType, searchCharacter, inventoryType, 
    aliances, searchAlliances, constellations, searchConstellation  } from './searchSlice'
import { useSelector, useDispatch } from "react-redux"
import { selectAllFactions } from '../factions/factionsSlice'



const Search = ({}) => {
    const searchStatus = useSelector(getSearchStatus)
    const characterData = useSelector(charactersData)
    const aliancesData = useSelector(aliances)
    const constelationsData = useSelector(constellations)
    const InventoryTypeData = useSelector(inventoryType)
    const showError = useSelector(getSearchError)
    const factionsData = useSelector(selectAllFactions)
    const dispatch = useDispatch()
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [warningMsg, setWarningMsg] = useState('')
    const [searchType, setSearchType] = useState('search')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    
    
    
   
    

  const handleSearch = (e) => {
     setWarningMsg('');

    //check that user has selected category
    if (!selectedCategory) {
      setWarningMsg('Please select a category');
      return;
    }
    // check if at least 3 characters are input in search
    if (searchTerm.length < 3) {
      setWarningMsg('Search term must be at least 3 characters.');
      return;
    }
     //dispatch depending on category
     switch(selectedCategory){
         case 'characters':
            dispatch(searchCharacter(searchTerm));
            break;
         case 'inventory_type':
            dispatch(fetchInventoryType(searchTerm));
            break;
        case 'alliance':
            dispatch(searchAlliances(searchTerm));
            break;
        case 'constellation':
            dispatch(searchConstellation(searchTerm))
            break;
     }
    
  };

    // placeholder text generator
    const getPlaceholderText = () => {
    switch (selectedCategory) {
      case 'characters':
        return 'Enter Character ID';
      case 'alliance':
        return 'Enter Alliance ID';
      case 'inventory_type':
        return 'Enter Name';
        case 'constellation':
            return 'Enter constellation ID';
      // Add cases for other categories as needed
      default:
        return 'Select Category';
    }
  };

  //PAGINATION LOGIC
   const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the names for the current page
  const currentFactions = factionsData.slice(startIndex, endIndex);

  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the total number of pages
  const totalItems = factionsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showTotalPages = Array(totalPages).fill();

    console.log('error',showError,'searchterm:',searchStatus, InventoryTypeData, factionsData)

  return (
     <div className="flex items-center justify-center">
        
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <div className='flex gap-11 justify-between border-b-2 px-11 h-11'>
            <p 
            onClick={() => {setSearchType('factions')}}
            className={`uppercase font-bold tracking-widest cursor-pointer ${searchType === 'factions' ? 'underline' : ''}`}>Factions</p>
            <p onClick={() => {setSearchType('search')}}
            className={`uppercase font-bold tracking-widest cursor-pointer ${searchType === 'search' ? ' underline' : ''}`}>Search</p>
        </div>
        {searchType === 'search' && <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`border rounded p-2 mr-2 ${!selectedCategory && warningMsg.length > 0 ? 'border-red-700' : ''}`}
        >
          <option value=''>Select Category</option>
          <option  value="characters">Character</option>
          <option value="alliance">Alliance</option>
          <option value="constellation">Constellation</option>
          <option value="inventory_type">Inventory Type</option>
        </select>
       <input
          type="text"
          placeholder={getPlaceholderText()}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`border rounded p-2 mr-2 ${searchTerm.length < 3 && warningMsg.length > 0 ? 'border-red-700' : ''}`}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
        <div className='h-14 bg-gray-100'>
            {<p className='mb-2 text-red-500 font-semibold'>{warningMsg}</p>}
            {charactersData && 
            <p>Results Found:</p> }
                {searchStatus === 'no data found' || showError === 'Request failed with status code 404' ? 
            <p className='inline text-red-500'>NOTHING FOUND</p> : ''}
            
            
        </div>
        <div className='w-full p-3 h-[14em] bg-white overflow-y-auto max-h-[14em]'>
            {characterData.length > 0 &&
             characterData.map((item) => (
                <div key={item?.characterData?.id} className='flex justify-between'>
                  <p>NAME: {item?.name}</p>
                  <p>ID: {item?.characterData?.id}</p>
                </div>
              ))}
              {InventoryTypeData.length >0 && InventoryTypeData.map((item) => (
                <div key={item?.characterData?.id} className='flex justify-between'>
                  <p>NAME: {item?.characters[0]?.name}</p>
                  <p>ID: {item?.characters[0]?.id}</p>
                </div>
              ))
              }
              { aliancesData.length >0 && aliancesData.map((item) => (
                <div key={item?.characterData?.id} className='flex justify-between'>
                  <p>NAME: {item?.name}</p>
                  <p></p>
                </div>
              ))}
              {constelationsData.length > 0 && constelationsData.map((item) => (
                <div key={item?.characterData?.id} className='flex justify-between'>
                  <p>NAME: {item?.name}</p>
                  <p></p>
                </div>
              ))}
        </div>
        </div>}
        {searchType === 'factions' && <div className='h-[200px] w-[420px]'>
         {currentFactions.map(item => {
            return (
                <div className='text-center my-2 border-b-2'>
                    <p >{item.name}</p>
                </div>
            )
        })}
        <div className='flex justify-center items-center gap-11'>
          {showTotalPages.map((item,index) => (<p className={`${index === currentPage -1 ? 'underline' : ''}`}>{index + 1}</p>))}
        </div>
        <button 
             onClick={() => handlePageChange(currentPage - 1)}
             className='float-left font-semibold text-blue-500 hover:text-blue-300'
              disabled={currentPage === 1}
               >
                 Previous page
        </button>
        
        <button 
        onClick={() => handlePageChange(currentPage + 1)}
        className='float-right font-semibold text-blue-500 hover:text-blue-300'
        disabled={endIndex >= currentPage.length}
        >Next page</button>
        </div>}
      </div>
    </div>
  )
}

export default Search