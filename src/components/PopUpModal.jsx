const PopUpModal = ({ visible, close }) => {
    if (!visible) return null;
    const handleInvisible = (e) => {
      if (e.target === e.currentTarget) close();
    };
  
    return (
      <div
        className='fixed inset-0 bg-black bg-opacity-50 text-white flex justify-center items-center z-10'
        onClick={handleInvisible}
      >
        <div className='relative w-[50rem] h-[40rem] bg-[#1F2230]'>
           
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
  