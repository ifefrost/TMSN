import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const token = { value: sessionStorage.getItem("token") };

  const redirectIfLoggedIn = async () => {
    if (token.value) {
      navigate("/");
    }
  };

  useEffect(() => {
    redirectIfLoggedIn();
  }, []);


  const handleChange = (prop) => (event) => {
    setValues({
      ...values, [prop]: event.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const body = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    try {

      if (values.username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }

      //validate email against regex
      const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
      if (!emailRegex.test(values.email)) {
        throw new Error('Invalid email address');
      }

      if (values.password.length < 4) {
        throw new Error('Password must be at least 4 characters');
      }

      if (values.confirmPassword !== values.password) {
        throw new Error('Passwords do not match');
      }
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
      }
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem('token', data.data.token);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      // reset states on unmount
      setLoading(false);
      setValues({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    }
  }, [])
    return (
      <div className='mx-auto max-w-screen-xl px-8'>
        <div className='mt-16 mb-16 bg-[#1F2230] text-white p-10 flex flex-col items-center rounded-[12px]'>
          <h1 className="text-[2rem] font-bold">Sign Up</h1>
          {error ? (<p className='mt-3 rounded-lg bg-white p-2 text-red-700 font-[600] text-[0.875rem]' >{error}</p>) : <div className='mt-6 mb-6'></div>}
          <form onSubmit={(e) => handleSubmit(e)} className="mt-2 flex flex-col items-center">
  
            <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-[1.125rem] font-[600] mb-2">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleChange('username')}
                value={values.username}
                className='text-black focus:ring-gray-400 focus:border-gray-500 block w-[385px] px-5 sm:text-lg h-[42px] border-black border-1 rounded-full'
                placeholder="username"
              />
              <label htmlFor="email" className="text-[1.125rem] font-[600] mb-2">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange('email')}
                value={values.email}
                className='text-black focus:ring-gray-400 focus:border-gray-500 block w-[385px] px-5 sm:text-lg h-[42px] border-black border-1 rounded-full'
                placeholder="example@email.com"
              />
              <label htmlFor="password" className="text-[1.125rem] font-[600] mb-2 mt-5">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange('password')}
                className='text-black focus:ring-gray-400 focus:border-gray-500 block w-[385px] px-5 sm:text-lg h-[42px] border-black border-1 rounded-full'
                placeholder="********"
              />
              <label htmlFor="passwordConfirm" className="text-[1.125rem] font-[600] mb-2 mt-5">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                onChange={handleChange('confirmPassword')}
                value={values.confirmPassword}
                className='text-black focus:ring-gray-400 focus:border-gray-500 block w-[385px] px-5 sm:text-lg h-[42px] border-black border-1 rounded-full'
                placeholder="********"
              />
            </div>
  
            <button className='mt-14 bg-blue-700 h-[46px] w-[142px] border-white border-2 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded-full hover:shadow' disabled={loading}>
                  Sign Up
            </button>
  
            <p className="text-[1.125] font-[500] mt-10">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign In</Link></p>
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;