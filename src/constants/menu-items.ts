import {
  BsArrowUpSquare,
  BsBullseye,
  BsColumnsGap,
  BsFilePersonFill,
  BsFillCreditCardFill,
  BsFillGearFill,
  BsFillGrid3X3GapFill,
  BsFillPersonFill,
  BsFillPieChartFill,
  BsFillQuestionCircleFill,
  BsFillWalletFill,
  BsPeopleFill,
} from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { ISidebarData } from "@/components/sidebar/types";
import { routes } from "./app-routes";
// import { ERole } from '@/interfaces/enums'

// Interfaz para los ítems del menú
interface MenuItem {
  path: string;
  icon: IconType;
  title: string;
}

export const menuItems: ISidebarData = {
  profile: [
    {
      title: "PROFILE",
      items: [
        {
          path: routes.private.PROFILE,
          icon: BsFillPersonFill,
          title: "Profile",
        },
        {
          path: routes.private.SETTINGS,
          icon: BsFillGearFill,
          title: "Settings",
          roles: [],
        },
        {
          path: routes.private.SUBSCRIPTION,
          icon: BsFillCreditCardFill,
          title: "Subscription",
          roles: ["hidden"], // This is a placeholder for future implementation
        },
        {
          path: routes.private.UPGRADE_PLAN,
          icon: BsArrowUpSquare,
          title: "Upgrade Plan",
          roles: ["hidden"], // This is a placeholder for future implementation
        },
        {
          path: routes.private.HELP,
          icon: BsFillQuestionCircleFill,
          title: "Help",
          roles: ["hidden"], // This is a placeholder for future implementation
        },
      ],
    },
  ],
  navGroups: [
    {
      title: "HOME",
      items: [
        {
          path: routes.private.DASHBOARD,
          icon: BsColumnsGap,
          title: "Dashboard",
          roles: [],
        },
      ],
    },
    {
      title: "SETUP",
      items: [
        {
          path: routes.private.TEAM,
          icon: BsPeopleFill,
          title: "Team",
          roles: [],
        },
        {
          path: routes.private.CUSTOMERS,
          icon: BsFillWalletFill,
          title: "Customers",
          roles: [],
        },
        {
          path: routes.private.CONTACTS,
          icon: BsFilePersonFill,
          title: "Contacts",
          roles: [],
        },
      ],
    },

    {
      title: "MANAGEMENT",
      items: [
        {
          path: routes.private.OKRS,
          icon: BsBullseye,
          title: "OKRs",
          roles: ["hidden"], // This is a placeholder for future implementation
        },
        {
          path: routes.private.OPPORTUNITIES,
          icon: BsFillPieChartFill,
          title: "Opportunities",
          roles: [],
        },
        {
          path: routes.private.QUOTATIONS,
          icon: FaFileInvoiceDollar,
          title: "Quotations",
          roles: [],
        },
        {
          path: routes.private.PROJECTS,
          icon: BsFillGrid3X3GapFill,
          title: "Projects",
        },
      ],
    },
  ],
};

export const menuProfileItems: MenuItem[] = [
  {
    path: routes.private.PROFILE,
    icon: BsFillPersonFill,
    title: "Profile",
  },
  {
    path: routes.private.SETTINGS,
    icon: BsFillGearFill,
    title: "Settings",
  },
  {
    path: routes.private.SUBSCRIPTION,
    icon: BsFillCreditCardFill,
    title: "Subscription",
  },
  {
    path: routes.private.UPGRADE_PLAN,
    icon: BsArrowUpSquare,
    title: "Upgrade Plan",
  },
  {
    path: routes.private.HELP,
    icon: BsFillQuestionCircleFill,
    title: "Help",
  },
];
