import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface Truck {
  id: string;
  number: string;
  type: string;
  capacity: string;
  driver: string;
  status: 'active' | 'maintenance' | 'idle';
}

interface AddTruckFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (truck: Omit<Truck, 'id'>) => void;
  truck?: Truck | null;
}

const AddTruckForm = ({ isOpen, onClose, onSubmit, truck }: AddTruckFormProps) => {
  const [formData, setFormData] = useState<{
    number: string;
    type: string;
    capacity: string;
    driver: string;
    status: 'active' | 'maintenance' | 'idle';
  }>({
    number: '',
    type: '',
    capacity: '',
    driver: '',
    status: 'idle',
  });

  useEffect(() => {
    if (truck) {
      setFormData({
        number: truck.number,
        type: truck.type,
        capacity: truck.capacity,
        driver: truck.driver,
        status: truck.status,
      });
    } else {
      setFormData({
        number: '',
        type: '',
        capacity: '',
        driver: '',
        status: 'idle',
      });
    }
  }, [truck, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-gradient-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground flex items-center justify-between">
                {truck ? 'Edit Truck' : 'Add New Truck'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-auto p-0 hover:bg-transparent"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription>
                {truck ? 'Update truck information' : 'Enter details for the new truck'}
              </DialogDescription>
            </DialogHeader>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="number" className="text-foreground">Truck Number</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="TRK-001"
                  required
                  className="bg-secondary border-border focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-foreground">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select truck type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="Heavy Duty">Heavy Duty</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Light">Light</SelectItem>
                    <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-foreground">Capacity</Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="20 tons"
                  required
                  className="bg-secondary border-border focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="driver" className="text-foreground">Driver</Label>
                <Input
                  id="driver"
                  value={formData.driver}
                  onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                  placeholder="Driver name"
                  required
                  className="bg-secondary border-border focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-foreground">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => 
                    setFormData({ ...formData, status: value as 'active' | 'maintenance' | 'idle' })
                  }
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-border hover:bg-secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-primary hover:glow-primary transition-all duration-300"
                >
                  {truck ? 'Update Truck' : 'Add Truck'}
                </Button>
              </div>
            </motion.form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AddTruckForm;