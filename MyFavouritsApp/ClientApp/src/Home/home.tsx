import React, { useState, useEffect } from "react";
import { RedditDataClient, RedditFavouritsResponceRoot } from "../Data/web-api"
import { reddit } from "../utils/auth-tokens";
const s = require("./home.css");

const Home: React.FC = (props) => {
  const [redditSavedState, setSedditSavedState] = useState<RedditFavouritsResponceRoot | null>(null);
  useEffect(() => {
    const token = reddit.get();
    new RedditDataClient().favourits(token).then((redditSaved) => setSedditSavedState(redditSaved));
  }, []);

  if (!!redditSavedState) {
    var favJsx = redditSavedState.data?.children?.map((f) => {
      const createdDateSeconds = f.data?.created;
      let createdDate: Date | undefined = undefined;
      if(!!createdDateSeconds) {
        createdDate = new Date(0);
        createdDate.setUTCSeconds(createdDateSeconds);
      }
      return (
        <div key={f.data?.id} style={{ padding: "20px", overflow: "hidden", maxHeight: "50px", textOverflow: "ellipsis" }}>
          <div><a href={f.data?.url} target="_blank">{f.data?.title}</a></div>
          <div>{createdDate?.toDateString()}</div>
          <div>{f.data?.selftext}</div>
        </div>
      );
    });
    return (
      <div>
        <h1 className="header" style={{ textAlign: "center" }}>My Favourits</h1>
        <div>{favJsx}</div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default Home;