import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Truck as TruckIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import AddTruckForm from '@/components/AddTruckForm';
import { useToast } from '@/hooks/use-toast';

interface Truck {
  id: string;
  number: string;
  type: string;
  capacity: string;
  driver: string;
  status: 'active' | 'maintenance' | 'idle';
}

const initialTrucks: Truck[] = [
  { id: '1', number: 'TRK-001', type: 'Heavy Duty', capacity: '20 tons', driver: 'John Doe', status: 'active' },
  { id: '2', number: 'TRK-002', type: 'Medium', capacity: '15 tons', driver: 'Jane Smith', status: 'idle' },
  { id: '3', number: 'TRK-003', type: 'Light', capacity: '10 tons', driver: 'Mike Johnson', status: 'maintenance' },
  { id: '4', number: 'TRK-004', type: 'Heavy Duty', capacity: '20 tons', driver: 'Sarah Wilson', status: 'active' },
  { id: '5', number: 'TRK-005', type: 'Medium', capacity: '15 tons', driver: 'Robert Brown', status: 'idle' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-success text-white';
    case 'maintenance': return 'bg-warning text-white';
    case 'idle': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const Trucks = () => {
  const [trucks, setTrucks] = useState<Truck[]>(initialTrucks);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);
  const { toast } = useToast();

  const filteredTrucks = trucks.filter(truck =>
    truck.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    truck.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    truck.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTruck = (truckData: Omit<Truck, 'id'>) => {
    const newTruck: Truck = {
      ...truckData,
      id: Date.now().toString(),
    };
    setTrucks([...trucks, newTruck]);
    setShowAddForm(false);
    toast({
      title: "Success",
      description: "Truck added successfully"
    });
  };

  const handleEditTruck = (truckData: Omit<Truck, 'id'>) => {
    if (editingTruck) {
      setTrucks(trucks.map(truck => 
        truck.id === editingTruck.id 
          ? { ...truckData, id: editingTruck.id }
          : truck
      ));
      setEditingTruck(null);
      toast({
        title: "Success",
        description: "Truck updated successfully"
      });
    }
  };

  const handleDeleteTruck = (id: string) => {
    setTrucks(trucks.filter(truck => truck.id !== id));
    toast({
      title: "Success",
      description: "Truck deleted successfully"
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Trucks Management</h1>
            <p className="text-muted-foreground">Manage your fleet vehicles and assignments</p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-primary hover:glow-primary transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Truck
          </Button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search trucks by number, type, or driver..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trucks Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <TruckIcon className="w-5 h-5 mr-2" />
                Fleet Overview ({filteredTrucks.length} trucks)
              </CardTitle>
              <CardDescription>Complete list of warehouse vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-secondary/50">
                    <TableHead className="text-muted-foreground">Truck Number</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">Capacity</TableHead>
                    <TableHead className="text-muted-foreground">Driver</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredTrucks.map((truck, index) => (
                      <motion.tr
                        key={truck.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-border hover:bg-secondary/50 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-foreground">
                          {truck.number}
                        </TableCell>
                        <TableCell className="text-foreground">{truck.type}</TableCell>
                        <TableCell className="text-foreground">{truck.capacity}</TableCell>
                        <TableCell className="text-foreground">{truck.driver}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(truck.status)}>
                            {truck.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingTruck(truck)}
                              className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTruck(truck.id)}
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

      {/* Add/Edit Truck Modal */}
      <AddTruckForm
        isOpen={showAddForm || !!editingTruck}
        onClose={() => {
          setShowAddForm(false);
          setEditingTruck(null);
        }}
        onSubmit={editingTruck ? handleEditTruck : handleAddTruck}
        truck={editingTruck}
      />
    </Layout>
  );
};

export default Trucks;