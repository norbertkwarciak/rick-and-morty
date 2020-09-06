import React,
       { useContext,
         useEffect,
         lazy,
         Suspense }           from 'react';
import { Store }              from '@/store';
import { IAction, IEpisode }  from '@/interfaces';
import EpisodesList           from './EpisodesList';

const List = lazy<any>(() => import('./EpisodesList'));

const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';

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

  const toggleFav = (episode: IEpisode): IAction => {
    const episodeInFav = state.favourites.includes(episode);

    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    }

    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter((f: IEpisode) => f.id !== episode.id);

      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode
      }
    }

    return dispatch(dispatchObj)
  }

  useEffect(() => {
    state.episodes.length === 0 && fetchData();
  }, []);

  return (
    <div className="Home">
      <h1>Rick and morty</h1>
      <p>Pick your favorite episode</p>
      <span>Favourite(s): {state.favourites.length}</span>
      <Suspense fallback={<div>Loading...</div>}>
        <List
          episodes={state.episodes}
          favourites={state.favourites}
          toggleFav={toggleFav}
        />
      </Suspense>
    </div>
  )
}
