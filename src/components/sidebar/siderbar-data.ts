import {
  FaTachometerAlt, // Dashboard
  FaTasks, // Tasks
  FaAppStore, // Apps
  FaComments, // Chats
  FaUsers, // Users
  FaSignInAlt, // Auth / Sign In
  FaBug, // Errors
  FaLock, // Unauthorized
  FaUserSlash, // Forbidden
  FaExclamationTriangle, // 404
  FaServer, // 500
  FaTools, // Settings/Account
  FaUserCog, // Profile
  FaPalette, // Appearance
  FaBell, // Notifications
  FaDesktop, // Display
  FaQuestionCircle, // Help Center
  FaWrench, // Maintenance
} from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { HiOutlineKey } from "react-icons/hi";
import { BsBuildingGear } from "react-icons/bs";
import { SidebarData } from "./types";

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shadcn Admin",
      logo: FaTachometerAlt,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: BsBuildingGear,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: FaServer,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: FaTachometerAlt,
        },
        {
          title: "Tasks",
          url: "/tasks",
          icon: FaTasks,
        },
        {
          title: "Apps",
          url: "/apps",
          icon: FaAppStore,
        },
        {
          title: "Chats",
          url: "/chats",
          badge: "3",
          icon: FaComments,
        },
        {
          title: "Users",
          url: "/users",
          icon: FaUsers,
        },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          title: "Auth",
          icon: HiOutlineKey,
          items: [
            {
              title: "Sign In",
              url: "/sign-in",
              icon: FaSignInAlt,
            },
            {
              title: "Sign In (2 Col)",
              url: "/sign-in-2",
              icon: FaSignInAlt,
            },
            {
              title: "Sign Up",
              url: "/sign-up",
              icon: FaSignInAlt,
            },
            {
              title: "Forgot Password",
              url: "/forgot-password",
              icon: HiOutlineKey,
            },
            {
              title: "OTP",
              url: "/otp",
              icon: HiOutlineKey,
            },
          ],
        },
        {
          title: "Errors",
          icon: FaBug,
          items: [
            {
              title: "Unauthorized",
              url: "/401",
              icon: FaLock,
            },
            {
              title: "Forbidden",
              url: "/403",
              icon: FaUserSlash,
            },
            {
              title: "Not Found",
              url: "/404",
              icon: FaExclamationTriangle,
            },
            {
              title: "Internal Server Error",
              url: "/500",
              icon: MdError,
            },
            {
              title: "Maintenance Error",
              url: "/503",
              icon: FaWrench,
            },
          ],
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: IoMdSettings,
          items: [
            {
              title: "Profile",
              url: "/settings",
              icon: FaUserCog,
            },
            {
              title: "Account",
              url: "/settings/account",
              icon: FaTools,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: FaPalette,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              icon: FaBell,
            },
            {
              title: "Display",
              url: "/settings/display",
              icon: FaDesktop,
            },
          ],
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: FaQuestionCircle,
        },
      ],
    },
  ],
};
