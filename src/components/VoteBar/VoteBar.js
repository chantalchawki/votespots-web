import React from 'react';

const VoteBar = ({ header, result, totalVotes, submitVote }) => {
  const percentage = (result / totalVotes) * 100;
  return (
    <div className="my-5">
      <p style={{ lineHeight: 0 }}>{header}</p>
      <div className="progress" style={{ height: '25px' }} onClick={() => submitVote(header)}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default VoteBar;
