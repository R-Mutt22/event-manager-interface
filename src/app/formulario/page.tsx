'use client';
import { useState } from 'react';

export default function Formulario() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let formErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (name.trim() === '') {
      formErrors.name = 'El nombre es obligatorio';
      isValid = false;
    }
    if (!validateEmail(email)) {
      formErrors.email = 'El formato del correo no es válido';
      isValid = false;
    }
    if (message.trim().length < 10) {
      formErrors.message = 'El mensaje debe tener al menos 10 caracteres';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setSent(false);
    }
  };

  return (
    <form className="bg-white px-8 py-8 pb-8 mb-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl text-black font-bold mb-6">
        Formulario de Contacto
      </h1>

      <div className="mb-4">
        <label
          className="block text-black text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className={`border rounded w-full py-2 px-3 text-black focus:outline-indigo-300 ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold mb-2"
          htmlFor="email"
        >
          Correo
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@email.com"
          className={`border rounded w-full py-2 px-3 text-black mb-3 focus:outline-indigo-300 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold mb-2"
          htmlFor="message"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className={`border rounded w-full py-2 px-3 text-black mb-3 focus:outline-indigo-300 ${
            errors.message ? 'border-red-500' : ''
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="rounded-md bg-indigo-300 px-3.5 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 hover:text-white"
        >
          Enviar
        </button>
      </div>

      {sent && (
        <p className="mt-4 text-center text-green-500">¡Mensaje enviado!</p>
      )}
    </form>
  );
}
