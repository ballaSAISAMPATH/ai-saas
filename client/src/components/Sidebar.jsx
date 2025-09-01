import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom';
import {
  House,
  Scissors,
  SquarePen,
  Hash,
  Image,
  Eraser,
  FileText,
  Users,
  UserCircle,
  LogOut
} from 'lucide-react';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users }
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div>
      <div
        className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
          sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
        } transition-all duration-300 ease-in-out`}
      >
        {/* Top Section */}
        <div className="my-7 w-full">
          <img
            src={user?.imageUrl}
            alt="User avatar"
            className="w-14 h-14 rounded-full mx-auto"
          />
          <h1 className="mt-1 text-center font-medium">{user?.fullName}</h1>

          <div className="mt-6 flex flex-col gap-2">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/ai'}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234FF] text-white'
                      : 'hover:bg-gray-100'
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="mb-6 flex flex-col gap-2 w-full px-4">
          <button
            onClick={() => openUserProfile()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <UserCircle size={18} />
            <span>Profile</span>
          </button>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
