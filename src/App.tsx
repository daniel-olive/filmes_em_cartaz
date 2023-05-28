import { useEffect, useState } from "react";
import { Movie } from './types/Movie';

import styles from './App.module.css';

const App = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        loadMovies();
    }, [])

    const loadMovies = () => {
        fetch('https://api.b7web.com.br/cinema/')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setMovies(json);
            });
    }

    return (
        <div className={styles.container}>

            <div className={styles.btnTitulo}>
                <h1>Filmes em Cartaz</h1>
                <h4>Total de Filmes: {movies.length}</h4>
            </div>

            <div className={styles.FilmesCartaz}>
                {movies.map((item, index) => (
                    <div className={styles.map}>
                        <div className={styles.square}>
                            <img src={item.avatar} style={{  display: 'block' }} />
                        </div>
                        <div className={styles.tituloo}>{item.titulo}</div>
                    </div>

                ))}
            </div>

        </div>
    )
};

export default App;