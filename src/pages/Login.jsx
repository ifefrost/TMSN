import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_HOST } from '../util/api';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
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
    setError('')
    setLoading(true);
    const body = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await fetch(`${API_HOST}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        throw new Error(error.message)
      }
      const result = await response.json();
      console.log(result);
      sessionStorage.setItem('token', result.data.token);
      sessionStorage.setItem('user', result.data.user);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='mx-auto px-2 md:px-8 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:max-w-screen-xs max-w-sm'>
      <div className='mt-16 mb-16 bg-[#1F2230] text-white p-5 sm:p-10 flex flex-col items-center rounded-[12px]'>
        <h1 className="text-[2rem] font-bold">Welcome Back!</h1>
        {error ? (<p className='mt-3 rounded-lg bg-white p-2 text-red-700 font-[600] text-[0.875rem]'>{error}</p>) : <div className='mt-6 mb-6'></div>}
        <form  onSubmit={(e) => handleSubmit(e)} className="mt-2 flex flex-col items-center">

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[1.125rem] font-[600] mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className='text-black focus:ring-gray-400 focus:border-gray-500 block w-[250px] sm:w-[385px] px-5 sm:text-lg h-[42px] border-black border-1 rounded-full'
              placeholder="example@email.com"
              onChange={handleChange('email')}
              value={values.email}
            />
            <label htmlFor="password" className="text-[1.125rem] font-[600] mb-2 mt-5">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className='text-black focus:ring-gray-400 focus:border-gray-500 block w-[250px] sm:w-[385px] px-5 sm:text-lg h-[42px] border-black border-1 rounded-full'
              placeholder="********"
              onChange={handleChange('password')}
              value={values.password}
            />
          </div>

          <div className="flex items-center gap-2 mb-5 w-full">
            <p className="text-[1rem] text-[#7e7f88] underline font-[500] mt-5"><a href="" className="hover:text-blue-500">Forgot Password?</a></p>
          </div>

          <button disabled={loading} className='bg-blue-700 h-[46px] w-[142px] border-white border-2 hover:bg-blue-900 text-white font-bold py-1 px-4 mt-3 rounded-full hover:shadow'>
                Sign In
          </button>

          <p className="text-[1.125] font-[500] mt-10">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
