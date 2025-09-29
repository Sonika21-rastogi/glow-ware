import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  contact: string;
  licenseNo: string;
  experience: string;
}

interface AddDriverFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (driver: Omit<Driver, 'id'>) => void;
  driver?: Driver | null;
}

const AddDriverForm = ({ isOpen, onClose, onSubmit, driver }: AddDriverFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    licenseNo: '',
    experience: '',
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name,
        contact: driver.contact,
        licenseNo: driver.licenseNo,
        experience: driver.experience,
      });
    } else {
      setFormData({
        name: '',
        contact: '',
        licenseNo: '',
        experience: '',
      });
    }
  }, [driver, isOpen]);

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
                {driver ? 'Edit Driver' : 'Add New Driver'}
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
                {driver ? 'Update driver information' : 'Enter details for the new driver'}
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
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="bg-secondary border-border focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-foreground">Contact Number</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="+1-555-0123"
                  required
                  className="bg-secondary border-border focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNo" className="text-foreground">License Number</Label>
                <Input
                  id="licenseNo"
                  value={formData.licenseNo}
                  onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                  placeholder="DL-12345"
                  required
                  className="bg-secondary border-border focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-foreground">Experience</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="5 years"
                  required
                  className="bg-secondary border-border focus:ring-primary"
                />
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
                  {driver ? 'Update Driver' : 'Add Driver'}
                </Button>
              </div>
            </motion.form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AddDriverForm;