import { Icon } from "@chakra-ui/react";
import { AiOutlineStock } from "react-icons/ai";
import { MdBarChart, MdHome, MdPerson } from "react-icons/md";
// Admin Imports
import DataTables from "pages/data-tables";
import MainDashboard from "pages/default";
import Profile from "pages/profile";
import NFTMarketplace from "pages/top";

// Auth Imports
import { IRoute } from "types/navigation";

const routes: IRoute[] = [
  {
    name: "Top",
    layout: "/",
    path: "/top",
    icon: (
      <Icon as={AiOutlineStock} width="20px" height="20px" color="inherit" />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Main Dashboard",
    layout: "/",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },

  {
    name: "Data Tables",
    layout: "/",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
];

export default routes;
