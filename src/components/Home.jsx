import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {


  let navigate = useNavigate();

  //cada vez que el componente se carga o monta se ejecuta esta comprobacion
  useEffect(() => {
    //se obtiene el token del local storage
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }

    if (!authToken) {
      navigate('/login')
    }
  }, [])

  
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
  }

  return (
    <div>
      home
      <button onClick={handleLogout} >Cerrar Sesion</button>
    </div>
  )
}

export default Home