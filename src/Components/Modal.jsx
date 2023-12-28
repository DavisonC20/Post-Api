import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdCancel } from "react-icons/md";
import { getComments, getDetails } from "../Services/api-post";
import CardComments from "./CardComments";
function Modal({ isOpen, onClose, idUser }) {
  const [open, setOpen] = useState(true);
  const [dataPostDetail, setdataPostDetail] = useState([]);
  const [dataPostComments, setDataPostComments] = useState([]);

  useEffect(() => {
    // Función asincrónica para realizar la solicitud a la API
    const fetchData = async () => {
      try {
        // Llama a la función externa que realiza la solicitud a la API
        const details = await getDetails(idUser);
        const comments = await getComments(idUser);
        setdataPostDetail(details);
        setDataPostComments(comments);
      } catch (error) {
        // Maneja errores
        //setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    // Llama a la función para realizar la solicitud cuando el componente se monta
    fetchData();
  }, [isOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="flex-none min-w-0  mr-3">
                      <img
                        className="h-12 w-12  rounded-full object-cover self-center"
                        src={`https://xsgames.co/randomusers/assets/avatars/male/${idUser}.jpg`}
                        width={60}
                        height={60}
                        alt="Foto de  perfil"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {dataPostDetail.title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {dataPostDetail.body}
                        </p>
                      </div>
                      <div>
                        <span className="truncate text-sm leading-9 text-gray-500">
                          comentarios
                        </span>
                        {dataPostComments.map((comment) => (
                          <CardComments
                            DataComments={comment}
                            key={comment.id}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                    /*  ref={cancelButtonRef} */
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
