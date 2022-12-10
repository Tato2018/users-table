import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Modal from "../../components/users/Modal";
import UserItem from "../../components/users/UserItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../../styles/theme";
import { Layout, TableHeader } from "../../styles/users";
import { User } from "../../types";
import { getUsers } from "./usersSlice";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../utils/ScrollToTop";

const UsersView = () => {
  const { hasMore, users, loading } = useAppSelector((store) => store.users);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const fetchUsers = () => {
    dispatch(getUsers(page));
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className=" w-[900px] lg:w-[1220px] mx-auto">
        <TableHeader>
          <div className="px-10 lg:px-0 w-full mx-auto grid grid-cols-5 relative">
            <div className="w-full flex items-center text-sm lg:text-base lg:justify-center">
              <h5 className="text-gray-900 cursor-default font-medium uppercase">
                id
              </h5>
            </div>
            <div className="w-full flex items-center text-sm lg:text-base lg:justify-center">
              <h5 className="text-gray-900 cursor-default font-medium uppercase">
                first name
              </h5>
            </div>
            <div className="w-full flex items-center text-sm lg:text-base lg:justify-center">
              <h5 className="text-gray-900 cursor-default font-medium uppercase">
                last name
              </h5>
            </div>
            <div className="w-[180px] lg:w-full flex items-center text-sm lg:text-base lg:justify-center">
              <h5 className="text-gray-900 cursor-default font-medium uppercase">
                email
              </h5>
            </div>
            <div className=" flex items-center text-sm lg:text-base justify-center">
              <h5 className="text-gray-900 cursor-default font-medium uppercase">
                actions
              </h5>
            </div>
          </div>
        </TableHeader>
        <div className="relative w-full min-h-[585px] overflow-auto mb-4 max-w-[1220px] mx-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 flex-1">
          {loading && users.length === 0 ? (
            <>
              <div className="absolute left-1/2 top-1/2">
                <ThreeDots width="50" color={theme.blue.light} />
              </div>
            </>
          ) : users.length !== 0 ? (
            <InfiniteScroll
              hasMore={hasMore}
              dataLength={users.length}
              next={fetchUsers}
              scrollThreshold={"200px"}
              loader={
                <ThreeDots
                  wrapperStyle={{ display: "flex", justifyContent: "center" }}
                  width="50"
                  color={theme.blue.light}
                />
              }
              endMessage={
                <div
                  onClick={() => ScrollToTop()}
                  className="mt-7 text-gray-500 cursor-pointer mx-auto  font-medium flex items-center justify-center"
                >
                  <p className="tracking-wide">Back to top</p>{" "}
                  <ArrowUpCircleIcon className="ml-1 mt-[2px] w-6 h-6 animate-pulse text-blue-400" />
                </div>
              }
            >
              {users.map((user: User) => (
                <UserItem key={user.id} {...user} />
              ))}
            </InfiniteScroll>
          ) : (
            <div className="w-full min-h-[585px] flex items-center justify-center">
              <div className="text-4xl font-semibold text-gray-500 tracking-wide">
                NO USERS FOUND
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal />
      <ToastContainer hideProgressBar={true} autoClose={1500} />
    </Layout>
  );
};

export default UsersView;
