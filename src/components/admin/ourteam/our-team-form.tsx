"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCreateTeamMember, useUpdateTeamMember } from '@/hooks/use-our-team';
import { TEAM } from '@/types/team';
import { franchise } from '@/constants/constant';

interface OurTeamFormProps {
  editingMember?: TEAM | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const OurTeamForm: React.FC<OurTeamFormProps> = ({
  editingMember,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    order: 1,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const createMutation = useCreateTeamMember();
  const updateMutation = useUpdateTeamMember();

  useEffect(() => {
    if (editingMember) {
      setFormData({
        name: editingMember.name,
        role: editingMember.role,
        order: editingMember.order,
      });
      setPreviewUrl(editingMember.photo || '');
    } else {
      setFormData({ name: '', role: '', order: 1 });
      setPreviewUrl('');
      setSelectedFile(null);
    }
  }, [editingMember]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 0 : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('role', formData.role);
    submitData.append('order', formData.order.toString());
    
    if (franchise) {
      submitData.append('franchise', franchise);
    }
    
    if (selectedFile) {
      submitData.append('photo', selectedFile);
    }

    try {
      if (editingMember) {
        await updateMutation.mutateAsync({
          id: editingMember.id,
          memberData: submitData,
        });
      } else {
        await createMutation.mutateAsync(submitData);
      }
      
      // Reset form
      setFormData({ name: '', role: '', order: 1 });
      setSelectedFile(null);
      setPreviewUrl('');
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              placeholder="Enter role"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleInputChange}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewUrl && (
              <div className="mt-2">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={previewUrl} alt="Preview" />
                  <AvatarFallback>Preview</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Saving...' : editingMember ? 'Update' : 'Add'}
            </Button>
            {editingMember && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};