//import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from '../../assets/img2.png'
import useAuthContext from "../../Hooks/useAuthContext";
import Swal from 'sweetalert2'
import { useEffect } from "react";



const LogInPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn,user } = useAuthContext();


    const from = location.state?.from?.pathname || "/";
    console.log(from)

    useEffect(()=>{
        if(user){
            navigate(from, { replace: true });
 
        }

    },[user])



    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-orange-500 text-5xl font-bold mb-5 text-center">Login now!</h1>
                        <img src={img1} />
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            
                            <div className="form-control mt-6">
                                {/* TODO: apply disabled for re captcha */}
                                <input  className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <div className='text-center py-5'>
                        <p className="text-center"><small>New Here? <Link to="/signUp">Create an account</Link> </small></p>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;