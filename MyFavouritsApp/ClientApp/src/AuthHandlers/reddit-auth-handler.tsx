import React from "react";
import { Redirect } from "react-router-dom";
import queryString from "../utils/queryString";
import { reddit as redditAccessTokenStore } from "../utils/auth-tokens";

const RedditAuthHandler: React.FC = (props) => {
    console.log("Inside RedditAuthHandler");
    const accessToken = queryString("code");
    redditAccessTokenStore.set(accessToken);
    return <Redirect to={{ pathname: "/" }}></Redirect>;
};

export default RedditAuthHandler;