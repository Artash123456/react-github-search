import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi'
import { GithubContext } from '../context/context';

const Navbar = () => {
  const {count, removeFromFavorites, favorites} = useContext(GithubContext)
  const [open, setOpen] = useState(false)
  return (
        <Wrapper>
          <div className="burger">
            <div className="hamburger" onClick={() =>setOpen(!open)}>
              <GiHamburgerMenu/>
            </div>
            <nav className={open?"opened":""}>
              <ul >
                  <li onClick={()=>window.scrollTo(0,0)}>Search by Users</li>
                  <li onClick={()=>window.scrollTo(1100,1100)}>Search by Repos</li>
                  <li onClick={()=>window.scrollTo(1200,1200)}>Favorites<span>{count}</span></li> 
                  {favorites.map(elem=> {
                    const keys = Object.keys(elem)
                    const values = Object.values(elem)
                    return (
                  <li key = {keys}><a target = "_blank" rel="noopener noreferrer" href = {values}>{keys}</a> <h6 onClick={()=>removeFromFavorites(keys)}>X</h6></li>)})} 
              </ul>
            </nav>
          </div>
        </Wrapper>
  );
};

const Wrapper = styled.nav`
height:50px;
.burger .hamburger{
      position: fixed;
      right: 15px;
      top: 15px;
      width: 50px;
      height: 50px;
      text-align: center;
      color: #fff;
      background: rgba(52,58,64,.5);
      line-height: 50px;
      z-index: 999;
  }
  span{
    position: absolute;
    background: red;
    font-size: 10px;
    text-align: center;
    border-radius: 50%;
    width: 13px;
    top: 120px;
  };
  nav{
      position: fixed;
      z-index: 2;
      right: 0;
      width: 250px;
       height: 100%;
      transition: all .4s ease 0s;
      transform: translateX(250px);
      background: #1d809f;
      border-left: 1px solid rgba(255,255,255,.1);
  }

      ul{
          position: absolute;
          top: 0;
          width: 250px;
          margin: 0;
          padding: 0;
          list-style: none;

      }
          li {
              display: list-item;
              text-align: -webkit-match-parent;
              cursor:pointer;
              display: block;
              text-decoration: none;
              color: #fff;
              padding: 15px;
              text-align: left;
           
          }
          
  .opened{
      right: 250px;
      width: 250px;
      transition: all .4s ease 0s;
  }
  a{
    float:left;
    color:white;
    text-decoration:none;
  }
  h6{
    float:left;
    margin-left: 10px;
    font-size: 15px;
  }
 

  
`;

export default Navbar;
