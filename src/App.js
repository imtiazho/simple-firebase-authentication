import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function App() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [user, setUser] = useState({})

  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        // The signed-in user info.
        const user = result.user;
        setUser(user)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      }

      )
  }
  const handlegithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user
      setUser(user)
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <div className="App">
      {

        user.uid ?
          <><button onClick={handleGoogleSignOut}>Sign Out</button>
          </>
          :
          <>
            <button onClick={handleGoogleSignin}>Google Signin</button>
            <button onClick={handlegithubSignIn}>Github SignIn</button>
          </>
      }
      <h2>UserName: {user.displayName}</h2>
      <p>User Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
