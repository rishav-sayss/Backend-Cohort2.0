import React, { useState } from 'react'
import { Link } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useauth } from "../hooks/useauth"
function Register() {
  const [showPassword, setShowPassword] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let { Register } = useauth()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      username,
      email,
      password,
    }
    await Register(payload)

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Join us today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 bg-slate-700 bg-opacity-50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition`}
                required
              />

            </div>

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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 bg-slate-700 bg-opacity-50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition`}
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min 8 characters)"
                  className={`w-full px-4 py-3 bg-slate-700 bg-opacity-50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition pr-12`}
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




            {/* Terms & Conditions */}
            <label className="flex items-start mt-6">
              <input
                type="checkbox"
                className="w-4 h-4 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 mt-1"
                required
              />
              <span className="ml-2 text-sm text-slate-400">
                I agree to the{' '}
                <Link to="#" className="text-blue-400 hover:text-blue-300 transition">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="#" className="text-blue-400 hover:text-blue-300 transition">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-600"></div>
            <span className="px-3 text-slate-400 text-sm">or</span>
            <div className="flex-1 border-t border-slate-600"></div>
          </div>


          {/* Login Link */}
          <p className="mt-6 text-center text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
