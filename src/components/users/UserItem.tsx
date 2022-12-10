import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../app/hooks";
import { deleteUser, getUserInfo } from "../../features/users/usersSlice";
import { Cell } from "../../styles/users";
import { User } from "../../types";

const UserItem = ({ id, first_name, last_name, email }: User) => {
  const dispatch = useAppDispatch();
  return (
    <div className="grid grid-cols-5 px-10 lg:px-0 py-6 border-b border-gray-100">
      <div className="w-full flex items-center text-sm lg:text-base lg:justify-center text-gray-700">
        {id}
      </div>
      <div className="w-full flex items-center text-sm lg:text-base lg:justify-center text-gray-700">
        {first_name}
      </div>
      <div className="w-full flex items-center text-sm lg:text-base lg:justify-center text-gray-700">
        {last_name}
      </div>
      <div title={email} className="w-[180px] overflow-hidden text-ellipsis block lg:flex lg:w-full items-center text-sm lg:text-base lg:justify-center text-gray-700">
        {email}
      </div>
      <Cell>
        <Cog6ToothIcon
          onClick={() => dispatch(getUserInfo(id ?? 0))}
          className="w-6 h-6 cursor-pointer mr-3 text-blue-400"
        />
        <TrashIcon
          onClick={() => dispatch(deleteUser(id ?? 0))}
          className="w-5 h-6 cursor-pointer text-red-400"
        />
      </Cell>
    </div>
  );
};

export default UserItem;
