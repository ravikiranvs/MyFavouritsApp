import React from "react";
import { Redirect } from "react-router-dom";
import queryString from "../utils/queryString";
import { reddit as redditAccessTokenStore } from "../utils/auth-tokens";
import { TokenClient } from "../Data/web-api";

interface IRedditAuthHandlerState {
    authTokenGenerated: boolean;
}

class RedditAuthHandler extends React.Component<{}, IRedditAuthHandlerState> {
    constructor(props: {}) {
        super(props);
        this.state = { authTokenGenerated: false };
    }

    componentDidMount() {
        const code = queryString("code");
        const resp = new TokenClient()
            .reddit(redditAccessTokenStore.get(), code)
            .then((tokenData) => {
                redditAccessTokenStore.set(tokenData.token);
                this.setState({ authTokenGenerated: true });
            });
    }

    render() {
        return this.state.authTokenGenerated ? (
            <Redirect to={{ pathname: "/" }}></Redirect>
        ) : (
            <div>Generating Token</div>
        );
    }
}

export default RedditAuthHandler;