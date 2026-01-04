import { Link } from 'react-router-dom';
import { ProfileInfoCard } from './Cards';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <header
      className="h-16 bg-white/70 backdrop-blur-xl border-b border-violet-100/50 
      sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4 md:px-0">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Jobsy AI Logo"
            className="w-10 h-10 object-contain rounded-xl shadow-md"
          />

          <div className="flex flex-col leading-tight">
            <span
              className="text-xl sm:text-2xl font-black 
              bg-gradient-to-r from-violet-600 to-fuchsia-600 
              bg-clip-text text-transparent"
            >
              Jobsy AI
            </span>
            <span className="text-[11px] text-slate-500 tracking-wide">
              AI Resume • ATS • Mock Interviews
            </span>
          </div>
        </Link>

        {/* User */}
        <ProfileInfoCard />
      </div>
    </header>
  );
};

export default Navbar;
