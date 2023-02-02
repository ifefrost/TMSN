import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import PortraitSliderItem from "./PortraitSliderItem";

const PortraitSlider = ({ heading, movieArray }) => {
    return (
        <div className="text-white">
            <h3 className="font-bold text-[2rem]">{heading}</h3>
            <div className="flex items-center gap-10">
                <MdKeyboardArrowLeft className="w-[52px] h-[52px]"/>
                <div className="flex gap-[3.5rem]">
                    {movieArray.map((movie) => (
                        <PortraitSliderItem movie={movie} />
                    ))}
                </div>
                <MdKeyboardArrowRight className="w-[52px] h-[52px]" />
            </div>
        </div>
    );
}

export default PortraitSlider;