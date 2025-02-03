"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  MoreHorizontal,
  Edit2,
  Eye,
  Search,
  Plus,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTourStore } from "../../../../store/package";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";

// ConfirmationModal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            {message}
          </Dialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// EditTourForm Component
const EditTourForm = ({ tour, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: tour.name,
    description: tour.description,
    price: tour.price,
    duration: tour.duration,
    maxGroupSize: tour.maxGroupSize,
    category: tour.category,
    location: tour.location,
    company: tour.company,
    mainImage: tour.mainImage,
    DescriptionTip: tour.DescriptionTip,
    galleryImages: tour.galleryImages,
    startDate: tour.startDate,
    endDate: tour.endDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Edit Tour
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Package Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Package name"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// TravelPackages Component
export default function TravelPackages() {
  const { id } = useParams();
  const {
    tours,
    loading,
    error,
    fetchTours,
    deleteTour,
    fetchTourById,
    updateTour,
  } = useTourStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState(null);

  // State for search, sort, and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" or "oldest"
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "active", or "inactive"

  useEffect(() => {
    fetchTours(id);
  }, [id, fetchTours]);

  const handleDeleteClick = (tourId) => {
    setSelectedTourId(tourId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTourId) {
      await deleteTour(id, selectedTourId);
      setIsModalOpen(false);
      setSelectedTourId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedTourId(null);
  };

  const handleEditClick = async (tourId) => {
    const tour = await fetchTourById(tourId);
    setCurrentTour(tour);
    setIsEditFormOpen(true);
  };

  const handleSaveEdit = async (updatedData) => {
    await updateTour(id, currentTour._id, updatedData);
    setIsEditFormOpen(false);
    setCurrentTour(null);
    fetchTours(id); // Refresh the list
  };

  const handleCancelEdit = () => {
    setIsEditFormOpen(false);
    setCurrentTour(null);
  };

  // Filter and sort tours based on search, sort, and filter criteria
  const filteredTours = tours
    .filter((tour) => {
      // Filter by tour name (case-insensitive)
      const matchesSearch = tour.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Filter by status
      const matchesStatus =
        statusFilter === "all" || tour.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by date (oldest first or newest first)
      if (sortOrder === "oldest") {
        return new Date(a.startDate) - new Date(b.startDate);
      } else {
        return new Date(b.startDate) - new Date(a.startDate);
      }
    });

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">View All Tours</h1>
        <Link href={`/company/${id}/addpackage/addPackageForm`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Tour
          </Button>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by tour name"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Package name</TableHead>
              <TableHead>Where to</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTours.map((tour, index) => (
              <TableRow key={tour._id || index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {tour.mainImage ? (
                      <div className="h-16 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={tour.mainImage}
                          alt={tour.name || "Tour Image"}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )}
                    <span className="font-medium">
                      {tour.name || "Unnamed Tour"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{tour.location?.nameLocation || "N/A"}</TableCell>
                <TableCell>{tour.category?.categoryname || "N/A"}</TableCell>
                <TableCell>
                  {tour.startDate ? tour.startDate.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell>{tour.duration || "N/A"}</TableCell>
                <TableCell>{tour.price || "N/A"}$</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {tour.status || "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(tour._id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(tour._id)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Tour"
        message="Are you sure you want to delete this tour? This action cannot be undone."
      />

      {/* Edit Form Modal */}
      {isEditFormOpen && currentTour && (
        <EditTourForm
          tour={currentTour}
          onClose={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
