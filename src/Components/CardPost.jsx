import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import Modal from "./Modal";

const generarColorAleatorio = () => {
  const r = Math.floor(Math.random() * 100) + 100;
  const g = Math.floor(Math.random() * 100) + 100;
  const b = Math.floor(Math.random() * 100) + 100;

  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

  return color;
};

function CardPost({ id, title, pin, onPinned }) {
  const [colorFondo, setColorFondo] = useState(generarColorAleatorio());
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <ul
        className={`flex flex-col mt-4 mb-3 p-5 rounded-sm w-full
      }`}
        role="list"
        style={{ background: colorFondo }}
      >
        <li className="flex flex-row cursor-pointer" onClick={openModal}>
          <div className="flex-none min-w-0  mr-3">
            <img
              className="h-12 w-12  rounded-full object-cover self-center"
              src={`https://xsgames.co/randomusers/assets/avatars/male/${id}.jpg`}
              width={60}
              height={60}
              alt="Foto de  perfil"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold leading-6 text-gray-900">
              {title}
            </h4>
          </div>
          <div
            className={`ml-2 text-red-600 ${pin ? "cursor-pointer" : ""}`}
            onClick={onPinned}
          >
            {pin ? <IoIosHeart size={23} /> : <CiHeart size={23} />}
          </div>
        </li>
      </ul>
      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        idUser={id}
      />
    </>
  );
}

export default CardPost;
