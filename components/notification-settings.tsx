"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useUserStore } from "@/lib/user-store"
import type { UserSettings } from "@/lib/types/settings"

const defaultNotifications = {
  emailNotifications: false,
  smsNotifications: false,
  orderUpdates: false,
  maintenanceAlerts: false,
  bookingReminders: false,
}

export function NotificationSettings() {
  const { toast } = useToast()
  const { user, updateSettings } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const notifications = user?.settings?.notificationPreferences || defaultNotifications

  const handleToggle = async (key: keyof UserSettings['notificationPreferences'], value: boolean) => {
    setIsLoading(true)
    try {
      const currentSettings = user?.settings || {
        notificationPreferences: defaultNotifications,
      }

      await updateSettings({
        ...currentSettings,
        notificationPreferences: {
          ...currentSettings.notificationPreferences,
          [key]: value
        }
      })

      toast({
        title: "Settings updated",
        description: "Your notification settings have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="text-sm text-muted-foreground">
                Receive notifications via email.
              </span>
            </Label>
            <Switch
              id="emailNotifications"
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => handleToggle('emailNotifications', checked)}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="smsNotifications" className="flex flex-col space-y-1">
              <span>SMS Notifications</span>
              <span className="text-sm text-muted-foreground">
                Receive notifications via SMS.
              </span>
            </Label>
            <Switch
              id="smsNotifications"
              checked={notifications.smsNotifications}
              onCheckedChange={(checked) => handleToggle('smsNotifications', checked)}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="orderUpdates" className="flex flex-col space-y-1">
              <span>Order Updates</span>
              <span className="text-sm text-muted-foreground">
                Receive updates about your orders.
              </span>
            </Label>
            <Switch
              id="orderUpdates"
              checked={notifications.orderUpdates}
              onCheckedChange={(checked) => handleToggle('orderUpdates', checked)}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="maintenanceAlerts" className="flex flex-col space-y-1">
              <span>Maintenance Alerts</span>
              <span className="text-sm text-muted-foreground">
                Get alerts about equipment maintenance.
              </span>
            </Label>
            <Switch
              id="maintenanceAlerts"
              checked={notifications.maintenanceAlerts}
              onCheckedChange={(checked) => handleToggle('maintenanceAlerts', checked)}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <Label htmlFor="bookingReminders" className="flex flex-col space-y-1">
              <span>Booking Reminders</span>
              <span className="text-sm text-muted-foreground">
                Get reminders about upcoming bookings.
              </span>
            </Label>
            <Switch
              id="bookingReminders"
              checked={notifications.bookingReminders}
              onCheckedChange={(checked) => handleToggle('bookingReminders', checked)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
