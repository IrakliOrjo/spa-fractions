import { useSelector, useDispatch } from "react-redux"
import { selectAllFactions, getFactionsStatus, getFactionsError,
fetchFactions, fetchSolarSystem, getSolarName,fetchCorporationName, getCorporationName } from './factionsSlice'
import { useEffect, useState } from "react"

import Modal from 'react-modal'
import CharacterDetails from "../characters/CharacterDetails"

import { IoCloseOutline } from 'react-icons/io5'

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(108, 122, 137,0.8)', 
  },
}

const FactionList = () => {
    const dispatch = useDispatch()
    const factions = useSelector(selectAllFactions)
    const SolarName = useSelector(getSolarName)
    const Corporation = useSelector(getCorporationName)
    const factionStatus = useSelector(getFactionsStatus)
    const error = useSelector(getFactionsError)
    const [expandedBlock, setExpandedBlock] = useState(null);



    useEffect(() => {
        if(factionStatus === 'idle'){
            dispatch(fetchFactions())
        }
    }, [factionStatus, dispatch])

    let content;
    if(factionStatus === 'loading'){
        content = <p>Loading...</p>
    } else if(factionStatus === 'failed') {
        content = <p>{error}</p>
    } else if(factionStatus === 'success'){
        const readyFactions = factions
        content = readyFactions
    }
   
     const [modal, setModal] = useState(false)
  
     const openModal = () => {
       
       setModal(true)
     }
     const closeModal = () => {
       setModal(false)
     }
     

    const expandBlock = (id,solarId) => {
    setExpandedBlock(id);
    //toggleStatus()
    dispatch(fetchSolarSystem(solarId))
    dispatch(fetchCorporationName(id))
  };

  return (
    <div className="grid grid-cols-6 gap-[30px] py-12">
      {factionStatus === 'loading' && <h1>LOADING...</h1>}
      {factionStatus === 'success' && content.map((faction) => (
        <div
          key={faction.id}
          className={`w-[250px] p-5 border hover:scale-105 border-gray-300 rounded cursor-pointer transition-transform transform ${
            expandedBlock === faction["corporation_id"] ? '' : 'max-h-[120px]'
          }`}
          onClick={() => expandBlock(faction["corporation_id"],faction["solar_system_id"])}
        >
          <div className="faction-name">{faction["name"]}</div>
          {/* <div className="solar-system">{faction["solar_system_id"]}</div> */}
          {expandedBlock === faction["corporation_id"]
          ? (<section>
          <p className='text-[.65rem]'>{faction["description"]}</p>
          <p className="text-[.85rem]">Solar system: {SolarName}</p>
          <p className="font-semibold">Corporatin Name: 
          {Corporation !== null && <button onClick={openModal} className="text-red-900 underline hover:text-red-700"
          >{Corporation.name}</button>}</p>
          
          </section>
          ) 
          : ''}
        </div>
      ))}
      {modal && <Modal isOpen={modal} 
            style={modalStyles} 
            onRequestClose={closeModal} 
            className='bg-white w-full h-full lg:max-w-[900px] lg:max-h-[600px] lg:rounded-[30px]
            lg:fixed lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] outline-none  '
            >
            <div onClick={closeModal} className='absolute z-30 right-2 top-2 hover:scale-110 cursor-pointer '>
              <IoCloseOutline className='text-4xl text-orange ' />
            </div>
            {Corporation !== null && <CharacterDetails Corporation={Corporation}/>}
          
            </Modal>}
    </div>
  )
}

export default FactionList
