import { useState } from 'react'
import Home from './pages/Home'
import ManageAlarms from './pages/ManageAlarms'
import AlarmForm from './pages/AlarmForm'
import ActiveAlarm from './pages/ActiveAlarm'
import BottomNav from './components/BottomNav'
import './styles.css'

export default function App() {
  // Manage application navigation and active alarm state
  const [page, setPage] = useState('home')
  const [activeChallenge, setActiveChallenge] = useState('Math')
  const [editingAlarm, setEditingAlarm] = useState(null)

  // Handle page navigation
  const handleNavigate = (nextPage) => {
    setPage(nextPage)
  }

  return (
    <div className="wake-app">
      <div className="page-content">
        {page === 'home' && (
          <Home
            onAlarmStart={(alarm) => {
              setEditingAlarm(alarm)
              setActiveChallenge(alarm.challenge_type)
              setPage('active-alarm')
            }}
          />
        )}

        {page === 'manage' && (
          <ManageAlarms
            onCreate={() => handleNavigate('create')}
            onEdit={(alarm) => {
              setEditingAlarm(alarm)
              handleNavigate('edit')
            }}
          />
        )}

        {page === 'create' && (
          <AlarmForm
            mode="create"
            onCancel={() => handleNavigate('manage')}
            onSave={() => handleNavigate('manage')}
          />
        )}

        {page === 'edit' && (
          <AlarmForm
            mode="edit"
            alarm={editingAlarm}
            onCancel={() => handleNavigate('manage')}
            onSave={() => handleNavigate('manage')}
          />
        )}

        {page === 'active-alarm' && (
          <ActiveAlarm
            alarm={editingAlarm}
            challengeType={activeChallenge}
            onDismiss={() => setPage('home')}
          />
        )}
      </div>

      {(page === 'home' || page === 'manage') && (
        <BottomNav
          page={page}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  )
}