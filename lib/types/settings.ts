export type NotificationPreferences = {
  emailNotifications: boolean
  smsNotifications: boolean
  orderUpdates: boolean
  maintenanceAlerts: boolean
  bookingReminders: boolean
}

export type UserSettings = {
  companyName?: string
  notificationPreferences: NotificationPreferences
  darkMode?: boolean
  language?: string
}

export type UserCredentials = {
  password: string
  passwordResetToken?: string
  passwordResetExpires?: Date
}

export type UserProfileUpdate = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  location?: string
  bio?: string
  avatar?: string
  settings?: Partial<UserSettings>
}
