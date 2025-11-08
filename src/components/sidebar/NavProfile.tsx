import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { TNavGroup } from "./types";
import { routes } from "@/constants/app-routes";
import { TbLogout2 } from "react-icons/tb";
// import { logOut } from '@/services/auth.service'
// import { capitalize } from '@/utils/capitalize'
// import { rolesVerifying } from '@/utils/rolesVerifying'
// import useUserSessionStore from '@/store/useUserSessionStore'

export function NavProfile({
  name,
  email,
  items,
  companyId,
}: {
  name: string;
  email: string;
  items: TNavGroup[];
  companyId: string;
}) {
  const { isMobile, state: stateSidebar } = useSidebar();
  // const { dataUser } = useUserSessionStore()

  // Filtrar los ítems del menú según los roles del usuario
  const filteredItems = items[0].items.filter((item) => {
    // if ('roles' in item && item.roles) {
    //   const userRoles = dataUser?.role ? [dataUser.role] : []
    //   return rolesVerifying(userRoles, item.roles)
    // }
    return true; // Si no tiene roles definidos, se muestra por defecto
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${
                stateSidebar === "collapsed" && "mx-auto ml-3 hover:bg-background"
              } `}>
              <div className="flex-shrink-0 self-center">
                <FaUserCircle size={24} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {name}
                  {/* {capitalize(name)} */}
                </span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="flex-shrink-0">
                  <FaUserCircle size={16} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {name}
                    {/* {capitalize(name)} */}
                  </span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {filteredItems.map((item) => (
              <DropdownMenuGroup key={item.title}>
                <Link href={`${routes.private.COMPANY}/${companyId}${item.path!}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    {item.icon && <item.icon />}
                    {item.title}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("salir")} className="cursor-pointer">
              <TbLogout2 size={20} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
