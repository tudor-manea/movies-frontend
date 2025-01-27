import { useState, useEffect } from 'react';
import { Movie } from '../types/movies'

function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/movies')
            .then(response => response.json())
            .then(data => {
                setMovies(Array.isArray(data) ? data : data.content);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Movies</h1>
            <input
                type = "text"
                placeholder="Filter movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                {filteredMovies.map(movie => (
                    <div key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.summary}</p>
                        <div>
                            Rating: {movie.rating} | Released: {movie.releaseDate}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;