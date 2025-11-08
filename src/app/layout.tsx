import "./globals.css";
import React from "react";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { cn } from "@/lib/utils";
import { TriggerSidebar } from "@/components/sidebar/TriggerSiderbar";
import { SidebarStateWatcher } from "@/components/sidebar/SidebarStateWatcher";
import { Providers } from "@/components/providers/Providers";
// import { PageHeader } from '@/components/pageName/PageName'

// import UserDataInitializer from '@/components/UserInicializer'
import { getCookie } from "@/services/general.service";
// import { SupportBugsDialog } from '@/components/Dialogs/SupportBugsDialog'

// import { NotificationsDrawer } from '@/components/notifications/NotificationDrawer'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultStateSidebar = await getCookie("sidebar_state");

  return (
    <html lang="en" suppressHydrationWarning>
      <body cz-shortcut-listen="true">
        <SidebarProvider defaultOpen={defaultStateSidebar === "true"}>
          <div className="relative">
            <AppSidebar />
            <TriggerSidebar />
            <SidebarStateWatcher />
            {/* <UserDataInitializer /> */}
          </div>
          <main
            style={{
              width:
                defaultStateSidebar === "true"
                  ? `calc(100% - var(--sidebar-width-icon) - 1rem)`
                  : `calc(100% - var(--sidebar-width))`,
            }}
            className={cn(
              "ml-auto w-full max-w-full overflow-y-hidden",
              "transition-[width] duration-200 ease-linear",
              "flex h-svh flex-col",
              "group-data-[scroll-locked=1]/body:h-full",
              "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh",
              "pr-6 pl-6"
            )}>
            {/* <NotificationsDrawer /> */}
            {/* <SupportBugsDialog /> */}
            {/* <PageHeader /> */}
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
