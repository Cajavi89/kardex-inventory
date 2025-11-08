type RoutePaths = string

type Routes = {
  public: {
    ACCEPT_INVITATION: RoutePaths
    CONFIRM: RoutePaths
    RECOVERY_PASSWORD: RoutePaths
    RESET_PASSWORD: RoutePaths
    SIGN_IN: RoutePaths
    SIGN_UP: RoutePaths
    SIGN_UP_CONFIRM_MESSAGE: RoutePaths
    LEGAL_TERMS: RoutePaths
    NOT_FOUND: RoutePaths
  }

  private: {
    COMPANY: RoutePaths
    DASHBOARD: RoutePaths
    PROFILE: RoutePaths
    TEAM: RoutePaths
    SETTINGS: RoutePaths
    SUBSCRIPTION: RoutePaths
    UPGRADE_PLAN: RoutePaths
    HELP: RoutePaths
    CUSTOMERS: RoutePaths
    CONTACTS: RoutePaths
    OKRS: RoutePaths
    OPPORTUNITIES: RoutePaths
    PROJECTS: RoutePaths
    FORBIDDEN: RoutePaths
    QUOTATIONS: RoutePaths
  }
}

export const routes: Routes = {
  public: {
    ACCEPT_INVITATION: '/auth/accept-invitation',
    CONFIRM: '/auth/confirm',
    RECOVERY_PASSWORD: '/auth/recovery-password',
    RESET_PASSWORD: '/auth/reset-password',
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    SIGN_UP_CONFIRM_MESSAGE: '/auth/sign-up-confirm-message',
    LEGAL_TERMS: '/legal-terms',
    NOT_FOUND: '/404'
  },
  private: {
    COMPANY: '/company',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    TEAM: '/team',
    SETTINGS: '/settings',
    SUBSCRIPTION: '/subscription',
    UPGRADE_PLAN: '/upgrade-plan',
    HELP: '/help',
    CUSTOMERS: '/customers',
    CONTACTS: '/contacts',
    OKRS: '/okrs',
    OPPORTUNITIES: '/opportunities',
    PROJECTS: '/projects',
    FORBIDDEN: '/forbidden',
    QUOTATIONS: '/quotations'
  }
}
