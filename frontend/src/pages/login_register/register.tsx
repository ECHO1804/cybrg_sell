import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempt');
  };

  const handleBackToLogin = () => {
    window.location.href = '/';
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10"></div>
      
      <div className="text-center mb-10 z-10">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-[0_0_25px_rgba(6,182,212,0.8)] tracking-tighter">
          NEURAL REGISTRATION
        </h1>
        <p className="text-cyan-300/70 text-lg drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
          Create Your Cyborg Profile
        </p>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-md opacity-30 animate-pulse"></div>
        
        <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 shadow-[0_0_60px_rgba(6,182,212,0.5)]">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70" />
              <input
                type="email"
                placeholder="neural.email@cybernet.com"
                required
                className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              />
            </div>

            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70" />
              <input
                type="tel"
                placeholder="neural.phone.number"
                required
                className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              />
            </div>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70" />
              <input
                type="text"
                placeholder="first.name"
                required
                className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              />
            </div>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70" />
              <input
                type="text"
                placeholder="last.name"
                required
                className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              />
            </div>

  
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                required
                className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              />
   
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70 hover:text-cyan-300 transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                ) : (
                  <FiEye className="drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-green-500/30 to-emerald-500/30 text-green-300 rounded-xl border border-green-500/40 hover:border-green-400/50 hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] transition-all group font-bold text-lg mt-2"
            >
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              <span>ACTIVATE NEURAL PROFILE</span>
            </button>

            <button
              type="button"
              onClick={handleBackToLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all group font-medium"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>BACK TO NEURAL ACCESS</span>
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center z-10">
        <p className="text-slate-500 text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
          © {new Date().getFullYear()} CYBORGMANIA • Secure Neural Registration
        </p>
      </div>
    </div>
  );
};

export default Register;