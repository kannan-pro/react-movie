import React from 'react'

const Search = ({search,setSearch}) => {
    return (
        <div className="search">
            <div className="search-con">
                <img src="./search.svg" alt="hero banner" className='img1' />
                <input type="text"
                placeholder='Search Your Movies'
                value={search} 
                onChange={(e)=>setSearch(e.target.value)}/>
            </div>
        </div>
    )
}

export default Search