import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import queryString from "../utils/queryString";
import { reddit as redditAccessTokenStore } from "../utils/auth-tokens";
import { TokenClient } from "../Data/web-api";

const RedditAuthHandler: React.FC = (props) => {
    const [state, setState] = useState({ authTokenGenerated: false });
    console.log("Inside RedditAuthHandler");
    const code = queryString("code");
    const resp = new TokenClient()
        .reddit(redditAccessTokenStore.get(), code)
        .then((tokenData) => {
            redditAccessTokenStore.set(tokenData.token);
            setState({ authTokenGenerated: true });
        });
    return state.authTokenGenerated ? (
        <Redirect to={{ pathname: "/" }}></Redirect>
    ) : (
        <div>Generating Token</div>
    );
};

export default RedditAuthHandler;