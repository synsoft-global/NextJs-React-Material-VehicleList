import { Route } from "./routes.interface"
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined"
import LocalTaxiSharpIcon from "@mui/icons-material/LocalTaxiSharp"
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp"
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined"
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined"
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined"
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined"
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined"
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined"
import SettingsIcon from '@mui/icons-material/Settings'
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined'



let routesList: Route[] = [
  { label: "menu.dashboard", href: "/", icon: DashboardCustomizeOutlinedIcon, permission: ['businessOwner', 'superAdmin'], sidebar: true },
  {
    label: "menu.organizationManagement", href: "/organization-management", icon: CorporateFareOutlinedIcon, permission: ['superAdmin'], sidebar: true,
    child: [
      { href: '/add', label: '' },
      { href: '/edit', label: '' }
    ]
  },
  {
    label: "menu.master", href: "", icon: FolderCopyOutlinedIcon, permission: ['superAdmin'], sidebar: true,
    sidebarChild: [
      { label: "menu.vehicleConfig", href: "/vehicle-config" },
      { label: "menu.subscriptionPlansConfig", href: "" }
    ],
  },
  { label: "menu.subscriptionManagement", href: "", icon: AutoAwesomeMotionOutlinedIcon, permission: ['superAdmin'], sidebar: true },
  { label: "menu.agencyManagement", href: "/agency-management", icon: ApartmentSharpIcon, permission: ['businessOwner'], sidebar: true },
  { label: "menu.vehicleManagement", href: "/vehicle-management", icon: LocalTaxiSharpIcon, permission: ['businessOwner'], sidebar: true },
  { label: "menu.tariffPackages", href: "", icon: AutoAwesomeMotionOutlinedIcon, permission: ['businessOwner'], sidebar: true },
  { label: "menu.reservation", href: "", icon: TodayOutlinedIcon, permission: ['businessOwner'], sidebar: true },
  { label: "menu.customQuotation", href: "", icon: RateReviewOutlinedIcon, permission: ['businessOwner'], sidebar: true },
  { label: "menu.reports", href: "", icon: AssessmentOutlinedIcon, permission: ['businessOwner', 'superAdmin'], sidebar: true },
  { label: "menu.customizeWebsite", href: "", icon: ImportantDevicesOutlinedIcon, permission: ['businessOwner'], sidebar: true },
  { label: "menu.setting", href: "/reservations-setting", icon: SettingsIcon, permission: ['businessOwner'], sidebar: true }
]



let finalRoutes: Route[] = []

routesList.map(item => {
  const { child, ...mainRoute } = item
  finalRoutes?.push(mainRoute)
  child?.map(childItem => finalRoutes?.push({ ...childItem, href: mainRoute.href + childItem.href, permission: mainRoute.permission }))
})


export const routes = finalRoutes