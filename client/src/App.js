import React, {useState,useEffect} from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBookForm from './components/NewBookForm'
import Login from './components/Login'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  
  useEffect(()=>{
    const savedToken = localStorage.getItem('libraryApp-userToken')
    if(savedToken){
      setToken(savedToken)
    }
  },[])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logOut = () => {
    setToken('')
    localStorage.clear()
    client.resetStore()
    
  }

  if (!token) {
    return (
      <div className="App">
        <h2>Library-App</h2>
        <Notify errorMessage={errorMessage} />
        <h2 className="header">Login</h2>
        <Login
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div className="App">
      <h2 className="header">Library-App</h2>
      <p><strong>Username:</strong> shivachit1</p>
      <button className="redButton" onClick={() => logOut()}>Logout</button>
      <div>
        <button className="linkButton" onClick={() => setPage('authors')}>Authors</button>
        <button className="linkButton" onClick={() => setPage('books')}>Books</button>
        <button className="linkButton" onClick={() => setPage('add')}>Add book</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <NewBookForm setError={notify}/>
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBookForm
        show={page === 'add'}
      />
    </div>
  )
}


const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App