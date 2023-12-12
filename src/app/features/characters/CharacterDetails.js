import React, {  useEffect, useState } from 'react'
import { fetchCharacter, selectAllCharacter, getCharacterStatus, getCharacterError, selectRace, fetchRace  } from './characterSlice'
import { useSelector, useDispatch } from "react-redux"




const CharacterDetails = ({ Corporation }) => {
    const [raceInfo, setRaceInfo] = useState(false)

     const dispatch = useDispatch()
     const characters = useSelector(selectAllCharacter)
     const race = useSelector(selectRace)
     const error = useSelector(getCharacterError)
     const characterStatus = useSelector(getCharacterStatus)

     useEffect(() => {
        
            
            dispatch(fetchCharacter(Corporation.ceo_id))
            if(characterStatus === 'idle'){
                dispatch(fetchRace())
            }
        
    }, [Corporation.ceo_id, dispatch])


    let content;
    if(characterStatus === 'loading'){
        content = <p>Loading...</p>
    } else if(characterStatus === 'failed') {
        content = <p>{error}</p>
    } else if(characterStatus === 'success'){
        const readyCharacter = characters
        content = readyCharacter
    }

    const showRaceInfo = () => {
        setRaceInfo(!raceInfo)
    }

    console.log('content',race)
 

  return (
    <div className="flex flex-col p-11">
        {characterStatus === 'loading' && <h1>LOADING...</h1>}
        {characterStatus === 'success' &&  !raceInfo && <div className='flex flex-col gap-8'>
              <p className='text-[2rem] font-semibold'>Name: {Corporation?.name}</p>
              <p className='text-[1.8rem]'>member_count: {Corporation?.member_count}</p>
              <p className='text-[1.5rem]'>description: {Corporation?.description} </p>
              {characterStatus === 'success' && 
              <p 
              className='text-[2rem] underline cursor-pointer text-red-900 hover:text-red-700'
              onClick={() => {showRaceInfo()}}
              >Ceo: {content?.name} </p>}
        </div>}
        {race &&  raceInfo && <div className='flex flex-col gap-8'>
              <p 
              className='font-bold underline text-[1.5rem]'
              onClick={() => {showRaceInfo()}}
              >{'<'} Go Back</p>
              <p className='text-[2rem] font-semibold'>Name: {content?.name}</p>
              <p className='text-[1.8rem]'>Birthday: {content?.birthday.slice(0,10).split('-').reverse().join('-')}</p>
              <p className='text-[1.5rem]'>Race: {race.filter(item => item.race_id === content.race_id)[0]?.name} </p>
              
        </div>}
     </div>
  )
}

export default CharacterDetails