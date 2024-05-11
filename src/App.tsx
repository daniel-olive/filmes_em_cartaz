import { useEffect, useState } from "react";
import { Movie } from "./types/Movie";
import styles from "./App.module.css";
import { dataFilmes } from "./utils/dataFilmes";

const App = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const baseURL = "https://www.omdbapi.com/?i=";
    const chaveKey = "&apikey=f8dbfaa";

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = () => {
        const requests = dataFilmes.map((filme) => {
            return fetch(`${baseURL}${filme.id}${chaveKey}`)
                .then((response) => response.json());
        });
    
        Promise.all(requests)
            .then((moviesData) => {
                setMovies(moviesData);
                console.log(moviesData)
            })
            .catch((error) => {
                console.error('Erro ao carregar filmes:', error);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.btnTitulo}>
                <h1>Filmes em Cartaz</h1>
                <h4>Total de Filmes: {movies.length}</h4>
            </div>

            <div className={styles.FilmesCartaz}>
                {movies.map((item, index) => (
                    <div key={index} className={styles.map}>
                        <div className={styles.square}>
                            <img
                                src={item.Poster}
                                style={{ display: "block" }}
                            />
                        </div>
                        <div className={styles.tituloo}>{item.Title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
