import { Icon } from "@chakra-ui/react";
import { AiOutlineStock } from "react-icons/ai";
import { IoCreateSharp } from "react-icons/io5";
// Admin Imports
import CreateProject from "pages/create-project";
import NFTMarketplace from "pages/top";

// Auth Imports
import { IRoute } from "types/navigation";

const routes: IRoute[] = [
  {
    name: "Top",
    layout: "",
    path: "/top",
    icon: (
      <Icon as={AiOutlineStock} width="20px" height="20px" color="inherit" />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Create Project",
    layout: "",
    path: "/create-project",
    icon: (
      <Icon as={IoCreateSharp} width="20px" height="20px" color="inherit" />
    ),
    component: CreateProject,
  },
];

export default routes;
