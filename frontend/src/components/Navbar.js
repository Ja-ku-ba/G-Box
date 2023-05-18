import React, { useEffect, useState, useContext } from 'react'

import { Link } from 'react-router-dom';

import { UserContext } from '../pages/Login';

const Navbar = () => {
  const user = useContext(UserContext);
  console.log(user, 'Hakuna Matata!')
  let time = new Date()
  function addZ(n){return n<10? '0'+n:''+n;}

  const [date, setDate] = useState(`${addZ(time.getDate())}.${addZ(time.getMonth())}.${time.getFullYear()}, ${addZ(time.getHours())}:${addZ(time.getMinutes())}`);
  
  // later turn into seperate component
  
  useEffect(() => {
    let timer = setInterval(() => {
      setDate(`${addZ(time.getDate())}.${addZ(time.getMonth())}.${time.getFullYear()}, ${addZ(time.getHours())}:${addZ(time.getMinutes())}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  let logout = async () => {
      await fetch('/api/logout/', {'method': 'POST'})
  }

  return (
      <UserContext.Provider value={user}>
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to={'/inbox/ALL'} className='clock'>{date.toString()}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
            <div className="collapse navbar-collapse nav-rigth" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to={'/send/'}>nowa wiadomosc</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#">{ user }l</a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={ "" } onClick={ logout }>Wyloguj</Link>
                  </li>
              </ul>
          </div>
        </div>
    </nav>
      </UserContext.Provider>
  )
}

export default Navbar


