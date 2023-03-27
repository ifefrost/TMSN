import { useNavigate } from "react-router-dom";

const UserSearchResults = ({ user }) => {

    const navigate = useNavigate();

    const navigateToUser = () => {
        navigate(`/${user.username}`);
    }

    return (
        <div className="cursor-pointer flex flex-col w-full text-white bg-[#1F2230] rounded-xl p-5 my-5" onClick={navigateToUser}>
        <div className="w-full">
            <div className="mt-auto">
                <h3 className="text-[1.25rem] font-bold">
                {user.username}
                </h3>
            </div>
            </div>
            {/* <img
            src={noImage}
            alt={user.username}
            className="rounded-xl object-cover h-[340px] w-[225px]"
            /> */}
        </div>
    );
}

export default UserSearchResults;

