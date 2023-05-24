import React, { useState,useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import "../estilos/Login.css";
import "../estilos/Pages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

//Accede a login (inicio de sesion) de la API
const LOGIN_URL = '/login';


const Login = () => {

    
  // const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');
   



    useEffect(() => {
        setErrMsg('');
    }, [email,pwd])

    useEffect(() => {
        const loggedUserJSON = window.sessionStorage.getItem('loggedNoteAppUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setSuccess(true);
            
        }
    }, [])


    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email:email, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            //console.log(JSON.stringify(response));
            //const accessToken = respuesta?.data?.accessToken;
            console.log(JSON.stringify(respuesta?.data));
            console.log(JSON.stringify(respuesta?.config?.data))
            setSuccess(true)
            window.sessionStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(respuesta)
            )
            setEmail('');
            setPwd('');
           
        } catch (err){
            if(!err?.respuesta)
            {
                setErrMsg('Sin respuesta del servidor')
            }
            else if(err.respuesta?.status === 400 )
            {
                setErrMsg('Email o contraseña son incorrectos');
            }
            else if (err.respuesta?.status === 401)
            {
                setErrMsg('No autorizado')
            }
            else
            {
                setErrMsg('Error en el inicio de sesión')
            }
            errRef.current.focus();
        }
    }
/*
    const [ojos,setOjos]=useState(faEye)
    const SeePassword=()=>{
        let pass = document.getElementById("myPassword");
        if(pass.type==="password"){
            pass.type="text";
            setOjos(faEyeSlash);        
        }
        else if(pass.type==="text"){
            pass.type="password";
            setOjos(faEye);
        }
        
    */
    return (
		<>
			{success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					
				</section>
			) : (
			<>
				<div class="bar">
                        <div class="container">
                        <span class="display-1"><b>Iniciar sesión</b></span>
                        </div>
                    </div><div class="container" id="log_sign">
                            <div class="row">
                                <div class="col-sm-12 col-md-6 sign">
                                    <h2>¿No tienes una cuenta?</h2>
                                    <p>Para poder contestar la Autoevaluación es necesario tener una cuenta de usuario, si aún no la tiene, de clic en el botón de Crear cuenta.</p>
                                   <Link to={'/Registrarse'}> <button>  CREAR CUENTA</button></Link>
                                </div>
                                <div class="col-sm-12 col-md-6 login">

                                    <h2>Bienvenido</h2>
                                    <h3>Iniciar sesión ahora</h3>
                                    <p 
                                    ref={errRef} 
                                    className={errMsg ? 'errmsg' : 'offscreen'} 
                                    aria-live="assertive"
                                    >
                                        {errMsg} 
                                    </p>
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type={"text"}
                                            required
                                            placeholder="Ingrese su Correo Electrónico"
                                            ref={userRef}
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email} />
                                        <br />
                                        <input
                                            id="myPassword"
                                            required
                                            type={"password"}
                                            placeholder="Ingrese su contraseña"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd} />
                                      
                                        <button id="ingresar">INGRESAR</button>
                                    </form>
                                </div>
                            </div>
                        </div>
			</>)}
		</>
	);
};
export default Login

