import {
  MdOutlineDashboard,
  MdOutlineGroups,
  MdCategory,
  MdOutlineStopScreenShare,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineEditNote,
  MdFormatListBulletedAdd,
  MdLogout,
  MdMarkEmailUnread,
} from 'react-icons/md'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { HiOutlineArchive } from 'react-icons/hi'
import { ImCogs } from 'react-icons/im'

const linkitems = [
  {
    icon: MdOutlineDashboard,
    title: 'Dashboard',
    pgLink: '/',
  },
  {
    icon: MdOutlineGroups,
    title: 'Users',
    iconOpened: MdOutlineKeyboardArrowUp,
    iconClosed: MdOutlineKeyboardArrowDown,
    subNav: [
      {
        icon: MdFormatListBulletedAdd,
        title: 'Add User',
        pgLink: '/add-user',
      },
      {
        icon: MdOutlineEditNote,
        title: 'Update User',
        pgLink: '/update-user',
      },
      {
        icon: HiOutlineArchive,
        title: 'Archive User',
        pgLink: '/archive-user',
      },
    ],
  },
  {
    icon: MdOutlineGroups,
    title: 'Clients',
    pgLink: '/client',
  },
  {
    icon: MdMarkEmailUnread,
    title: 'EDM Schedules',
    pgLink: '/listschedule',
  },
  {
    icon: MdCategory,
    title: 'Category',
    pgLink: '/category',
  },
  {
    icon: MdOutlineStopScreenShare,
    title: 'Blocker',
    pgLink: '/blockers',
  },
  {
    icon: ImCogs,
    title: 'Preference',
    iconOpened: MdOutlineKeyboardArrowUp,
    iconClosed: MdOutlineKeyboardArrowDown,
    subNav: [
      {
        icon: HiOutlineCog6Tooth,
        title: 'Setting',
        pgLink: '/setting',
      },
      {
        icon: MdOutlineEditNote,
        title: 'Change password',
        pgLink: '/changepassword',
      },
    ],
  },
  {
    icon: MdLogout,
    title: 'Logout',
    pgLink: '/logout',
  },
]

export default linkitems
