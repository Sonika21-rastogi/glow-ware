import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Settings, 
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const sidebarItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Trucks',
    path: '/trucks',
    icon: Truck,
  },
  {
    name: 'Drivers',
    path: '/drivers',
    icon: Users,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-full bg-gradient-card border-r border-border z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden md:block`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">WMS</span>
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-secondary"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-primary text-primary-foreground glow-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`
                }
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}

                {isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute left-full ml-2 px-2 py-1 bg-card rounded-md shadow-lg border border-border text-sm whitespace-nowrap z-50"
                  >
                    {item.name}
                  </motion.div>
                )}

                {isActive && !isCollapsed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-2 w-2 h-2 bg-primary-foreground rounded-full"
                  />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;