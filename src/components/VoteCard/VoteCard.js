import React from 'react';
import { Link } from 'react-router-dom';

const VoteCard = props => (
  <div className="card my-3" style={{ minWidth: '30vw', maxWidth: '30vw' }}>
    <div className="card-body">
      <h5 className="card-title">{props.name}</h5>
      <Link to={`/vote/${props.id}`} className="card-link">
        Go to Vote
      </Link>
    </div>
  </div>
);

export default VoteCard;
