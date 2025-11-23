"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { UserProfile } from '@/lib/api/users'
import { mockData } from '@/lib/mockData'

type User = {
  id: string
  email: string
}

type AuthContextType = {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and auto-login with mock user
    const timer = setTimeout(() => {
      setUser(mockData.currentUser)
      setProfile(mockData.profile)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const signOut = async () => {
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
