// import { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   ArrowRight,
//   LayoutTemplate,
//   Zap,
//   Download,
//   Menu,
//   X,
// } from 'lucide-react';
// import SignUp from '../components/SignUp';
// import Login from '../components/Login';
// import Modal from '../components/Modal';
// import { UserContext } from '../context/userContext';
// import { ProfileInfoCard } from '../components/Cards';
// import { landingPageStyles } from '../assets/dummystyle';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import logo from '../assets/logo.png';

// const LandingPage = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState('login');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { scrollYProgress } = useScroll();

//   // Smooth transforms
//   const heroTextY = useTransform(scrollYProgress, [0, 0.25], [40, 0]);
//   const heroTextOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

//   const svg1Y = useTransform(scrollYProgress, [0.12, 0.32], [80, 0]);
//   const svg1Opacity = useTransform(scrollYProgress, [0.12, 0.32], [0, 1]);

//   const svg2Y = useTransform(scrollYProgress, [0.28, 0.48], [80, 0]);
//   const svg2Opacity = useTransform(scrollYProgress, [0.28, 0.48], [0, 1]);

//   const handleCTA = () => {
//     if (!user) {
//       setOpenAuthModal(true);
//     } else {
//       navigate('/dashboard');
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className={landingPageStyles.container}>
//       {/* Header */}
//       <header className={landingPageStyles.header}>
//         <div className={landingPageStyles.headerContainer}>
//           <div className={landingPageStyles.logoContainer}>
//             <img
//               src={logo}
//               alt="ResumeMe Logo"
//               className={landingPageStyles.logoImage}
//             />
//             <span className={landingPageStyles.logoText}>Jobsy AI</span>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             className={landingPageStyles.mobileMenuButton}
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? (
//               <X size={24} className={landingPageStyles.mobileMenuIcon} />
//             ) : (
//               <Menu size={24} className={landingPageStyles.mobileMenuIcon} />
//             )}
//           </button>

//           {/* Desktop navigation */}
//           <div className="hidden md:flex items-center">
//             {user ? (
//               <ProfileInfoCard />
//             ) : (
//               <button
//                 className={landingPageStyles.desktopAuthButton}
//                 onClick={() => setOpenAuthModal(true)}
//               >
//                 <div
//                   className={landingPageStyles.desktopAuthButtonOverlay}
//                 ></div>
//                 <span className={landingPageStyles.desktopAuthButtonText}>
//                   Get Started
//                 </span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {mobileMenuOpen && (
//           <div className={landingPageStyles.mobileMenu}>
//             <div className={landingPageStyles.mobileMenuContainer}>
//               {user ? (
//                 <div className={landingPageStyles.mobileUserInfo}>
//                   <div className={landingPageStyles.mobileUserWelcome}>
//                     Welcome back
//                   </div>
//                   <button
//                     className={landingPageStyles.mobileDashboardButton}
//                     onClick={() => {
//                       navigate('/dashboard');
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                     Go to Dashboard
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   className={landingPageStyles.mobileAuthButton}
//                   onClick={() => {
//                     setOpenAuthModal(true);
//                     setMobileMenuOpen(false);
//                   }}
//                 >
//                   Get Started
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className={landingPageStyles.main}>
//         {/* Hero Section */}
//         <section className={landingPageStyles.heroSection}>
//           <div className={landingPageStyles.heroGrid}>
//             {/* Left Content */}
//             <motion.div
//               className={landingPageStyles.heroLeft}
//               style={{ y: heroTextY, opacity: heroTextOpacity }}
//               transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//             >
//               <div className={landingPageStyles.tagline}>
//                 AI-Powered Career Platform
//               </div>

//               <h1 className={landingPageStyles.heading}>
//                 <span className={landingPageStyles.headingText}>Build</span>
//                 <span className={landingPageStyles.headingGradient}>
//                   Smart Resumes
//                 </span>
//                 <span className={landingPageStyles.headingText}>
//                   & Ace Interviews
//                 </span>
//               </h1>

//               <p className={landingPageStyles.description}>
//                 Create AI-optimized resumes, check ATS compatibility, and
//                 prepare for real-world interviews with intelligent mock
//                 interview simulations.
//               </p>

//               <div className={landingPageStyles.ctaButtons}>
//                 <motion.button
//                   whileTap={{ scale: 0.97 }}
//                   className={landingPageStyles.primaryButton}
//                   onClick={handleCTA}
//                 >
//                   <div className={landingPageStyles.primaryButtonOverlay} />
//                   <span className={landingPageStyles.primaryButtonContent}>
//                     Start with AI <ArrowRight size={18} />
//                   </span>
//                 </motion.button>

//                 <button
//                   className={landingPageStyles.secondaryButton}
//                   onClick={handleCTA}
//                 >
//                   Try Mock Interview
//                 </button>
//               </div>
//             </motion.div>

//             {/* Stats */}
//             <div className={landingPageStyles.statsContainer}>
//               {[
//                 {
//                   value: 'AI+ATS',
//                   label: 'Resume Optimization',
//                   gradient: 'from-violet-600 to-fuchsia-600',
//                 },
//                 {
//                   value: '100%',
//                   label: 'ATS Compatibility',
//                   gradient: 'from-orange-500 to-red-500',
//                 },
//                 {
//                   value: 'Mock AI',
//                   label: 'Interview Practice',
//                   gradient: 'from-emerald-500 to-teal-500',
//                 },
//                 {
//                   value: 'Live AI',
//                   label: 'Interview Feedback',
//                   gradient: 'from-blue-500 to-indigo-600',
//                 },
//               ].map((stat, idx) => (
//                 <div key={idx} className={landingPageStyles.statItem}>
//                   <div
//                     className={`${landingPageStyles.statNumber} ${stat.gradient}`}
//                   >
//                     {stat.value}
//                   </div>
//                   <div className={landingPageStyles.statLabel}>
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Content - SVG Illustration */}
//           <motion.div
//             className={landingPageStyles.heroIllustration}
//             style={{ y: svg1Y, opacity: svg1Opacity }}
//           >
//             <div className={landingPageStyles.heroIllustrationBg}></div>
//             <div className={landingPageStyles.heroIllustrationContainer}>
//               <svg
//                 viewBox="0 0 400 500"
//                 className={landingPageStyles.svgContainer}
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 {/* DEFINITIONS */}
//                 <defs>
//                   <linearGradient
//                     id="aiGradient"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#6366f1" />
//                     <stop offset="100%" stopColor="#a855f7" />
//                   </linearGradient>

//                   <linearGradient
//                     id="atsGradient"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#22c55e" />
//                     <stop offset="100%" stopColor="#16a34a" />
//                   </linearGradient>
//                 </defs>

//                 {/* MAIN RESUME CARD */}
//                 <rect
//                   x="50"
//                   y="40"
//                   width="300"
//                   height="420"
//                   rx="20"
//                   className={landingPageStyles.svgRect}
//                 />

//                 {/* PROFILE HEADER */}
//                 <circle
//                   cx="110"
//                   cy="95"
//                   r="22"
//                   className={landingPageStyles.svgCircle}
//                 />
//                 <rect
//                   x="150"
//                   y="85"
//                   width="140"
//                   height="10"
//                   rx="5"
//                   className={landingPageStyles.svgRectPrimary}
//                 />
//                 <rect
//                   x="150"
//                   y="102"
//                   width="90"
//                   height="6"
//                   rx="3"
//                   className={landingPageStyles.svgRectSecondary}
//                 />

//                 {/* ATS SECTION LABEL */}
//                 <rect
//                   x="70"
//                   y="135"
//                   width="90"
//                   height="8"
//                   rx="4"
//                   fill="url(#atsGradient)"
//                 />

//                 {/* RESUME CONTENT LINES */}
//                 {[0, 1, 2, 3].map((i) => (
//                   <rect
//                     key={i}
//                     x="70"
//                     y={160 + i * 15}
//                     width={260 - i * 20}
//                     height="4"
//                     rx="2"
//                     className={landingPageStyles.svgRectLight}
//                   />
//                 ))}

//                 {/* ATS KEYWORD PILLS */}
//                 <rect
//                   x="70"
//                   y="230"
//                   width="55"
//                   height="16"
//                   rx="8"
//                   className={landingPageStyles.svgRectSkill}
//                 />
//                 <rect
//                   x="135"
//                   y="230"
//                   width="70"
//                   height="16"
//                   rx="8"
//                   className={landingPageStyles.svgRectSkill}
//                 />
//                 <rect
//                   x="215"
//                   y="230"
//                   width="60"
//                   height="16"
//                   rx="8"
//                   className={landingPageStyles.svgRectSkill}
//                 />

//                 {/* INTERVIEW QUESTIONS SECTION */}
//                 <rect
//                   x="70"
//                   y="270"
//                   width="120"
//                   height="8"
//                   rx="4"
//                   fill="url(#aiGradient)"
//                 />

//                 {[0, 1, 2].map((i) => (
//                   <rect
//                     key={i}
//                     x="70"
//                     y={295 + i * 15}
//                     width={200 - i * 30}
//                     height="4"
//                     rx="2"
//                     className={landingPageStyles.svgRectLight}
//                   />
//                 ))}

//                 {/* 🔵 AI ANALYSIS FLOATING NODE */}
//                 <circle cx="325" cy="90" r="14" fill="url(#aiGradient)">
//                   <animateTransform
//                     attributeName="transform"
//                     type="translate"
//                     values="0,0; 0,-12; 0,0"
//                     dur="3s"
//                     repeatCount="indefinite"
//                   />
//                 </circle>

//                 {/* 🟩 REAL-TIME FEEDBACK BLOCK */}
//                 <rect
//                   x="30"
//                   y="320"
//                   width="14"
//                   height="14"
//                   rx="7"
//                   fill="#22c55e"
//                 >
//                   <animateTransform
//                     attributeName="transform"
//                     type="translate"
//                     values="0,0; 6,0; 0,0"
//                     dur="2s"
//                     repeatCount="indefinite"
//                   />
//                 </rect>

//                 {/* 🔺 INTERVIEW EVALUATION ROTATION */}
//                 <polygon points="360,210 372,232 348,232" fill="#f59e0b">
//                   <animateTransform
//                     attributeName="transform"
//                     type="rotate"
//                     values="0 360 220; 360 360 220; 0 360 220"
//                     dur="4s"
//                     repeatCount="indefinite"
//                   />
//                 </polygon>
//               </svg>
//             </div>
//           </motion.div>
//           <motion.div
//             className={landingPageStyles.heroIllustration}
//             style={{ y: svg2Y, opacity: svg2Opacity }}
//           >
//             <div className={landingPageStyles.heroIllustrationBg}></div>
//             <div className={landingPageStyles.heroIllustrationContainer}>
//               <svg
//                 viewBox="0 0 420 520"
//                 className={landingPageStyles.svgContainer}
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 {/* ================== DEFINITIONS ================== */}
//                 <defs>
//                   <linearGradient
//                     id="aiInterviewGradient"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#6366f1" />
//                     <stop offset="100%" stopColor="#9333ea" />
//                   </linearGradient>

//                   <linearGradient
//                     id="scoreGradient"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#22c55e" />
//                     <stop offset="100%" stopColor="#16a34a" />
//                   </linearGradient>

//                   <radialGradient id="aiPulse">
//                     <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.6" />
//                     <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
//                   </radialGradient>
//                 </defs>

//                 {/* ================== MAIN INTERVIEW PANEL ================== */}
//                 <rect
//                   x="60"
//                   y="50"
//                   width="300"
//                   height="420"
//                   rx="22"
//                   fill="white"
//                   stroke="#e5e7eb"
//                   strokeWidth="2"
//                 />

//                 {/* ================== AI INTERVIEW HEADER ================== */}
//                 <circle
//                   cx="120"
//                   cy="95"
//                   r="20"
//                   fill="url(#aiInterviewGradient)"
//                 />
//                 <rect
//                   x="155"
//                   y="85"
//                   width="150"
//                   height="10"
//                   rx="5"
//                   fill="#6366f1"
//                 />
//                 <rect
//                   x="155"
//                   y="102"
//                   width="90"
//                   height="6"
//                   rx="3"
//                   fill="#a5b4fc"
//                 />

//                 {/* ================== AI QUESTION BUBBLE ================== */}
//                 <rect
//                   x="80"
//                   y="140"
//                   width="220"
//                   height="38"
//                   rx="12"
//                   fill="#eef2ff"
//                 />
//                 <circle cx="95" cy="159" r="4" fill="#6366f1" />
//                 <circle cx="108" cy="159" r="4" fill="#6366f1" />
//                 <circle cx="121" cy="159" r="4" fill="#6366f1" />

//                 {/* ================== USER ANSWER BUBBLE ================== */}
//                 <rect
//                   x="120"
//                   y="190"
//                   width="200"
//                   height="34"
//                   rx="12"
//                   fill="#ecfeff"
//                 />
//                 <rect
//                   x="135"
//                   y="203"
//                   width="120"
//                   height="5"
//                   rx="2"
//                   fill="#22c55e"
//                 />

//                 {/* ================== ANSWER EVALUATION ================== */}
//                 <rect
//                   x="80"
//                   y="245"
//                   width="260"
//                   height="8"
//                   rx="4"
//                   fill="#e5e7eb"
//                 />
//                 <rect
//                   x="80"
//                   y="245"
//                   width="180"
//                   height="8"
//                   rx="4"
//                   fill="url(#scoreGradient)"
//                 >
//                   <animate
//                     attributeName="width"
//                     from="0"
//                     to="180"
//                     dur="2s"
//                     repeatCount="indefinite"
//                   />
//                 </rect>

//                 {/* ================== FEEDBACK TAGS ================== */}
//                 <rect
//                   x="80"
//                   y="270"
//                   width="60"
//                   height="18"
//                   rx="9"
//                   fill="#dcfce7"
//                 />
//                 <rect
//                   x="150"
//                   y="270"
//                   width="80"
//                   height="18"
//                   rx="9"
//                   fill="#fef3c7"
//                 />
//                 <rect
//                   x="240"
//                   y="270"
//                   width="70"
//                   height="18"
//                   rx="9"
//                   fill="#fee2e2"
//                 />

//                 {/* ================== AI THINKING RADAR ================== */}
//                 <circle cx="340" cy="110" r="26" fill="url(#aiPulse)">
//                   <animateTransform
//                     attributeName="transform"
//                     type="scale"
//                     values="1;1.4;1"
//                     dur="3s"
//                     repeatCount="indefinite"
//                   />
//                 </circle>

//                 <circle
//                   cx="340"
//                   cy="110"
//                   r="12"
//                   fill="url(#aiInterviewGradient)"
//                 />

//                 {/* ================== LIVE INTERVIEW INDICATOR ================== */}
//                 <circle cx="80" cy="330" r="6" fill="#22c55e">
//                   <animate
//                     attributeName="opacity"
//                     values="1;0.2;1"
//                     dur="1.5s"
//                     repeatCount="indefinite"
//                   />
//                 </circle>
//                 <rect
//                   x="95"
//                   y="325"
//                   width="140"
//                   height="10"
//                   rx="5"
//                   fill="#bbf7d0"
//                 />

//                 {/* ================== AI SCORE ENGINE ================== */}
//                 <g>
//                   <circle
//                     cx="340"
//                     cy="320"
//                     r="18"
//                     stroke="#f59e0b"
//                     strokeWidth="3"
//                     fill="none"
//                   >
//                     <animateTransform
//                       attributeName="transform"
//                       type="rotate"
//                       from="0 340 320"
//                       to="360 340 320"
//                       dur="5s"
//                       repeatCount="indefinite"
//                     />
//                   </circle>
//                   <circle cx="340" cy="320" r="6" fill="#f59e0b" />
//                 </g>

//                 {/* ================== FINAL INTERVIEW RESULT ================== */}
//                 <rect
//                   x="80"
//                   y="360"
//                   width="200"
//                   height="14"
//                   rx="7"
//                   fill="#ede9fe"
//                 />
//                 <rect
//                   x="80"
//                   y="360"
//                   width="160"
//                   height="14"
//                   rx="7"
//                   fill="#8b5cf6"
//                 />
//               </svg>
//             </div>
//           </motion.div>
//           {/* </div> */}
//           {/* </div> */}
//         </section>

//         {/* Features Section */}
//         <section className={landingPageStyles.featuresSection}>
//           <div className={landingPageStyles.featuresContainer}>
//             <div className={landingPageStyles.featuresHeader}>
//               <h2 className={landingPageStyles.featuresTitle}>
//                 Why Choose{' '}
//                 <span className={landingPageStyles.featuresTitleGradient}>
//                   Jobsy AI?
//                 </span>
//               </h2>
//               <p className={landingPageStyles.featuresDescription}>
//                 Everything you need to build ATS-optimized resumes and crack
//                 interviews with AI confidence.
//               </p>
//             </div>

//             <div className={landingPageStyles.featuresGrid}>
//               {[
//                 {
//                   icon: <Zap className={landingPageStyles.featureIcon} />,
//                   title: 'AI Resume Builder',
//                   description:
//                     'Create role-specific resumes using AI suggestions tailored to job descriptions and industry standards.',
//                   gradient: landingPageStyles.featureIconViolet,
//                   bg: landingPageStyles.featureCardViolet,
//                 },
//                 {
//                   icon: (
//                     <LayoutTemplate className={landingPageStyles.featureIcon} />
//                   ),
//                   title: 'ATS Compatibility Check',
//                   description:
//                     'Analyze ATS score, keyword gaps, formatting issues, and recruiter filters before applying.',
//                   gradient: landingPageStyles.featureIconFuchsia,
//                   bg: landingPageStyles.featureCardFuchsia,
//                 },
//                 {
//                   icon: <Download className={landingPageStyles.featureIcon} />,
//                   title: 'One-Click PDF Export',
//                   description:
//                     'Download clean, professional, recruiter-ready resumes in high-quality PDF format instantly.',
//                   gradient: landingPageStyles.featureIconOrange,
//                   bg: landingPageStyles.featureCardOrange,
//                 },
//                 {
//                   icon: <Zap className={landingPageStyles.featureIcon} />,
//                   title: 'Mock Interview Practice',
//                   description:
//                     'Practice real interview questions generated from your resume and target job role.',
//                   gradient: landingPageStyles.featureIconEmerald,
//                   bg: landingPageStyles.featureCardEmerald,
//                 },
//                 {
//                   icon: (
//                     <LayoutTemplate className={landingPageStyles.featureIcon} />
//                   ),
//                   title: 'Live AI Feedback',
//                   description:
//                     'Receive instant AI feedback on answers, clarity, confidence, and technical depth.',
//                   gradient: landingPageStyles.featureIconBlue,
//                   bg: landingPageStyles.featureCardBlue,
//                 },
//                 {
//                   icon: <Zap className={landingPageStyles.featureIcon} />,
//                   title: 'Interview Performance Report',
//                   description:
//                     'Get detailed interview results with scores, strengths, weaknesses, and improvement tips.',
//                   gradient: landingPageStyles.featureIconRose,
//                   bg: landingPageStyles.featureCardRose,
//                 },
//               ].map((feature, index) => (
//                 <div
//                   key={index}
//                   className={`${landingPageStyles.featureCard} group`}
//                 >
//                   {/* Hover glow */}
//                   <div
//                     className={`${landingPageStyles.featureCardHover} group-hover:opacity-100`}
//                   />

//                   <div
//                     className={`${landingPageStyles.featureCardContent} ${feature.bg}
//             transition-all duration-300 ease-out
//             group-hover:-translate-y-2
//             group-hover:shadow-2xl`}
//                   >
//                     <div
//                       className={`${landingPageStyles.featureIconContainer} ${feature.gradient}
//               transition-transform duration-300
//               group-hover:scale-110`}
//                     >
//                       {feature.icon}
//                     </div>

//                     <h3 className={landingPageStyles.featureTitle}>
//                       {feature.title}
//                     </h3>

//                     <p className={landingPageStyles.featureDescription}>
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className={landingPageStyles.ctaSection}>
//           <div className={landingPageStyles.ctaContainer}>
//             <div
//               className={`${landingPageStyles.ctaCard} relative overflow-hidden`}
//             >
//               {/* AI Glow Background */}
//               <div className={landingPageStyles.ctaCardBg}></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-indigo-600/20 animate-pulse"></div>

//               <div className={landingPageStyles.ctaCardContent}>
//                 <h2 className={landingPageStyles.ctaTitle}>
//                   Get Interview-Ready with{' '}
//                   <span className={landingPageStyles.ctaTitleGradient}>
//                     Jobsy AI
//                   </span>
//                 </h2>

//                 <p className={landingPageStyles.ctaDescription}>
//                   Build ATS-optimized resumes, practice AI-powered mock
//                   interviews, and receive real-time feedback — all in one
//                   intelligent career platform.
//                 </p>

//                 <button
//                   className={`${landingPageStyles.ctaButton} group relative overflow-hidden`}
//                   onClick={handleCTA}
//                 >
//                   {/* Shimmer Effect */}
//                   <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>

//                   <div className={landingPageStyles.ctaButtonOverlay}></div>

//                   <span
//                     className={`${landingPageStyles.ctaButtonText} relative z-10`}
//                   >
//                     Start AI Career Prep
//                   </span>
//                 </button>

//                 {/* Sub-CTA Hint */}
//                 <p className="mt-4 text-xs text-Black/80 tracking-wide">
//                   🚀 Trusted by job seekers preparing for real-world interviews
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer
//         className={`${landingPageStyles.footer} relative overflow-hidden`}
//       >
//         {/* Animated Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-fuchsia-600/20 animate-gradient-x"></div>

//         {/* Floating Dots (AI Particles) */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(12)].map((_, i) => (
//             <span
//               key={i}
//               className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${i * 0.6}s`,
//               }}
//             />
//           ))}
//         </div>

//         <div className={`${landingPageStyles.footerContainer}`}>
//           {/* Brand Row */}
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
//             <div className="flex items-center gap-3">
//               <img
//                 src={logo}
//                 alt="Jobsy AI Logo"
//                 className="w-10 h-10 object-contain"
//               />
//               <div>
//                 <h4 className="text-slate-900 font-semibold tracking-wide">
//                   Jobsy AI
//                 </h4>
//                 <p className="text-sm sm:text-base text-slate-400 font-medium">
//                   AI Resume Builder • ATS Check • Mock Interviews
//                 </p>
//               </div>
//             </div>

//             {/* Author */}
//             <p className={landingPageStyles.footerText}>
//               Crafted with{' '}
//               <span
//                 className={`${landingPageStyles.footerHeart} inline-block animate-pulse`}
//               >
//                 ❤️
//               </span>{' '}
//               by{' '}
//               <a
//                 href="https://github.com/"
//                 target="_blank"
//                 rel="noreferrer"
//                 className={`${landingPageStyles.footerLink} relative group`}
//               >
//                 G.HariHaran
//                 <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
//               </a>
//             </p>
//           </div>

//           {/* Divider */}
//           <div className="my-4 h-px bg-white/10"></div>

//           {/* Bottom Line */}
//           <p className="text-xs text-slate-900 text-center tracking-wide">
//             © {new Date().getFullYear()} Jobsy AI · Empowering Smarter Careers
//             with AI
//           </p>
//         </div>
//       </footer>

//       {/* Modal */}
//       <Modal
//         isOpen={openAuthModal}
//         onClose={() => {
//           setOpenAuthModal(false);
//           setCurrentPage('login');
//         }}
//         hideHeader
//       >
//         <div>
//           {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
//           {currentPage === 'signup' && (
//             <SignUp setCurrentPage={setCurrentPage} />
//           )}
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default LandingPage;

// New Effect but Ok UI

// // ===============================
// /* ACTION BUTTON (FIXED + ANIMATED)
//  ================================ */

import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  LayoutTemplate,
  Zap,
  Download,
  Menu,
  X,
} from 'lucide-react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Modal from '../components/Modal';
import { UserContext } from '../context/userContext';
import { ProfileInfoCard } from '../components/Cards';
import { landingPageStyles } from '../assets/dummystyle';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/logo.png';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth transforms
  const fadeInUp = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const moveUp = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);
  const scaleIn = useTransform(scrollYProgress, [0.1, 0.3], [0.9, 1]);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={landingPageStyles.container}>
      {/* Header */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <img
              src={logo}
              alt="ResumeMe Logo"
              className={landingPageStyles.logoImage}
            />
            <span className={landingPageStyles.logoText}>Jobsy AI</span>
          </div>

          {/* Mobile menu button */}
          <button
            className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className={landingPageStyles.mobileMenuIcon} />
            ) : (
              <Menu size={24} className={landingPageStyles.mobileMenuIcon} />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center">
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className={landingPageStyles.desktopAuthButton}
                onClick={() => setOpenAuthModal(true)}
              >
                <div
                  className={landingPageStyles.desktopAuthButtonOverlay}
                ></div>
                <span className={landingPageStyles.desktopAuthButtonText}>
                  Get Started
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={landingPageStyles.mobileMenu}>
            <div className={landingPageStyles.mobileMenuContainer}>
              {user ? (
                <div className={landingPageStyles.mobileUserInfo}>
                  <div className={landingPageStyles.mobileUserWelcome}>
                    Welcome back
                  </div>
                  <button
                    className={landingPageStyles.mobileDashboardButton}
                    onClick={() => {
                      navigate('/dashboard');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <button
                  className={landingPageStyles.mobileAuthButton}
                  onClick={() => {
                    setOpenAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={landingPageStyles.main}>
        {/* Hero Section */}
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>
            {/* Left Content */}
            <div className={landingPageStyles.heroLeft}>
              <div className={landingPageStyles.tagline}>
                AI-Powered Career Platform
              </div>

              <h1 className={landingPageStyles.heading}>
                <span className={landingPageStyles.headingText}>Build</span>
                <span className={landingPageStyles.headingGradient}>
                  Smart Resumes
                </span>
                <span className={landingPageStyles.headingText}>
                  & Ace Interviews
                </span>
              </h1>

              <p className={landingPageStyles.description}>
                Create AI-optimized resumes, check ATS compatibility, and
                prepare for real-world interviews with intelligent mock
                interview simulations — all in one platform.
              </p>

              <div className={landingPageStyles.ctaButtons}>
                <button
                  className={landingPageStyles.primaryButton}
                  onClick={handleCTA}
                >
                  <div className={landingPageStyles.primaryButtonOverlay}></div>
                  <span className={landingPageStyles.primaryButtonContent}>
                    Start with AI
                    <ArrowRight
                      size={18}
                      className={landingPageStyles.primaryButtonIcon}
                    />
                  </span>
                </button>

                <button
                  onClick={handleCTA}
                  className={landingPageStyles.secondaryButton}
                >
                  Try Mock Interview
                </button>
              </div>

              {/* Stats */}
              <div className={landingPageStyles.statsContainer}>
                {[
                  {
                    value: 'AI+ATS',
                    label: 'Resume Optimization',
                    gradient: 'from-violet-600 to-fuchsia-600',
                  },
                  {
                    value: '100%',
                    label: 'ATS Compatibility',
                    gradient: 'from-orange-500 to-red-500',
                  },
                  {
                    value: 'Mock AI',
                    label: 'Interview Practice',
                    gradient: 'from-emerald-500 to-teal-500',
                  },
                  {
                    value: 'Live AI',
                    label: 'Interview Feedback',
                    gradient: 'from-blue-500 to-indigo-600',
                  },
                ].map((stat, idx) => (
                  <div key={idx} className={landingPageStyles.statItem}>
                    <div
                      className={`${landingPageStyles.statNumber} ${stat.gradient}`}
                    >
                      {stat.value}
                    </div>
                    <div className={landingPageStyles.statLabel}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - SVG Illustration */}
            <motion.div
              className={landingPageStyles.heroIllustration}
              style={{
                opacity: fadeInUp,
                y: moveUp,
                scale: scaleIn,
              }}
            >
              <div className={landingPageStyles.heroIllustrationBg}></div>
              <div className={landingPageStyles.heroIllustrationContainer}>
                <svg
                  viewBox="0 0 400 500"
                  className={landingPageStyles.svgContainer}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* DEFINITIONS */}
                  <defs>
                    <linearGradient
                      id="aiGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>

                    <linearGradient
                      id="atsGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>

                  {/* MAIN RESUME CARD */}
                  <rect
                    x="50"
                    y="40"
                    width="300"
                    height="420"
                    rx="20"
                    className={landingPageStyles.svgRect}
                  />

                  {/* PROFILE HEADER */}
                  <circle
                    cx="110"
                    cy="95"
                    r="22"
                    className={landingPageStyles.svgCircle}
                  />
                  <rect
                    x="150"
                    y="85"
                    width="140"
                    height="10"
                    rx="5"
                    className={landingPageStyles.svgRectPrimary}
                  />
                  <rect
                    x="150"
                    y="102"
                    width="90"
                    height="6"
                    rx="3"
                    className={landingPageStyles.svgRectSecondary}
                  />

                  {/* ATS SECTION LABEL */}
                  <rect
                    x="70"
                    y="135"
                    width="90"
                    height="8"
                    rx="4"
                    fill="url(#atsGradient)"
                  />

                  {/* RESUME CONTENT LINES */}
                  {[0, 1, 2, 3].map((i) => (
                    <rect
                      key={i}
                      x="70"
                      y={160 + i * 15}
                      width={260 - i * 20}
                      height="4"
                      rx="2"
                      className={landingPageStyles.svgRectLight}
                    />
                  ))}

                  {/* ATS KEYWORD PILLS */}
                  <rect
                    x="70"
                    y="230"
                    width="55"
                    height="16"
                    rx="8"
                    className={landingPageStyles.svgRectSkill}
                  />
                  <rect
                    x="135"
                    y="230"
                    width="70"
                    height="16"
                    rx="8"
                    className={landingPageStyles.svgRectSkill}
                  />
                  <rect
                    x="215"
                    y="230"
                    width="60"
                    height="16"
                    rx="8"
                    className={landingPageStyles.svgRectSkill}
                  />

                  {/* INTERVIEW QUESTIONS SECTION */}
                  <rect
                    x="70"
                    y="270"
                    width="120"
                    height="8"
                    rx="4"
                    fill="url(#aiGradient)"
                  />

                  {[0, 1, 2].map((i) => (
                    <rect
                      key={i}
                      x="70"
                      y={295 + i * 15}
                      width={200 - i * 30}
                      height="4"
                      rx="2"
                      className={landingPageStyles.svgRectLight}
                    />
                  ))}

                  {/* 🔵 AI ANALYSIS FLOATING NODE */}
                  <circle cx="325" cy="90" r="14" fill="url(#aiGradient)">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; 0,-12; 0,0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* 🟩 REAL-TIME FEEDBACK BLOCK */}
                  <rect
                    x="30"
                    y="320"
                    width="14"
                    height="14"
                    rx="7"
                    fill="#22c55e"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; 6,0; 0,0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </rect>

                  {/* 🔺 INTERVIEW EVALUATION ROTATION */}
                  <polygon points="360,210 372,232 348,232" fill="#f59e0b">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 360 220; 360 360 220; 0 360 220"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </polygon>
                </svg>
              </div>
            </motion.div>
            <motion.div
              className={landingPageStyles.heroIllustration}
              style={{
                opacity: fadeInUp,
                y: useTransform(scrollYProgress, [0.25, 0.45], [60, 0]),
                scale: useTransform(scrollYProgress, [0.25, 0.45], [0.92, 1]),
              }}
            >
              <div className={landingPageStyles.heroIllustrationBg}></div>
              <div className={landingPageStyles.heroIllustrationContainer}>
                <svg
                  viewBox="0 0 420 520"
                  className={landingPageStyles.svgContainer}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* ================== DEFINITIONS ================== */}
                  <defs>
                    <linearGradient
                      id="aiInterviewGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>

                    <linearGradient
                      id="scoreGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>

                    <radialGradient id="aiPulse">
                      <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* ================== MAIN INTERVIEW PANEL ================== */}
                  <rect
                    x="60"
                    y="50"
                    width="300"
                    height="420"
                    rx="22"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />

                  {/* ================== AI INTERVIEW HEADER ================== */}
                  <circle
                    cx="120"
                    cy="95"
                    r="20"
                    fill="url(#aiInterviewGradient)"
                  />
                  <rect
                    x="155"
                    y="85"
                    width="150"
                    height="10"
                    rx="5"
                    fill="#6366f1"
                  />
                  <rect
                    x="155"
                    y="102"
                    width="90"
                    height="6"
                    rx="3"
                    fill="#a5b4fc"
                  />

                  {/* ================== AI QUESTION BUBBLE ================== */}
                  <rect
                    x="80"
                    y="140"
                    width="220"
                    height="38"
                    rx="12"
                    fill="#eef2ff"
                  />
                  <circle cx="95" cy="159" r="4" fill="#6366f1" />
                  <circle cx="108" cy="159" r="4" fill="#6366f1" />
                  <circle cx="121" cy="159" r="4" fill="#6366f1" />

                  {/* ================== USER ANSWER BUBBLE ================== */}
                  <rect
                    x="120"
                    y="190"
                    width="200"
                    height="34"
                    rx="12"
                    fill="#ecfeff"
                  />
                  <rect
                    x="135"
                    y="203"
                    width="120"
                    height="5"
                    rx="2"
                    fill="#22c55e"
                  />

                  {/* ================== ANSWER EVALUATION ================== */}
                  <rect
                    x="80"
                    y="245"
                    width="260"
                    height="8"
                    rx="4"
                    fill="#e5e7eb"
                  />
                  <rect
                    x="80"
                    y="245"
                    width="180"
                    height="8"
                    rx="4"
                    fill="url(#scoreGradient)"
                  >
                    <animate
                      attributeName="width"
                      from="0"
                      to="180"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </rect>

                  {/* ================== FEEDBACK TAGS ================== */}
                  <rect
                    x="80"
                    y="270"
                    width="60"
                    height="18"
                    rx="9"
                    fill="#dcfce7"
                  />
                  <rect
                    x="150"
                    y="270"
                    width="80"
                    height="18"
                    rx="9"
                    fill="#fef3c7"
                  />
                  <rect
                    x="240"
                    y="270"
                    width="70"
                    height="18"
                    rx="9"
                    fill="#fee2e2"
                  />

                  {/* ================== AI THINKING RADAR ================== */}
                  <circle cx="340" cy="110" r="26" fill="url(#aiPulse)">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      values="1;1.4;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <circle
                    cx="340"
                    cy="110"
                    r="12"
                    fill="url(#aiInterviewGradient)"
                  />

                  {/* ================== LIVE INTERVIEW INDICATOR ================== */}
                  <circle cx="80" cy="330" r="6" fill="#22c55e">
                    <animate
                      attributeName="opacity"
                      values="1;0.2;1"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <rect
                    x="95"
                    y="325"
                    width="140"
                    height="10"
                    rx="5"
                    fill="#bbf7d0"
                  />

                  {/* ================== AI SCORE ENGINE ================== */}
                  <g>
                    <circle
                      cx="340"
                      cy="320"
                      r="18"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      fill="none"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 340 320"
                        to="360 340 320"
                        dur="5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="340" cy="320" r="6" fill="#f59e0b" />
                  </g>

                  {/* ================== FINAL INTERVIEW RESULT ================== */}
                  <rect
                    x="80"
                    y="360"
                    width="200"
                    height="14"
                    rx="7"
                    fill="#ede9fe"
                  />
                  <rect
                    x="80"
                    y="360"
                    width="160"
                    height="14"
                    rx="7"
                    fill="#8b5cf6"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
          {/* </div> */}
        </section>

        {/* Features Section */}
        <section className={landingPageStyles.featuresSection}>
          <div className={landingPageStyles.featuresContainer}>
            <div className={landingPageStyles.featuresHeader}>
              <h2 className={landingPageStyles.featuresTitle}>
                Why Choose{' '}
                <span className={landingPageStyles.featuresTitleGradient}>
                  Jobsy AI?
                </span>
              </h2>
              <p className={landingPageStyles.featuresDescription}>
                Everything you need to build ATS-optimized resumes and crack
                interviews with AI confidence.
              </p>
            </div>

            <div className={landingPageStyles.featuresGrid}>
              {[
                {
                  icon: <Zap className={landingPageStyles.featureIcon} />,
                  title: 'AI Resume Builder',
                  description:
                    'Create role-specific resumes using AI suggestions tailored to job descriptions and industry standards.',
                  gradient: landingPageStyles.featureIconViolet,
                  bg: landingPageStyles.featureCardViolet,
                },
                {
                  icon: (
                    <LayoutTemplate className={landingPageStyles.featureIcon} />
                  ),
                  title: 'ATS Compatibility Check',
                  description:
                    'Analyze ATS score, keyword gaps, formatting issues, and recruiter filters before applying.',
                  gradient: landingPageStyles.featureIconFuchsia,
                  bg: landingPageStyles.featureCardFuchsia,
                },
                {
                  icon: <Download className={landingPageStyles.featureIcon} />,
                  title: 'One-Click PDF Export',
                  description:
                    'Download clean, professional, recruiter-ready resumes in high-quality PDF format instantly.',
                  gradient: landingPageStyles.featureIconOrange,
                  bg: landingPageStyles.featureCardOrange,
                },
                {
                  icon: <Zap className={landingPageStyles.featureIcon} />,
                  title: 'Mock Interview Practice',
                  description:
                    'Practice real interview questions generated from your resume and target job role.',
                  gradient: landingPageStyles.featureIconEmerald,
                  bg: landingPageStyles.featureCardEmerald,
                },
                {
                  icon: (
                    <LayoutTemplate className={landingPageStyles.featureIcon} />
                  ),
                  title: 'Live AI Feedback',
                  description:
                    'Receive instant AI feedback on answers, clarity, confidence, and technical depth.',
                  gradient: landingPageStyles.featureIconBlue,
                  bg: landingPageStyles.featureCardBlue,
                },
                {
                  icon: <Zap className={landingPageStyles.featureIcon} />,
                  title: 'Interview Performance Report',
                  description:
                    'Get detailed interview results with scores, strengths, weaknesses, and improvement tips.',
                  gradient: landingPageStyles.featureIconRose,
                  bg: landingPageStyles.featureCardRose,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`${landingPageStyles.featureCard} group`}
                >
                  {/* Hover glow */}
                  <div
                    className={`${landingPageStyles.featureCardHover} group-hover:opacity-100`}
                  />

                  <div
                    className={`${landingPageStyles.featureCardContent} ${feature.bg}
            transition-all duration-300 ease-out
            group-hover:-translate-y-2
            group-hover:shadow-2xl`}
                  >
                    <div
                      className={`${landingPageStyles.featureIconContainer} ${feature.gradient}
              transition-transform duration-300
              group-hover:scale-110`}
                    >
                      {feature.icon}
                    </div>

                    <h3 className={landingPageStyles.featureTitle}>
                      {feature.title}
                    </h3>

                    <p className={landingPageStyles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={landingPageStyles.ctaSection}>
          <div className={landingPageStyles.ctaContainer}>
            <div
              className={`${landingPageStyles.ctaCard} relative overflow-hidden`}
            >
              {/* AI Glow Background */}
              <div className={landingPageStyles.ctaCardBg}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-indigo-600/20 animate-pulse"></div>

              <div className={landingPageStyles.ctaCardContent}>
                <h2 className={landingPageStyles.ctaTitle}>
                  Get Interview-Ready with{' '}
                  <span className={landingPageStyles.ctaTitleGradient}>
                    Jobsy AI
                  </span>
                </h2>

                <p className={landingPageStyles.ctaDescription}>
                  Build ATS-optimized resumes, practice AI-powered mock
                  interviews, and receive real-time feedback — all in one
                  intelligent career platform.
                </p>

                <button
                  className={`${landingPageStyles.ctaButton} group relative overflow-hidden`}
                  onClick={handleCTA}
                >
                  {/* Shimmer Effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>

                  <div className={landingPageStyles.ctaButtonOverlay}></div>

                  <span
                    className={`${landingPageStyles.ctaButtonText} relative z-10`}
                  >
                    Start AI Career Prep
                  </span>
                </button>

                {/* Sub-CTA Hint */}
                <p className="mt-4 text-xs text-Black/80 tracking-wide">
                  🚀 Trusted by job seekers preparing for real-world interviews
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`${landingPageStyles.footer} relative overflow-hidden`}
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-fuchsia-600/20 animate-gradient-x"></div>

        {/* Floating Dots (AI Particles) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </div>

        <div className={`${landingPageStyles.footerContainer}`}>
          {/* Brand Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Jobsy AI Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h4 className="text-slate-900 font-semibold tracking-wide">
                  Jobsy AI
                </h4>
                <p className="text-sm sm:text-base text-slate-400 font-medium">
                  AI Resume Builder • ATS Check • Mock Interviews
                </p>
              </div>
            </div>

            {/* Author */}
            <p className={landingPageStyles.footerText}>
              Crafted with{' '}
              <span
                className={`${landingPageStyles.footerHeart} inline-block animate-pulse`}
              >
                ❤️
              </span>{' '}
              by{' '}
              <a
                href="https://www.instagram.com/_._now_.realise_._/"
                target="_blank"
                rel="noreferrer"
                className={`${landingPageStyles.footerLink} relative group`}
              >
                G.HariHaran
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </p>
          </div>

          {/* Divider */}
          {/* Social Media Links */}
          <div className="mt-4 flex justify-center md:justify-start gap-5">
            <a
              href="https://www.linkedin.com/in/g-hariharan-483097292"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group relative text-slate-600 hover:text-violet-600 transition"
            >
              <i className="fab fa-linkedin-in text-lg"></i>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group relative text-slate-600 hover:text-slate-900 transition"
            >
              <i className="fab fa-github text-lg"></i>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-slate-600 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="group relative text-slate-600 hover:text-sky-500 transition"
            >
              <i className="fab fa-x-twitter text-lg"></i>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href="mailto:career@jobsyai.com"
              aria-label="Email"
              className="group relative text-slate-600 hover:text-emerald-600 transition"
            >
              <i className="fas fa-envelope text-lg"></i>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Bottom Line */}
          <p className="text-xs text-slate-900 text-center tracking-wide">
            © {new Date().getFullYear()} Jobsy AI · Empowering Smarter Careers
            with AI
          </p>
        </div>
      </footer>

      {/* Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage('login');
        }}
        hideHeader
      >
        <div>
          {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === 'signup' && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
