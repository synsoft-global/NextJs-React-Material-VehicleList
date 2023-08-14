import { routes } from "@/component/_layout/routes/routes.route"


export const getRoutesByRole = (role: Roles) => {
  return routes.filter(item => item.permission.find(userRole => userRole == role))
}


export const checkRoutePermission = (role: Roles, route: string) => {
  return Boolean(routes.find(item => item.permission.find(userRole => userRole == role) && item.href.trim() == route))
}