import React from "react";
import { AddComment } from "components/AddComment";
import ListComments from "components/ListComments";

const MovieOne = ({ items }) => {
  return (
    <>
      <React.Fragment key={items.id}>
        <div className="flex items-start space-x-6 p-6">
          <article className="flex items-start space-x-6 p-6">
            <img
              alt="Poster display"
              className="mt-2 flex flex-wrap text-sm leading-6 font-medium"
              src={"https://image.tmdb.org/t/p/w500" + items.poster_path}
            />
            <div className="text-card">
              <header className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                <h1 className="text-lg">{items.title}</h1>
              </header>
              <p>{items.overview}</p>
              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <div className="flex">
                  <span>{items.vote_average}</span>
                  <img src="https://i.ibb.co/k3Vb2t5/tomato.png" width="20" />
                </div>
                <div>
                  <p className="text-grey-darker text-sm">
                    {items.release_date}
                  </p>
                </div>
              </footer>
              <AddComment id={items.id} />
              <ListComments movie_id={items.id} />
            </div>
          </article>
        </div>
      </React.Fragment>
    </>
  );
};

export default MovieOne;
