import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => (
  <div>
     
     {/* Iconos flotantes decorativos */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Icono corazón */}
      <div className="absolute top-[15%] left-[10%] w-20 h-20 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-bounce">
        <svg className="w-10 h-10 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Icono diente */}
      <div className="absolute top-[20%] right-[15%] w-20 h-20 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-pulse">
        <svg className="w-10 h-10 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.5 2 6 4.5 6 8c0 2 0 4-1 6-1 2-1 4 1 6 2 2 4 0 6-2 2 2 4 4 6 2 2-2 2-4 1-6-1-2-1-4-1-6 0-3.5-2.5-6-6-6z" fill="currentColor"/>
        </svg>
      </div>
      
      {/* Icono escudo */}
      <div className="absolute bottom-[20%] right-[10%] w-20 h-20 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-bounce" style={{animationDelay: '1s'}}>
        <svg className="w-10 h-10 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    <RegisterForm />
  </div>
);

export default RegisterPage;