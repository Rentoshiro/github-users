import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

//Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollower] = useState(mockFollowers);
  //request loading
  const [requests, setRequest] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  //error
  const [error, setError] = useState({ show: false, msg: "" });

  async function searchGithubUser(user) {
    //toggleError
    //setLoading(true)
    try {
      setIsLoading(true);
      const response = await axios.get(`${rootUrl}/users/${user}`);
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      const repos = await axios.get(
        `${rootUrl}/users/${login}/repos?per_page=100`
      );
      setRepos(repos.data);
      const followers = await axios.get(`${followers_url}?per_page=100`);
      setFollower(followers.data);
      toggleError(false, "");
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        toggleError(true, "there in no user with that username");
      }
    }
  }

  //check rate
  const checkRequests = async () => {
    try {
      const response = await axios(`${rootUrl}/rate_limit`);
      const { remaining } = response.data.rate;
      setRequest(remaining);
      if (remaining === 0) {
        //throw an error
        toggleError(true, "sorry, you have exceeded your hourly rate limit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  useEffect(() => {
    checkRequests();
  }, [githubUser]);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        isLoading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
