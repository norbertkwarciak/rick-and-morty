import React, { useContext, useEffect } from 'react';
import { Store }                        from '@/store';

const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';

interface IEpisode {
  airdate: string
  airstamp: string
  airtime: string
  id: number
  image: {
    medium: string
    original: string
  }
  name: string
  number: number
  runtime: number
  season: number
  summary: string
  url: string
}

export default function Home():JSX.Element {
  const {state, dispatch} = useContext(Store);

  const fetchData = async () => {
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  };

  useEffect(() => {
    state.episodes.length === 0 && fetchData();
  }, []);

  console.log(state.episodes)

  return (
    <div className="Home">
      <h1>Rick and morty</h1>
      <p>Pick your favorite episode</p>
      <section>
        {state.episodes.map((e: IEpisode) => (
          <div key={e.id}>
            <img src={e.image.medium} alt={`Rick & Morty — ${e.name}`} />
            <p>{e.name}</p>
            <div>
              Season: {e.season} Episode: {e.number}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
