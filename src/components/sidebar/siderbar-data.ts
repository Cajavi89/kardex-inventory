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
  FaWrench, // Maintenance,
  FaTruck // Suppliers
} from 'react-icons/fa'
import { MdError } from 'react-icons/md'
import { IoMdSettings } from 'react-icons/io'
import { HiOutlineKey } from 'react-icons/hi'
import { BsBuildingGear } from 'react-icons/bs'
import { SidebarData } from './types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg'
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: FaTachometerAlt,
      plan: 'Vite + ShadcnUI'
    },
    {
      name: 'Acme Inc',
      logo: BsBuildingGear,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: FaServer,
      plan: 'Startup'
    }
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: FaTachometerAlt
        },
        {
          title: 'Proveedores',
          url: '/suppliers',
          icon: FaTruck
        }
        // {
        //   title: 'Inventory',
        //   url: '/inventory',
        //   icon: FaTasks
        // },
        // {
        //   title: 'Apps',
        //   url: '/apps',
        //   icon: FaAppStore
        // },
        // {
        //   title: 'Chats',
        //   url: '/chats',
        //   badge: '3',
        //   icon: FaComments
        // },
        // {
        //   title: 'Users',
        //   url: '/users',
        //   icon: FaUsers
        // }
      ]
    },
    {
      title: 'Inventario',
      items: [
        {
          title: 'Ítems',
          url: '/inventory/items',
          icon: FaTachometerAlt
        },
        {
          title: 'Lotes',
          url: '/inventory/batches',
          icon: FaAppStore
        },
        {
          title: 'Movimientos',
          icon: HiOutlineKey,
          items: [
            {
              title: 'Entradas',
              url: '/inventory/movements/receipts',
              icon: FaSignInAlt
            },
            {
              title: 'Salidas',
              url: '/inventory/movements/issues',
              icon: FaSignInAlt
            }
          ]
        }
      ]
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IoMdSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: FaUserCog
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: FaTools
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: FaPalette
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: FaBell
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: FaDesktop
            }
          ]
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: FaQuestionCircle
        }
      ]
    }
  ]
}
