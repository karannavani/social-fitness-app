import React from 'react';
import { Link } from 'react-router-dom';

const NewsCardAdoptCreate = ({ user, type }) => {
  return(
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={user.imageUrl}/>
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <Link to={`/profile/${user._id}`} className='title is-4' >{user.username}</Link>
          <p className='subtitle'>{user.tribe} </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item">
              <span className="icon is-small"><i className="fas fa-reply"></i></span>
            </a>
            <a className="level-item">
              <span className="icon is-small"><i className="fas fa-retweet"></i></span>
            </a>
            <a className="level-item">
              <span className="icon is-small"><i className="fas fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
      <div className="media-right">
        <button className="delete"></button>
      </div>
    </article>
  );
};

export default NewsCardAdoptCreate;
