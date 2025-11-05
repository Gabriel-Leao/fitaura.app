import { User } from '@/@types/user'
import { CURRENT_USER_KEY, USERS_STORAGE_KEY } from '@/constants/usersKey'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import { createContext, useCallback, useEffect, useState } from 'react'

type UserContextType = {
  users: User[]
  currentUser: User | null
  isLoading: boolean
  register: (userData: Omit<User, 'id'>) => Promise<User>
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  editUser: (id: string, updated: Partial<User>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  getUserById: (id: string) => User | undefined
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const storeUsers = useCallback(async (data: User[]) => {
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data))
  }, [])

  const storeCurrentUser = useCallback(async (user: User | null) => {
    if (user) {
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      await AsyncStorage.removeItem(CURRENT_USER_KEY)
    }
  }, [])

  const loadUsers = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(USERS_STORAGE_KEY)
      setUsers(jsonValue ? JSON.parse(jsonValue) : [])
    } catch (e) {
      console.error('Erro ao carregar usuários:', e)
    }
  }, [])

  const loadCurrentUser = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(CURRENT_USER_KEY)
      setCurrentUser(jsonValue ? JSON.parse(jsonValue) : null)
    } catch (e) {
      console.error('Erro ao carregar usuário atual:', e)
    }
  }, [])

  useEffect(() => {
    const initialize = async () => {
      await loadUsers()
      await loadCurrentUser()
      setIsLoading(false)
    }
    initialize()
  }, [loadUsers, loadCurrentUser])

  useEffect(() => {
    if (!isLoading) storeUsers(users)
  }, [users, storeUsers, isLoading])

  useEffect(() => {
    if (!isLoading) storeCurrentUser(currentUser)
  }, [currentUser, storeCurrentUser, isLoading])

  const register = async (userData: Omit<User, 'id'>) => {
    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    )

    if (alreadyExists) {
      throw new Error('E-mail já está em uso')
    }

    const newUser: User = {
      id: String(Crypto.randomUUID()),
      ...userData,
    }

    setUsers((prev) => [...prev, newUser])
    setCurrentUser(newUser)

    return newUser
  }

  const login = async (email: string, password: string) => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (!user) {
      throw new Error('Email ou senha incorretos')
    }

    setCurrentUser(user)
    return user
  }

  const logout = async () => {
    setCurrentUser(null)
  }

  const editUser = async (id: string, updated: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
    )

    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updated } : null))
    }
  }

  const deleteUser = async (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    if (currentUser?.id === id) setCurrentUser(null)
  }

  const getUserById = (id: string) => users.find((u) => u.id === id)

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        isLoading,
        register,
        login,
        logout,
        editUser,
        deleteUser,
        getUserById,
      }}>
      {children}
    </UserContext.Provider>
  )
}
