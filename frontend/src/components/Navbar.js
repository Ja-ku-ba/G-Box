import React, { useEffect, useState } from 'react'

const Navbar = () => {

  const [date, setDate] = useState(new Date());
  
  // later turn into seperate component
  useEffect(() => {
    let timer = setInterval(() => {
      let time = new Date()
      setDate(`${time.getHours()}:${time.getMinutes()}, ${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand nav-link" href="#">{date.toString()}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
            <div className="collapse navbar-collapse nav-rigth" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#">username@gmail.com</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">wyloguj</a>
                  </li>
              </ul>
          </div>
        </div>
    </nav>
  )
}

export default Navbar


