import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Success",
      description: "Profile settings saved successfully"
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Success",
      description: "Notification preferences updated"
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={user?.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="border-border hover:bg-secondary">
                      Change Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={user?.name}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-foreground">Role</Label>
                    <Input
                      id="role"
                      defaultValue={user?.role}
                      disabled
                      className="bg-muted border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSaveProfile}
                  className="bg-gradient-primary hover:glow-primary transition-all duration-300"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Notifications */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription>Configure notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Browser notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Critical updates only
                    </p>
                  </div>
                  <Switch />
                </div>

                <Button 
                  onClick={handleSaveNotifications}
                  variant="outline" 
                  className="w-full border-border hover:bg-secondary"
                >
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security
                </CardTitle>
                <CardDescription>Manage security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full border-border hover:bg-secondary">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full border-border hover:bg-secondary">
                  Two-Factor Auth
                </Button>
                <Button variant="outline" className="w-full border-border hover:bg-secondary">
                  Active Sessions
                </Button>
              </CardContent>
            </Card>

            {/* Theme */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize the interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Current theme setting
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;