const Modal = ({ trailerKey, visible, close }) => {
  if (!visible) return null;
  const handleInvisible = (e) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div
      className='fixed inset-0 bg-black text-white bg-opacity-50 backdrop-blur-sm flex justify-center items-center'
      onClick={handleInvisible}
    >
      <div className='relative w-[80rem] h-[45rem]'>
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          className='absolute inset-0 w-full h-full'
          allowFullScreen
          title='Embedded youtube'
        />
        <div className='absolute top-0 right-0 p-4'>
          <button className='text-3xl font-bold leading-none' onClick={close}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
