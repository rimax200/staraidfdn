import { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import { Header } from './components/layout/Header'
import { ScrollManager } from './components/layout/ScrollManager'
import { HomePage } from './pages/HomePage'

const DonatePage = lazy(() =>
  import('./pages/DonatePage').then((module) => ({
    default: module.DonatePage,
  })),
)

function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Outlet />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="donate"
            element={
              <Suspense fallback={null}>
                <DonatePage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
