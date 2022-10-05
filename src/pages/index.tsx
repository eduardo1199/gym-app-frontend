import Image from 'next/image';
import { useState } from 'react';
import Logo from '../assets/logo.svg';

import { Spinner } from 'phosphor-react';

export default function Home() {
  const [profile, setProfile] = useState('');

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-7xl flex">
        <div className="flex">
          <Image 
            src={Logo} 
            alt="logo"
            width="250px"
            height="250px"
          />
        </div>
        <div className="flex flex-col items-center mx-20">
          <div className="flex flex-col gap-3">
            <span className="text-primary-white text-2xl font-bold">Você é aluno ou gerente?</span>

            <div className="flex gap-20">
              <button
                type="button"
                title="aluno"
                className="transition ease-in-out delay-50 bg-secondary-orange hover:-translate-y-1 hover:scale-110 hover:bg-primary-yellow duration-300 text-primary-white font-bold px-5 py-2 rounded text-lg"
              >
                  Aluno
              </button>
              <button 
                type="button" 
                title="gerente"  
                className="transition ease-in-out delay-50 bg-primary-yellow hover:-translate-y-1 hover:scale-110 hover:bg-secondary-orange duration-300 text-primary-white font-bold px-5 py-2 rounded text-lg">
                  Gerente
              </button>
            </div>
          </div>

          <form className="mt-8 flex flex-col gap-4 w-full">
            <label htmlFor="cpf" className="text-primary-white font-bold text-lg">Informe seu CPF</label>
            <input 
              type="text" 
              placeholder="digite seu CPF" 
              className="px-3 py-2 rounded font-bold h-11"
            />

            <label htmlFor="password" className="text-primary-white font-bold text-lg">Informe sua senha</label>
            <input 
              type="password" 
              placeholder="digite sua senha" 
              className="px-3 py-2 rounded font-bold h-11"
            />

            <button type="submit" className="bg-secondary-purple transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 font-bold text-lg text-white h-11 rounded flex justify-center items-center">
              <Spinner className="animate-spin h-6 w-6 mr-3" />
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
