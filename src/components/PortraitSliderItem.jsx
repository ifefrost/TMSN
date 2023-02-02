const PortraitSliderItem = ({ movie }) => {
    return (
        <div className="">
            <img
                src={movie.poster}
                alt={movie.title}
                className="rounded-xl object-cover h-[250px] w-[165px]"
            />
            <div className="w-[165px]">
                <p className="text-white font-bold text-[1.125rem]">{movie.title}</p>
                <p className="text-white text-[1rem]">{movie.date}</p>
            </div>
        </div>
    );
}

export default PortraitSliderItem;