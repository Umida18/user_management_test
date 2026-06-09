import { useRole } from '../hooks/useRole'
import ForbiddenPage from '../pages/ForbiddenPage'

const RoleRoute = ({ children, roles }) => {
  const { hasRole } = useRole()

  if (!hasRole(...roles)) {
    return <ForbiddenPage />
  }

  return children
}

export default RoleRoute
