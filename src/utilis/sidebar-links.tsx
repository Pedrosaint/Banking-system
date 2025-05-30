import { HiMiniArrowDownTray } from "react-icons/hi2";
import { GrDocumentUpload, GrStorage } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RxExit } from "react-icons/rx";
import type { TsideBarLinks } from "../models/index-model";

// Each item can optionally include 'children' for dropdowns
export const navControl: TsideBarLinks[] = [
  {
    id: 1,
    name: 'Home',
    path: '/user/dashboard/home',
    icon: <IoHome size={20} />,
    section: 'ACCOUNT',
  },
  {
    id: 2,
    name: 'Local Transfer',
    path: '/user/dashboard/transfer',
    icon: <GrStorage size={20} />,
    section: 'FUND TRANSFER',
  },
  {
    id: 4,
    name: 'International Transfer',
    path: '/user/dashboard/international-transfer',
    icon: <GrDocumentUpload size={20} />,
  },
  {
    id: 5,
    name: 'Deposit',
    path: '/user/dashboard/deposit',
    icon: <HiMiniArrowDownTray size={20} />,
  },
  {
    id: 6,
    name: 'Profile',
    path: '/user/dashboard/profile',
    icon: <CgProfile size={20} />,
    section: 'USER',
  },
  {
    id: 7,
    name: 'Logout',
    path: '/user/dashboard/logout',
    icon: <RxExit size={20} />,
    section: 'AUTHENTICATION',
  },
];

export const adminNavControl: TsideBarLinks[] = [
  {
    id: 1,
    name: "Home",
    path: "/admin/dashboard/home",
    icon: <IoHome size={20} />,
    section: "ACCOUNT",
  },
  {
    id: 2,
    name: "Logout",
    path: "/admin/dashboard/logout",
    icon: <RxExit size={20} />,
    section: "AUTHENTICATION",
  },
];
