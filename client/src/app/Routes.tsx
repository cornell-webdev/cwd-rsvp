import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import useIsMobile from 'src/hooks/useIsMobile'
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
    isPrivateRoute: false,
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
    path: '/my-likes',
    component: MyLikes,
    label: 'My likes',
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
    isPrivateRoute: false,
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

  if (!accessToken || accessToken.length === 0) {
    return <Redirect to='/login' />
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
