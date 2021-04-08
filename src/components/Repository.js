import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';

const Repository = () => {
  const { repository, addToFavorites } = React.useContext(GithubContext); 
 
  return(
        <section className = "section">
          <Wrapper className="section-center">
            {repository.map((elem, index) =>{
            return ( 
            <header key = {elem.id}>
              <div>
                <h4>Repo Name :</h4>
                <h4>Owner :</h4>
                <h4>Url to Repo :</h4>
                <h4>Forks :</h4>
                <h4>Stars :</h4>
              </div>  
              <div>
                <h4 onClick={()=>addToFavorites(elem)}><abbr title = "Click to add to favorites...))">{elem.name}</abbr></h4>
                <h4>{elem.owner.login}</h4>
                <h4><a target="_blank" rel = "" href = {elem.forks_url}>Click to go</a></h4>
                <h4>{elem.forks_count}</h4>
                <h4>{elem.stargazers_count}</h4>               
              </div>
            </header>
            )})}
            
          </Wrapper>
        </section>
    )
}
const Wrapper = styled.article`
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: 'Rrepositories... / Favorites';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  };
  button {
    border-radius: 5px;
    border-color: transparent;
    padding: 0.25rem 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    background: var(--clr-primary-5);
    color: var(--clr-white);
    transition: var(--transition);
    cursor: pointer;
    transform: translate(20px, 70px);
    &:hover {
      background: var(--clr-primary-8);
      color: var(--clr-primary-1);
    }
    
  };
  header {
    background:var(--clr-grey-10);
    display: grid;
    padding:0.5rem;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    div {
      display: grid;
      grid-template-rows:repeat(5, 1fr) ;
      width: 100%;
      text-align: right;
      a {
        color: var(--clr-grey-5);
      };
    };
  `
export default Repository;