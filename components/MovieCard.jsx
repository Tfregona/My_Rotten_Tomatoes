import React from "react";
import Router from 'next/router';

const MovieCard = ({ items }) => {
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <div className="movies_background" onClick={() => Router.push('/movie/' + item.id)}>
              <article className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    alt="Poster display"
                    className="block h-auto w-full"
                    src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                  />
                <div className="text-card">
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">{item.title}</h1>
                </header>
                <p>{item.overview}</p>
                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                  <div className="flex">
                    <span>{item.vote_average}</span>
                    <img src="https://i.ibb.co/k3Vb2t5/tomato.png" width="20" />
                  </div>
                  <div>
                    <p className="text-grey-darker text-sm">{item.release_date}</p>
                  </div>
                </footer>
                </div>
              </article>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
