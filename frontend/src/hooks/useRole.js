import { useAuth } from './useAuth'

export const useRole = () => {
  const { user } = useAuth()
  const roles = user?.roles || []

  const hasRole = (...requiredRoles) =>
    requiredRoles.some((role) => roles.includes(role))

  return { roles, hasRole }
}
