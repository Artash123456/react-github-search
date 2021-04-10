import React, { useState, useEffect } from 'react';
import mockUser from './mockData/mockUser';
import mockRepos from './mockData/mockRepos';
import mockFollowers from "./mockData/mockFollowers";
import axios from 'axios';
import DB from "./firebase";

const rootUrl = 'https://api.github.com';
const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repository, setRepository] = useState(mockRepos);  
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState({show:false, msg:""})
    const [count, setCount] = useState(0)
    const [favorites, setFavorites] = useState([])
    // checking requests count 
const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
    .then(({data}) => {
        let {rate:{remaining}} = data
        setRequests(remaining)
        if(remaining ===0) {
            toggleError(true, 'Sorry you have exeeded your hourly rate limit')
        }
    })
    .catch((error) =>console.error(error));
};
const toggleError = (show = false, msg = '') => {
    seterror({
        show, msg
    })
}
const searchGithubUser = async(user) => {
   toggleError();
   setLoading(true)
   const response = await axios(`${rootUrl}/users/${user}`)
   .catch((error) =>console.error(error));
   if(response){
       setGithubUser(response.data);
        const {login, followers_url} = response.data;
        await Promise.allSettled([
            axios(`${rootUrl}/users/${login}/repos?per_page=100`),
            axios(`${followers_url}?per_page=100`)
        ])
        .then((result)=>{
            const [repos, followers] = result;
            const status = "fulfilled";
            if(repos.status ===status){
                setRepos(repos.value.data);
            };
            if(followers.status ===status){
             setFollowers(followers.value.data);
            };

        }).catch(err =>console.error(err));
   }else{
       toggleError(true, "There is no user with that username")
   };
   checkRequests();
   setLoading(false);
}

const searchRepository = async(rep) => {
    toggleError();
    setLoading(true)
    const response = await axios(`https://api.github.com/search/repositories?q=${rep}`)
    .catch((error) =>console.error(error));
    if(response){
        setRepository(response.data.items);
        console.log(repository);
    }
    checkRequests();
    setLoading(false);
}
//------add to firebase-------------
const addToFavorites =(elem)=>{
     DB.database().ref(`favorites/${elem.name}`).set(elem.clone_url)
};
//-----remove from firebase ------------
const removeFromFavorites = (elem) =>{
    DB.database().ref(`favorites/${elem}`).remove()

}
useEffect(() => {
    DB.database().ref("favorites").on("value",(users)=>{
        let favor =[];
        users.forEach(e=>{
          console.log(e.key);
          let onlyfav = {[e.key]: e.val()}
          favor.push(onlyfav)
        })
        setFavorites(favor)
        setCount(favor.length)
    })
}, [])
useEffect(checkRequests, [])
console.log(favorites);
    
    return <GithubContext.Provider
    value = {{
        searchGithubUser, 
        searchRepository,
        repository,
        error,
        requests,
        githubUser, 
        repos, 
        followers,
        loading,
        count,
        addToFavorites,
        removeFromFavorites,
        favorites
    }}>{children}</GithubContext.Provider>
}
export {GithubProvider, GithubContext}