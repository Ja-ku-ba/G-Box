import React from 'react'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand nav-link" href="#">12:45, 12.06.2023</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
            <div class="collapse navbar-collapse nav-rigth" id="navbarNav">
              <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">username@gmail.com</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">wyloguj</a>
                  </li>
              </ul>
          </div>
        </div>
    </nav>
  )
}

export default Navbar


// import React from 'react'

// const Navbar = () => {
//   return (
//     <nav class="navbar navbar-expand-lg">
//         <div class="container-fluid">
//           <a class="navbar-brand nav-link" href="#">12:45, 12.06.2023</a>
//           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon"></span>
//           </button>
//           <div>
//             <div class="collapse navbar-collapse" id="navbarNav">
//               <ul class="navbar-nav">
//                   <li class="nav-item">
//                     <a class="nav-link" aria-current="page" href="#">username@gmail.com</a>
//                   </li>
//                   <li class="nav-item">
//                     <a class="nav-link" href="#">wyloguj</a>
//                   </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//     </nav>
//   )
// }

// export default Navbar
