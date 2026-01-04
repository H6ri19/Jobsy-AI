// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/userContext";
// import { Clock, TrendingUp, Award, Trash2, Edit, Check, Zap } from "lucide-react";
// import { cardStyles } from "../assets/dummystyle";

// // ProfileInfoCard Component
// export const ProfileInfoCard = () => {
//   const navigate = useNavigate();
//   const { user, clearUser } = useContext(UserContext);

//   const handleLogout = () => {
//     localStorage.clear();
//     clearUser();
//     navigate("/");
//   };

//   return (
//     user && (
//       <div className={cardStyles.profileCard}>
//         <div className={cardStyles.profileInitialsContainer}>
//           <span className={cardStyles.profileInitialsText}>
//             {user.name ? user.name.charAt(0).toUpperCase() : ""}
//           </span>
//         </div>
//         <div>
//           <div className={cardStyles.profileName}>{user.name || ""}</div>
//           <button
//             className={cardStyles.logoutButton}
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     )
//   );
// };

// // ResumeSummaryCard Component
// export const ResumeSummaryCard = ({
//   title = "Untitled Resume",
//   createdAt = null,
//   updatedAt = null,
//   onSelect,
//   onDelete,
//   completion = 85,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const formattedCreatedDate = createdAt
//     ? new Date(createdAt).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     })
//     : "—";

//   const formattedUpdatedDate = updatedAt
//     ? new Date(updatedAt).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     })
//     : "—";

//   const getCompletionColor = () => {
//     if (completion >= 90) return cardStyles.completionHigh;
//     if (completion >= 70) return cardStyles.completionMedium;
//     return cardStyles.completionLow;
//   };

//   const getCompletionIcon = () => {
//     if (completion >= 90) return <Award size={12} />;
//     if (completion >= 70) return <TrendingUp size={12} />;
//     return <Zap size={12} />;
//   };

//   const handleDeleteClick = (e) => {
//     e.stopPropagation();
//     if (onDelete) onDelete();
//   };

//   const generateDesign = () => {
//     const colors = [
//       "from-blue-50 to-blue-100",
//       "from-purple-50 to-purple-100",
//       "from-emerald-50 to-emerald-100",
//       "from-amber-50 to-amber-100",
//       "from-rose-50 to-rose-100"
//     ];
//     return colors[title.length % colors.length];
//   };

//   const designColor = generateDesign();

//   return (
//     <div
//       className={cardStyles.resumeCard}
//       onClick={onSelect}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Completion indicator */}
//       <div className={cardStyles.completionIndicator}>
//         <div className={`${cardStyles.completionDot} bg-gradient-to-r ${getCompletionColor()}`}>
//           <div className={cardStyles.completionDotInner} />
//         </div>
//         <span className={cardStyles.completionPercentageText}>{completion}%</span>
//         {getCompletionIcon()}
//       </div>

//       {/* Preview area */}
//       <div className={`${cardStyles.previewArea} bg-gradient-to-br ${designColor}`}>
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <div className={cardStyles.emptyPreviewIcon}>
//             <Edit size={28} className="text-indigo-600" />
//           </div>
//           <span className={cardStyles.emptyPreviewText}>{title}</span>
//           <span className={cardStyles.emptyPreviewSubtext}>
//             {completion === 0 ? "Start building" : `${completion}% completed`}
//           </span>

//           {/* Mini resume sections indicator */}
//           <div className="mt-4 flex gap-2">
//             {['Profile', 'Work', 'Skills', 'Edu'].map((section, i) => (
//               <div
//                 key={i}
//                 className={`px-2 py-1 text-xs rounded-md ${i < Math.floor(completion / 25)
//                   ? 'bg-white/90 text-indigo-600 font-medium'
//                   : 'bg-white/50 text-gray-500'
//                   }`}
//               >
//                 {section}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Hover overlay with action buttons */}
//         {isHovered && (
//           <div className={cardStyles.actionOverlay}>
//             <div className={cardStyles.actionButtonsContainer}>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   if (onSelect) onSelect();
//                 }}
//                 className={cardStyles.editButton}
//                 title="Edit"
//               >
//                 <Edit size={18} className={cardStyles.buttonIcon} />
//               </button>
//               <button
//                 onClick={handleDeleteClick}
//                 className={cardStyles.deleteButton}
//                 title="Delete"
//               >
//                 <Trash2 size={18} className={cardStyles.buttonIcon} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Info area */}
//       <div className={cardStyles.infoArea}>
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex-1">
//             <h5 className={cardStyles.title}>{title}</h5>
//             <div className={cardStyles.dateInfo}>
//               <Clock size={12} />
//               <span>Created At: {formattedCreatedDate}</span>
//               <span className="ml-2">Updated At: {formattedUpdatedDate}</span>
//             </div>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//           <div
//             className={`h-full bg-gradient-to-r ${getCompletionColor()} rounded-full transition-all duration-700 ease-out relative overflow-hidden`}
//             style={{ width: `${completion}%` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
//           </div>
//           <div
//             className={`absolute top-0 h-full w-4 bg-gradient-to-r from-transparent to-white/50 blur-sm transition-all duration-700`}
//             style={{ left: `${Math.max(0, completion - 2)}%` }}
//           ></div>
//         </div>

//         {/* Completion status */}
//         <div className="flex justify-between items-center mt-2">
//           <span className="text-xs font-medium text-gray-500">
//             {completion < 50 ? "Getting Started" : completion < 80 ? "Almost There" : "Ready to Go!"}
//           </span>
//           <span className="text-xs font-bold text-gray-700">{completion}% Complete</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // TemplateCard Component

// export const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
//   return (
//     <div
//       className={`group h-auto md:h-[300px] lg:h-[320px] flex flex-col bg-white border-2 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-3xl
//       ${isSelected
//           ? "border-violet-500 shadow-lg shadow-violet-500/20 bg-violet-50"
//           : "border-gray-200 hover:border-violet-300"
//         }`} onClick={onSelect}
//     >
//       {thumbnailImg ? (
//         <div className="relative w-full h-full overflow-hidden">
//           <img
//             src={thumbnailImg || "/placeholder.svg"}
//             alt="Template Preview"
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//           />
//           {/* Glassmorphism overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           {/* Selection indicator */}
//           {isSelected && (
//             <div className="absolute inset-0 bg-violet-500/10 flex items-center justify-center">
//               <div className="w-16 h-16 bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-pulse">
//                 <Check size={24} className="text-violet-600" />
//               </div>
//             </div>
//           )}

//           {/* Hover effect */}
//           <div className="absolute inset-0 bg-gradient-to-t from-violet-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         </div>
//       ) : (
//         <div className="w-full h-[200px] flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 to-fuchsia-50">
//           <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-3">
//             <Edit size={20} className="text-white" />
//           </div> <span className="text-gray-700 font-bold">No Preview</span>
//         </div>
//       )}
//     </div>
//   );
// }

// AI Resume Check Component
// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/userContext';
// import {
//   Clock,
//   TrendingUp,
//   Award,
//   Trash2,
//   Edit,
//   Check,
//   Zap,
// } from 'lucide-react';
// import { cardStyles } from '../assets/dummystyle';

// /* ===============================
//    PROFILE INFO CARD
// ================================ */
// export const ProfileInfoCard = () => {
//   const navigate = useNavigate();
//   const { user, clearUser } = useContext(UserContext);

//   const handleLogout = () => {
//     localStorage.clear();
//     clearUser();
//     navigate('/');
//   };

//   return (
//     user && (
//       <div className={cardStyles.profileCard}>
//         <div className={cardStyles.profileInitialsContainer}>
//           <span className={cardStyles.profileInitialsText}>
//             {user.name ? user.name.charAt(0).toUpperCase() : ''}
//           </span>
//         </div>
//         <div>
//           <div className={cardStyles.profileName}>{user.name}</div>
//           <button className={cardStyles.logoutButton} onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     )
//   );
// };

// /* ===============================
//    RESUME SUMMARY CARD
// ================================ */
// export const ResumeSummaryCard = ({
//   resumeId, // ✅ REQUIRED
//   title = 'Untitled Resume',
//   createdAt = null,
//   updatedAt = null,
//   onSelect,
//   onDelete,
//   completion = 0,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();

//   const formattedCreatedDate = createdAt
//     ? new Date(createdAt).toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//       })
//     : '—';

//   const formattedUpdatedDate = updatedAt
//     ? new Date(updatedAt).toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//       })
//     : '—';

//   const getCompletionColor = () => {
//     if (completion >= 90) return cardStyles.completionHigh;
//     if (completion >= 70) return cardStyles.completionMedium;
//     return cardStyles.completionLow;
//   };

//   const getCompletionIcon = () => {
//     if (completion >= 90) return <Award size={12} />;
//     if (completion >= 70) return <TrendingUp size={12} />;
//     return <Zap size={12} />;
//   };

//   const handleDeleteClick = (e) => {
//     e.stopPropagation();
//     if (onDelete) onDelete();
//   };

//   const generateDesign = () => {
//     const colors = [
//       'from-blue-50 to-blue-100',
//       'from-purple-50 to-purple-100',
//       'from-emerald-50 to-emerald-100',
//       'from-amber-50 to-amber-100',
//       'from-rose-50 to-rose-100',
//     ];
//     return colors[title.length % colors.length];
//   };

//   const designColor = generateDesign();

//   return (
//     <div
//       className={cardStyles.resumeCard}
//       onClick={onSelect}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Completion indicator */}
//       <div className={cardStyles.completionIndicator}>
//         <div
//           className={`${
//             cardStyles.completionDot
//           } bg-gradient-to-r ${getCompletionColor()}`}
//         >
//           <div className={cardStyles.completionDotInner} />
//         </div>
//         <span className={cardStyles.completionPercentageText}>
//           {completion}%
//         </span>
//         {getCompletionIcon()}
//       </div>

//       {/* Preview Area */}
//       <div
//         className={`${cardStyles.previewArea} bg-gradient-to-br ${designColor}`}
//       >
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <div className={cardStyles.emptyPreviewIcon}>
//             <Edit size={28} className="text-indigo-600" />
//           </div>
//           <span className={cardStyles.emptyPreviewText}>{title}</span>
//           <span className={cardStyles.emptyPreviewSubtext}>
//             {completion === 0 ? 'Start building' : `${completion}% completed`}
//           </span>
//         </div>

//         {/* Hover Actions */}
//         {isHovered && (
//           <div className={cardStyles.actionOverlay}>
//             <div className="flex flex-col gap-3">
//               {/* Edit */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   if (onSelect) onSelect();
//                 }}
//                 className={cardStyles.editButton}
//                 title="Edit"
//               >
//                 <Edit size={18} className={cardStyles.buttonIcon} />
//               </button>

//               {/* Delete */}
//               <button
//                 onClick={handleDeleteClick}
//                 className={cardStyles.deleteButton}
//                 title="Delete"
//               >
//                 <Trash2 size={18} className={cardStyles.buttonIcon} />
//               </button>

//               {/* 🎤 Interview Prep */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   navigate(`/interview/prep/${resumeId}`);
//                 }}
//                 className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg transition-all"
//               >
//                 🎤 Interview Prep
//               </button>

//               {/* 🤖 AI Resume Check */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   navigate(`/resume/${resumeId}/ai-analysis`);
//                 }}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg transition-all"
//               >
//                 🤖 AI Resume Check
//               </button>
//               {
//                 /* 📊 ATS Check */
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/resume/${resumeId}/ats`);
//                   }}
//                   className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold"
//                 >
//                   🤖 ATS Check
//                 </button>
//               }
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Info Area */}
//       <div className={cardStyles.infoArea}>
//         <h5 className={cardStyles.title}>{title}</h5>
//         <div className={cardStyles.dateInfo}>
//           <Clock size={12} />
//           <span>Created: {formattedCreatedDate}</span>
//           <span className="ml-2">Updated: {formattedUpdatedDate}</span>
//         </div>

//         {/* Progress Bar */}
//         <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
//           <div
//             className={`h-full bg-gradient-to-r ${getCompletionColor()} rounded-full`}
//             style={{ width: `${completion}%` }}
//           />
//         </div>

//         <div className="flex justify-between mt-2 text-xs">
//           <span>
//             {completion < 50
//               ? 'Getting Started'
//               : completion < 80
//               ? 'Almost There'
//               : 'Ready to Go!'}
//           </span>
//           <span className="font-bold">{completion}%</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ===============================
//    TEMPLATE CARD (UNCHANGED)
// ================================ */
// export const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
//   return (
//     <div
//       className={`group flex flex-col bg-white border-2 rounded-3xl overflow-hidden cursor-pointer transition-all
//       ${
//         isSelected
//           ? 'border-violet-500 shadow-lg bg-violet-50'
//           : 'border-gray-200 hover:border-violet-300'
//       }`}
//       onClick={onSelect}
//     >
//       {thumbnailImg ? (
//         <img
//           src={thumbnailImg}
//           alt="Template"
//           className="w-full h-full object-cover"
//         />
//       ) : (
//         <div className="h-[200px] flex items-center justify-center bg-violet-50">
//           <Check size={24} className="text-violet-600" />
//         </div>
//       )}
//     </div>
//   );
// };
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import {
  Clock,
  TrendingUp,
  Award,
  Trash2,
  Edit,
  Check,
  Zap,
  Bot,
  Mic,
  BarChart3,
} from 'lucide-react';
import { cardStyles } from '../assets/dummystyle';

/* ===============================
   PROFILE INFO CARD
================================ */
export const ProfileInfoCard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className={cardStyles.profileCard}>
      <div className={cardStyles.profileInitialsContainer}>
        <span className={cardStyles.profileInitialsText}>
          {user.name?.charAt(0).toUpperCase()}
        </span>
      </div>
      <div>
        <div className={cardStyles.profileName}>{user.name}</div>
        <button className={cardStyles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

/* ===============================
   RESUME SUMMARY CARD
================================ */
export const ResumeSummaryCard = ({
  resumeId,
  title = 'Untitled Resume',
  createdAt,
  updatedAt,
  completion = 0,
  onSelect,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '—';

  const completionGradient = () => {
    if (completion >= 90) return 'from-green-500 to-emerald-500';
    if (completion >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const completionIcon = () => {
    if (completion >= 90) return <Award size={14} />;
    if (completion >= 70) return <TrendingUp size={14} />;
    return <Zap size={14} />;
  };

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-white rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Completion Badge */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-full px-3 py-1 text-xs font-semibold shadow flex items-center gap-1">
        {completionIcon()}
        {completion}%
      </div>

      {/* Preview */}
      <div
        className={`h-44 flex flex-col items-center justify-center text-white bg-gradient-to-br ${completionGradient()}`}
      >
        <Edit size={30} />
        <h3 className="mt-2 font-semibold text-center px-3">{title}</h3>
        <p className="text-xs opacity-90">
          {completion === 0 ? 'Start building' : `${completion}% completed`}
        </p>
      </div>

      {/* Hover Actions */}
      {hovered && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
            <ActionButton icon={<Edit />} label="Edit" onClick={onSelect} />
            <ActionButton
              icon={<Trash2 />}
              label="Delete"
              danger
              onClick={onDelete}
            />
            <ActionButton
              icon={<Mic />}
              label="Interview"
              onClick={() => navigate(`/interview/prep/${resumeId}`)}
            />
            <ActionButton
              icon={<Bot />}
              label="AI Review"
              onClick={() => navigate(`/resume/${resumeId}/ai-analysis`)}
            />
            <ActionButton
              icon={<BarChart3 />}
              label="ATS Check"
              full
              onClick={() => navigate(`/resume/${resumeId}/ats`)}
            />
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 truncate">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          <Clock size={12} />
          <span>Created: {formatDate(createdAt)}</span>
          <span>• Updated: {formatDate(updatedAt)}</span>
        </div>

        {/* Progress */}
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${completionGradient()} transition-all duration-700`}
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>
    </div>
  );
};

/* ===============================
   ACTION BUTTON (FIXED + ANIMATED)
================================ */
const ActionButton = ({
  icon,
  label,
  onClick,
  danger = false,
  full = false,
}) => (
  <button
    onClick={(e) => {
      e.stopPropagation(); // ✅ FIXED (always defined here)
      onClick();
    }}
    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white
      transition-all duration-200 ease-out
      hover:scale-105 active:scale-95
      ${
        danger
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-violet-600 hover:bg-violet-700'
      }
      ${full ? 'col-span-2' : ''}
    `}
  >
    {icon}
    {label}
  </button>
);

/* ===============================
   TEMPLATE CARD
================================ */
export const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`border-2 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300
        ${
          isSelected
            ? 'border-violet-600 shadow-lg bg-violet-50'
            : 'border-gray-200 hover:border-violet-300 hover:shadow-md'
        }`}
    >
      {thumbnailImg ? (
        <img
          src={thumbnailImg}
          alt="Template"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="h-[200px] flex items-center justify-center bg-violet-50">
          <Check size={24} className="text-violet-600" />
        </div>
      )}
    </div>
  );
};
