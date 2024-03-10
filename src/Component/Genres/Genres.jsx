import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({data}) => {

    const genres = useSelector((state)=> state.home)
    //console.log("🚀 ~ Genres ~ genres:", genres)




  return (
    <div className='flex gap-3 flex-wrap absolute  bottom-[100px] left-10'>
    {data.map((g, index) => {
          return (
        <React.Fragment key={index}>
          <div className='bg-[red] p-1 font-medium rounded'>{genres[g]?.name.substring(0, 2) || ''}</div>
        </React.Fragment>
      );
    })}
  </div>
  )
}

export default Genres