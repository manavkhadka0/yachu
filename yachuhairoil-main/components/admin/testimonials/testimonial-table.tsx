"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Star } from "lucide-react";
import { useDeleteTestimonial } from "@/hooks/use-testimonials";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const TestimonialTable = ({ testimonials, onEdit }) => {
  const deleteMutation = useDeleteTestimonial();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = React.useState(null);

  const handleDeleteClick = (id) => {
    setTestimonialToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!testimonialToDelete) return;

    try {
      await deleteMutation.mutateAsync(testimonialToDelete);
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleteDialogOpen(false);
      setTestimonialToDelete(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Before</TableHead>
                <TableHead className="w-20">After</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Title / Role</TableHead>
                <TableHead className="w-24">Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                  >
                    No testimonials found
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <Avatar className="w-12 h-12 border rounded-md">
                        <AvatarImage
                          src={testimonial.before || ""}
                          alt="Before"
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-md">B</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Avatar className="w-12 h-12 border rounded-md">
                        <AvatarImage
                          src={testimonial.after || ""}
                          alt="After"
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-md">A</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-semibold">{testimonial.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      <div>
                        {testimonial.title && <div className="font-medium text-gray-800">{testimonial.title}</div>}
                        {testimonial.role && <div className="text-xs">{testimonial.role}</div>}
                        {testimonial.source && <span className="text-[10px] bg-slate-100 px-1 py-0.5 rounded text-gray-600 block mt-0.5 w-max">{testimonial.source}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      {testimonial.rating ? (
                        <div className="flex items-center gap-0.5 text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < testimonial.rating
                                  ? "fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No Rating</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm">
                      {testimonial.review}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(testimonial)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(testimonial.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this testimonial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
