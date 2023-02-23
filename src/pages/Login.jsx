import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='mx-auto max-w-screen-xl px-8'>
      <div className='mt-16 mb-16 bg-[#1F2230] text-white p-10 flex flex-col items-center rounded-[12px]'>
        <h1 className="text-[2rem] font-bold">Welcome Back!</h1>

        <form action="" className="mt-10 flex flex-col items-center">

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[1.125rem] font-[600] mb-2">Email</label>
            <input type="email" name="email" id="email" className='text-black focus:ring-gray-400 focus:border-gray-500 block w-[385px] px-5 sm:text-lg h-[42px] border-black border-1 rounded-full' placeholder="example@email.com"/>
            <label htmlFor="password" className="text-[1.125rem] font-[600] mb-2 mt-5">Password</label>
            <input type="password" name="password" id="password" className='text-black focus:ring-gray-400 focus:border-gray-500 block w-[385px] px-5 sm:text-lg h-[42px] border-black border-1 rounded-full' placeholder="********" />
          </div>

          <div className="flex items-center gap-2 mb-5 w-full">
            <p className="text-[1rem] text-[#7e7f88] underline font-[500] mt-5"><a href="" className="hover:text-blue-500">Forgot Password?</a></p>
          </div>

          <button className='bg-blue-700 h-[46px] w-[142px] border-white border-2 hover:bg-blue-900 text-white font-bold py-1 px-4 mt-3 rounded-full hover:shadow'>
                Sign In
          </button>

          <p className="text-[1.125] font-[500] mt-10">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
