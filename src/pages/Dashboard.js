import React from 'react';
import {SearchByRepos, Info, Repos, User, Search, Navbar, Repository } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';


const Dashboard = () => {
  const {loading} = React.useContext(GithubContext)
  if(loading){
    return(
      <main>
        <Navbar/>
        <Search/>
        <img src={loadingImage} className = "loading-img" alt = "Loading ..." />
      </main>
    )
  };
  return(
      <main>
        <Navbar/>
        <Search/>
        <Info/>
        <User/>
        <Repos/>
        <SearchByRepos/>
        <Repository/>
      </main>
  )
};

export default Dashboard;
