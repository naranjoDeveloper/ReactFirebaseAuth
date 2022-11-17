import "./App.css";
import Forms from "./components/common/Forms";
import Home from "./components/Home";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { app } from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }
  }, [])



  const handleAction = (id) => {
    const authentication = getAuth();

    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password).then(
        (response) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
          navigate("/home");
        }
      ).catch((error) => {
        if (error.code ==='auth/weak-password') {
          toast.error('La contraseña es muy debil, minimo 6 caracteres' ,{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
        }else if (error.code ==='auth/invalid-email') {
          toast.error('El Correo Es Invalido' ,{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
        }else if (error.code ==='auth/email-already-in-use') {
          toast.error('Ya existe un correo registrado con este nombre , intenta con otro' ,{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
        }else if(error.code){
          toast.error(error.code)
        }
      })
    } else {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if(error.code === 'auth/user-not-found'){
            toast.error('No existe un usuario con ese correo , intenta con otro' ,{
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              })
          }else if(error.code === 'auth/wrong-password'){
            toast.error('La contraseña no coincide, vuelve a intentarlo' ,{
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              })
          }else if(error.code === 'auth/too-many-requests'){
            toast.error('Has hecho muchas peticiones, vuelve a intentarlo mas tarde' ,{
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              })
          }else if(error.code){
            toast.error(error.code ,{
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              })
          }
        })
    }
  };

  return (
    <div className="App">
      <>
        <Routes>
          <Route
            path="/login"
            element={
              <Forms
                title="Login"
                setEmail={setEmail}
                handleAction={() => handleAction(1)}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Forms
                title="Register"
                setEmail={setEmail}
                handleAction={() => handleAction(2)}
                setPassword={setPassword}
              />
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </>
      <ToastContainer/>
    </div>
  );
}

export default App;
