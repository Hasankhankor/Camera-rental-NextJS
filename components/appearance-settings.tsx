import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useUserStore } from "@/lib/user-store"
import type { UserSettings } from "@/lib/types/settings"

export function AppearanceSettings() {
  const { toast } = useToast()
  const { user, updateSettings } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const { darkMode = false, language = 'en' } = user?.settings || {}

  const handleUpdateSettings = async (updates: Partial<UserSettings>) => {
    setIsLoading(true)
    try {
      const currentSettings = user?.settings || {
        notificationPreferences: {
          emailNotifications: false,
          smsNotifications: false,
          orderUpdates: false,
          maintenanceAlerts: false,
          bookingReminders: false,
        },
        darkMode: false,
        language: 'en'
      }
      await updateSettings({
        ...currentSettings,
        ...updates
      })
      toast({
        title: "Settings updated",
        description: "Your appearance settings have been saved.",
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
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how the app looks and feels.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="darkMode" className="flex flex-col space-y-1">
            <span>Dark Mode</span>
            <span className="text-sm text-muted-foreground">
              Toggle dark mode on or off.
            </span>
          </Label>
          <Switch
            id="darkMode"
            checked={darkMode}
            onCheckedChange={(checked) => handleUpdateSettings({ darkMode: checked })}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            disabled={isLoading}
            value={language}
            onValueChange={(value) => handleUpdateSettings({ language: value })}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
