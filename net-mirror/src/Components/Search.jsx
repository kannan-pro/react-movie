import React from 'react'
import searchImg from "../assets/search.svg"

const Search = ({search,setSearch}) => {
    return (
        <div className="search">
            <div className="search-con">
                <img src={searchImg} alt="hero banner" className='img1' />
                <input type="text"
                placeholder='Search Your Movies'
                value={search} 
                onChange={(e)=>setSearch(e.target.value)}/>
            </div>
        </div>
    )
}

export default Search