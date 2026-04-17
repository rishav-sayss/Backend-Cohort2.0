import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from "../Hooks/auth.hooks"
import ContinuewithGoogle from '../component/ContinuewithGoogle';
function Login() {

  let { handleLogin } = useAuth()
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    let { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({
      email: formData.email,
      password: formData.password
    })
    navigate("/")
  };

  return (
    <div className="font-body text-on-surface antialiased selection:bg-primary-container selection:text-on-primary min-h-screen flex flex-col lg:flex-row relative">
      {/* Aesthetic left side poster with marketing copy */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-container overflow-hidden flex-col justify-end p-12 xl:p-20">
        <img src="/luxury_fashion_poster.png" alt="Snitch Fashion" className="absolute inset-0 w-full h-full object-cover object-center animate-slow-pan" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-surface/10 opacity-90"></div>
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>

        {/* Typographic Overlay */}
        <div className="relative z-10 max-w-xl animate-slide-up opacity-0">
          <div className="w-12 h-1 bg-primary mb-8" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tight text-white mb-6 uppercase leading-tight drop-shadow-lg">
            Redefine <br />
            <span className="text-primary-container">The Modern Man.</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-body leading-relaxed mb-6 font-medium max-w-md">
            Elevate your everyday aesthetic. Premium fabrics, meticulous tailoring, and uncompromising quality for the discerning individual. Step into the Snitch experience.
          </p>
        </div>
      </div>
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 w-full lg:w-1/2 relative z-10 min-h-screen lg:min-h-0 animate-slide-up-delayed opacity-0">
        {/* Branding Moment */}
        <header className="mb-8 text-center w-full">
          <h1 className="text-3xl font-extrabold tracking-[0.3em] text-primary-container font-headline uppercase">
            SNITCH
          </h1>
          <p className="mt-4 text-on-surface-variant text-sm tracking-widest font-label uppercase">
            Welcome Back
          </p>
        </header>

        {/* Authentication Form */}
        <div className="w-full max-w-sm">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="relative group">
              <input
                className="peer w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent text-on-surface"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                type="email"
                required
              />
              <label
                className="absolute left-0 top-0 text-on-surface-variant text-sm uppercase tracking-widest transition-all duration-300 pointer-events-none"
                htmlFor="email"
              >
                Email
              </label>
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input
                className="peer w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent text-on-surface"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                type="password"
                required
              />
              <label
                className="absolute left-0 top-0 text-on-surface-variant text-sm uppercase tracking-widest transition-all duration-300 pointer-events-none"
                htmlFor="password"
              >
                Password
              </label>
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full"></div>
            </div>

            {/* Main Action */}
            <div className="pt-8">
              <button
                className="w-full bg-gradient-to-br from-primary-container to-primary py-5 rounded-xl text-on-primary font-bold text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-transform duration-200"
                type="submit"
              >
                Login
              </button>
            </div>

            <ContinuewithGoogle />
          </form>

          {/* Secondary Actions */}
          <footer className="mt-10 text-center space-y-4">
            <div className="text-xs font-label text-on-surface-variant">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-primary-container transition-colors duration-300 ml-1 uppercase tracking-widest font-bold">
                Sign Up
              </Link>
            </div>
            <div>
              <button className="text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors duration-300 block w-full">
                Forgot Password?
              </button>
            </div>
          </footer>
        </div>

        {/* Atmospheric Visual Anchor (Minimal Bleed) */}
        <div className="fixed bottom-0 right-0 w-64 h-64 opacity-10 pointer-events-none overflow-hidden blur-3xl">
          <div className="w-full h-full bg-primary-container rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
      </main>

      {/* Visual Polish: Ghost Border separation as per Design System */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-outline-variant opacity-5 pointer-events-none"></div>
    </div>
  );
}

export default Login;
