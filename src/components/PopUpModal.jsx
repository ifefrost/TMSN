const PopUpModal = ({ visible, close }) => {
    if (!visible) return null;
    const handleInvisible = (e) => {
      if (e.target === e.currentTarget) close();
    };
  
    return (
      <div
        className='fixed inset-0 bg-black text-white flex justify-center items-center'
        onClick={handleInvisible}
      >
        <div className='relative w-[80rem] h-[45rem]'>
          List of followers 
          <div className='absolute top-0 right-0 p-4'>
            <button className='text-3xl font-bold leading-none' onClick={close}>
              &times;
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PopUpModal;
  