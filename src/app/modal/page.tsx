'use client';
import { useState } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-indigo-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 hover:text-white"
      >
        Abrir Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-black text-xl font-bold">Título del Modal </h2>
            <p className=" text-black mt-4">Este es el cuerpo del modal.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-md bg-red-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-red-400 hover:text-white "
            >
              Cerrar Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
