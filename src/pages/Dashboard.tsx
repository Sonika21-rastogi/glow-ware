import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Users, Activity, Clock } from 'lucide-react';
import Layout from '@/components/Layout';

const stats = [
  {
    title: 'Total Trucks',
    value: '24',
    description: 'Active fleet vehicles',
    icon: Truck,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Total Drivers',
    value: '18',
    description: 'Licensed drivers',
    icon: Users,
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    title: 'On Route',
    value: '12',
    description: 'Trucks currently active',
    icon: Activity,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    title: 'Idle Trucks',
    value: '12',
    description: 'Available for dispatch',
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your warehouse operations.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-gradient-card border-border hover:glow-card transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activities</CardTitle>
              <CardDescription>Latest warehouse operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: 'Truck TRK-001 departed for delivery', time: '2 hours ago', status: 'success' },
                { action: 'Driver John Doe checked in', time: '3 hours ago', status: 'info' },
                { action: 'Truck TRK-015 maintenance completed', time: '5 hours ago', status: 'success' },
                { action: 'New driver license verification pending', time: '1 day ago', status: 'warning' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success' :
                    activity.status === 'info' ? 'bg-info' :
                    activity.status === 'warning' ? 'bg-warning' : 'bg-muted'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Fleet Overview</CardTitle>
              <CardDescription>Current fleet status distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'On Route', value: 50, color: 'bg-success' },
                  { label: 'In Maintenance', value: 20, color: 'bg-warning' },
                  { label: 'Available', value: 30, color: 'bg-primary' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{item.label}</span>
                      <span className="text-muted-foreground">{item.value}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className={`h-2 rounded-full ${item.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;