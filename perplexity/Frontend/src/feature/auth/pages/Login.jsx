import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useauth } from "../hooks/useauth"
function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let { handleLogin } = useauth()

  let naviagte = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const payload = {
      email,
      password,
    }
    await handleLogin(payload)
    naviagte("/dashboard")

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-slate-400">Remember me</span>
              </label>
              <Link to="#" className="text-sm text-blue-400 hover:text-blue-300 transition">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-600"></div>
            <span className="px-3 text-slate-400 text-sm">or</span>
            <div className="flex-1 border-t border-slate-600"></div>
          </div>

          {/* Social Login */}
          {/* <div className="space-y-3">
            <button
              type="button"
              className="w-full py-3 px-4 bg-slate-700 bg-opacity-50 border border-slate-600 text-slate-200 font-medium rounded-lg hover:bg-slate-700 transition duration-200"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 bg-slate-700 bg-opacity-50 border border-slate-600 text-slate-200 font-medium rounded-lg hover:bg-slate-700 transition duration-200"
            >
              Continue with GitHub
            </button>
          </div> */}

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
