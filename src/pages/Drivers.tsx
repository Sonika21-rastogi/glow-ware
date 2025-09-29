import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import AddDriverForm from '@/components/AddDriverForm';
import { useToast } from '@/hooks/use-toast';

interface Driver {
  id: string;
  name: string;
  contact: string;
  licenseNo: string;
  experience: string;
}

const initialDrivers: Driver[] = [
  { id: '1', name: 'John Doe', contact: '+1-555-0123', licenseNo: 'DL-12345', experience: '5 years' },
  { id: '2', name: 'Jane Smith', contact: '+1-555-0124', licenseNo: 'DL-12346', experience: '8 years' },
  { id: '3', name: 'Mike Johnson', contact: '+1-555-0125', licenseNo: 'DL-12347', experience: '3 years' },
  { id: '4', name: 'Sarah Wilson', contact: '+1-555-0126', licenseNo: 'DL-12348', experience: '10 years' },
  { id: '5', name: 'Robert Brown', contact: '+1-555-0127', licenseNo: 'DL-12349', experience: '7 years' },
];

const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const { toast } = useToast();

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.licenseNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDriver = (driverData: Omit<Driver, 'id'>) => {
    const newDriver: Driver = {
      ...driverData,
      id: Date.now().toString(),
    };
    setDrivers([...drivers, newDriver]);
    setShowAddForm(false);
    toast({
      title: "Success",
      description: "Driver added successfully"
    });
  };

  const handleEditDriver = (driverData: Omit<Driver, 'id'>) => {
    if (editingDriver) {
      setDrivers(drivers.map(driver => 
        driver.id === editingDriver.id 
          ? { ...driverData, id: editingDriver.id }
          : driver
      ));
      setEditingDriver(null);
      toast({
        title: "Success",
        description: "Driver updated successfully"
      });
    }
  };

  const handleDeleteDriver = (id: string) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
    toast({
      title: "Success",
      description: "Driver deleted successfully"
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Drivers Management</h1>
            <p className="text-muted-foreground">Manage your driver database and assignments</p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-primary hover:glow-primary transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Driver
          </Button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search drivers by name, contact, or license..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Drivers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Driver Database ({filteredDrivers.length} drivers)
              </CardTitle>
              <CardDescription>Complete list of licensed drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-secondary/50">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Contact</TableHead>
                    <TableHead className="text-muted-foreground">License No.</TableHead>
                    <TableHead className="text-muted-foreground">Experience</TableHead>
                    <TableHead className="text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredDrivers.map((driver, index) => (
                      <motion.tr
                        key={driver.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-border hover:bg-secondary/50 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-foreground">
                          {driver.name}
                        </TableCell>
                        <TableCell className="text-foreground">{driver.contact}</TableCell>
                        <TableCell className="text-foreground font-mono">{driver.licenseNo}</TableCell>
                        <TableCell className="text-foreground">{driver.experience}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingDriver(driver)}
                              className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDriver(driver.id)}
                              className="hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add/Edit Driver Modal */}
      <AddDriverForm
        isOpen={showAddForm || !!editingDriver}
        onClose={() => {
          setShowAddForm(false);
          setEditingDriver(null);
        }}
        onSubmit={editingDriver ? handleEditDriver : handleAddDriver}
        driver={editingDriver}
      />
    </Layout>
  );
};

export default Drivers;