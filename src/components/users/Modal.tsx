import { Dialog, Transition } from "@headlessui/react";
import {
  EnvelopeIcon,
  PencilSquareIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Form, FormikProvider, useFormik } from "formik";
import { Fragment } from "react";
import { FormSchema } from "../../utils/Schema";
import Input from "../../common/Input";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleEditModal, updateUser } from "../../features/users/usersSlice";

const Modal = () => {
  const { editFormData, editModalOpen } = useAppSelector(
    (store) => store.users
  );
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      id: editFormData.id,
      first_name: editFormData.first_name,
      last_name: editFormData.last_name,
      email: editFormData.email,
    },
    validateOnBlur: false,
    enableReinitialize: true,
    validationSchema: FormSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
    },
  });

  return (
    <Transition appear show={editModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={editModalOpen}
        onClose={() => dispatch(toggleEditModal())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  <div>
                    <h5 className="text-base text-gray-900 font-semibold">
                      User setup
                    </h5>
                    <p className="text-xs text-gray-600 mt-1">Information</p>
                  </div>
                  <button
                    onClick={() => dispatch(toggleEditModal())}
                    type="button"
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-100"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-900" />
                  </button>
                </Dialog.Title>
                <div className={`p-4 mt-6 border border-gray-100 rounded-xl`}>
                  <div className="flex items-center">
                    <div className="h-12 w-12 border border-gray-100 flex justify-center items-center relative rounded-full">
                      <UserIcon className="w-4 h-4 text-gray-900" />
                      <div
                        className="w-5 h-5 bg-gray-100 rounded-full absolute -bottom-1 -right-1 flex items-center justify-center"
                        style={{ outline: "3px solid #fff" }}
                      >
                        <PencilSquareIcon className="w-3 h-3" />
                      </div>
                    </div>
                    <div className={`ml-5`}>
                      <p className="text-sm text-gray-600">
                        {editFormData.email}
                      </p>
                    </div>
                  </div>
                  <FormikProvider value={formik}>
                    <Form autoComplete="off" className={`mt-6`}>
                      <div className="relative mb-4">
                        <UserIcon className="absolute left-3 top-3 w-4 h-4 text-gray-900" />
                        <Input
                          name="first_name"
                          placeholder="First name"
                          type="text"
                          errorMessage={
                            !!formik.errors.first_name
                              ? formik.errors.first_name
                              : ""
                          }
                          invalid={!!formik.errors.first_name}
                        />
                      </div>
                      <div className="relative mb-4">
                        <UserIcon className="absolute left-3 top-3 w-4 h-4 text-gray-900" />
                        <Input
                          name="last_name"
                          placeholder="Last name"
                          type="text"
                          errorMessage={
                            !!formik.errors.last_name
                              ? formik.errors.last_name
                              : ""
                          }
                          invalid={!!formik.errors.last_name}
                        />
                      </div>
                      <div className="relative mb-4">
                        <EnvelopeIcon className="absolute left-3 top-3 w-4 h-4 text-gray-900" />
                        <Input
                          name="email"
                          placeholder="Email"
                          type="email"
                          errorMessage={
                            !!formik.errors.email ? formik.errors.email : ""
                          }
                          invalid={!!formik.errors.email}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={!formik.isValid}
                        className={`${
                          !formik.isValid && "opacity-40"
                        } bg-blue-500 rounded-xl text-white flex items-center justify-center w-full font-semibold`}
                        style={{ height: "52px" }}
                      >
                        Save changes
                      </button>
                    </Form>
                  </FormikProvider>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
