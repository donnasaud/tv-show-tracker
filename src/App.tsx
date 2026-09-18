import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/common/NavBar'
import { DashboardPage } from './pages/DashboardPage'
import { AddShowPage } from './pages/AddShowPage'
import { ShowDetailPage } from './pages/ShowDetailPage'

export function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add" element={<AddShowPage />} />
          <Route path="/shows/:id" element={<ShowDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}
