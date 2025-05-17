"use client"

import { ProfileSettings } from "@/components/profile-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { AppearanceSettings } from "@/components/appearance-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useUserStore } from "@/lib/user-store"
import { useEffect } from "react"

export default function SettingsPage() {
  const { init, isLoggedIn } = useUserStore()

  useEffect(() => {
    if (!isLoggedIn) {
      init()
    }
  }, [init, isLoggedIn])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <AppearanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
