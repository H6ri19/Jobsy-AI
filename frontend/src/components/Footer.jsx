import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Jobsy AI Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h4 className="font-semibold tracking-wide text-slate-900">
                Jobsy AI
              </h4>
              <p className="text-xs text-slate-500">
                AI Resume Builder • ATS Check • Mock Interviews
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-500 tracking-wide">
            © {new Date().getFullYear()} Jobsy AI · Empowering Smarter Careers
            with AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
