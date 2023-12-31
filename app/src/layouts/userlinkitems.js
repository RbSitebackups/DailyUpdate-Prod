import {
  MdOutlineDashboard,
  MdOutlineGroups,
  MdCategory,
  MdOutlineStopScreenShare,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineEditNote,
  MdFormatListBulletedAdd,
  MdMarkEmailUnread,
  MdLogout,
  MdOutlineCampaign,
} from 'react-icons/md'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { HiOutlineArchive } from 'react-icons/hi'
import { ImCogs } from 'react-icons/im'

const userlinkitems = [
  {
    icon: MdOutlineDashboard,
    title: 'Dashboard',
    pgLink: '/',
  },
  {
    icon: MdOutlineGroups,
    title: 'Clients',
    pgLink: '/client',
  },
  {
    icon: MdOutlineCampaign,
    title: 'Campaigns',
    pgLink: '/campaigns',
  },
  {
    icon: MdMarkEmailUnread,
    title: 'EDM Schedules',
    pgLink: '/listschedule',
  },
  // {
  //   icon: MdCategory,
  //   title: 'Category',
  //   pgLink: '/category',
  // },
  // {
  //   icon: MdOutlineStopScreenShare,
  //   title: 'Blocker',
  //   pgLink: '/blockers',
  // },
  // {
  //   icon: ImCogs,
  //   title: 'Preference',
  //   iconOpened: MdOutlineKeyboardArrowUp,
  //   iconClosed: MdOutlineKeyboardArrowDown,
  //   subNav: [
  //     {
  //       icon: HiOutlineCog6Tooth,
  //       title: 'Setting',
  //       pgLink: '/setting',
  //     },
  //     {
  //       icon: MdOutlineEditNote,
  //       title: 'Change password',
  //       pgLink: '/changepassword',
  //     },
  //   ],
  // },
  {
    icon: MdLogout,
    title: 'Logout',
    pgLink: '/logout',
  },
]

export default userlinkitems
