import React from 'react'
import starImg from "../assets/star.svg"
import noImg from "../assets/no-movie.png"

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
    return (
        <div className='movie-card'>
            <img src={poster_path ?
                `https://image.tmdb.org/t/p/w500/${poster_path}` :  noImg }
                alt={title} />

            <div className="movie-content">
                <h3>{title}</h3>

                <div className="sub-content">
                    <div className="rating">
                        <img src={starImg} alt="Star Icon" />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                        <span>•</span>
                        <p>{original_language}</p>
                        <span>•</span>
                        {release_date ? release_date.split('-')[0] : 'N/A'}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MovieCard