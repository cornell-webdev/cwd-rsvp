import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import useIsMobile from 'src/hooks/useIsMobile'
import useRouter from 'src/hooks/useRouter'
import MyEvents from 'src/pages/my-events/MyEvents'
import { IRootState } from 'src/types/redux.type'

const Home = React.lazy(() => import('src/pages/home/Home'))
const EventDetails = React.lazy(() => import('src/pages/event-details/EventDetails'))
const AuthCallback = React.lazy(() => import('src/pages/auth-callback/AuthCallback'))
const Login = React.lazy(() => import('src/pages/login/Login'))
const Logout = React.lazy(() => import('src/pages/logout/Logout'))
const NewEvent = React.lazy(() => import('src/pages/new-event/NewEvent'))
const EditEvent = React.lazy(() => import('src/pages/edit-event/EditEvent'))
const NewOrg = React.lazy(() => import('src/pages/new-org/NewOrg'))
const EditOrg = React.lazy(() => import('src/pages/edit-org/EditOrg'))
const MyOrgs = React.lazy(() => import('src/pages/my-orgs/MyOrgs'))
const MyLikes = React.lazy(() => import('src/pages/my-likes/MyLikes'))
const OrgAdmins = React.lazy(() => import('src/pages/org-admins/OrgAdmins'))
const DevTraining = React.lazy(() => import('src/pages/dev-training/DevTraining'))
const CheckIn = React.lazy(() => import('src/pages/check-in/CheckIn'))
const BuyTicket = React.lazy(() => import('src/pages/buy-ticket/BuyTicket'))
const MyTickets = React.lazy(() => import('src/pages/my-tickets/MyTickets'))
const TicketDetails = React.lazy(() => import('src/pages/ticket-details/TicketDetails'))
const TicketingDashboard = React.lazy(
  () => import('src/pages/ticketing-dashboard/TicketingDashboard')
)

interface IRoute {
  path: string
  component: React.FC
  label?: string
  isPublicNav: boolean
  isPrivateNav: boolean
  isPrivateRoute: boolean
  isDesktopOnly: boolean
}

export const routes: IRoute[] = [
  // auth
  {
    path: '/logout',
    component: Logout,
    label: 'Sign out',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/login',
    component: Login,
    label: 'Sign in',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/auth/callback',
    component: AuthCallback,
    label: '',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/new-org',
    component: NewOrg,
    label: 'New org',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/edit-org/:orgId',
    component: EditOrg,
    label: 'Edit org',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/new-event',
    component: NewEvent,
    label: 'New event',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/edit-event/:eventId',
    component: EditEvent,
    label: 'Edit event',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/dashboard/:eventId',
    component: TicketingDashboard,
    label: 'Ticketing dashboard',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/my-likes',
    component: MyLikes,
    label: 'My likes',
    isPublicNav: false,
    isPrivateNav: true,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/dev-training',
    component: DevTraining,
    label: 'Dev training',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/check-in/:ticketId',
    component: CheckIn,
    label: 'Check-in',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/buy-ticket/:eventId',
    component: BuyTicket,
    label: 'Buy ticket',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/profile/my-events',
    component: MyEvents,
    label: 'My events',
    isPublicNav: false,
    isPrivateNav: true,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/profile/my-tickets',
    component: MyTickets,
    label: 'My tickets',
    isPublicNav: false,
    isPrivateNav: true,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/profile/ticket-details/:ticketId',
    component: TicketDetails,
    label: 'Ticket details',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/profile/org-admins/:orgId',
    component: OrgAdmins,
    label: 'Manage administrators',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/profile/my-orgs',
    component: MyOrgs,
    label: 'My orgs',
    isPublicNav: false,
    isPrivateNav: true,
    isPrivateRoute: true,
    isDesktopOnly: false,
  },
  {
    path: '/event/:eventId',
    component: EventDetails,
    label: 'Event details',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/',
    component: Home,
    label: 'Home',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
]

const PrivateRoute = ({ component: Component, ...rest }: IRoute) => {
  const { accessToken } = useSelector((state: IRootState) => state.authState)
  const router = useRouter()

  if (!accessToken || accessToken.length === 0) {
    return <Redirect to={{ pathname: '/login', state: { prevPath: router.location.pathname } }} />
  }

  return <Route {...rest} render={() => <Component />} />
}

const DesktopRoute = ({ component: Component, ...rest }: IRoute) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <Redirect to='/mobile-block' />
  }

  return <Route {...rest} render={() => <Component />} />
}

const Routes = () => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        {routes.map(({ path, component, isPrivateRoute, isDesktopOnly, ...rest }) =>
          isPrivateRoute ? (
            <PrivateRoute
              key={path}
              path={path}
              component={component}
              isPrivateRoute={isPrivateRoute}
              isDesktopOnly={isDesktopOnly}
              {...rest}
            />
          ) : isDesktopOnly ? (
            <DesktopRoute
              key={path}
              path={path}
              component={component}
              isPrivateRoute={isPrivateRoute}
              isDesktopOnly={isDesktopOnly}
              {...rest}
            />
          ) : (
            <Route key={path} path={path} component={component} />
          )
        )}
      </Switch>
    </Suspense>
  )
}

export default Routes
