"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

import { Edit, Trash } from "lucide-react";
import { useLocationStore } from "../../../../store/locationStore";

const LocationList = () => {
  const {
    locations,
    fetchLocations,
    addLocation,
    updateLocation,
    deleteLocation,
  } = useLocationStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [locationData, setLocationData] = useState({
    nameLocation: "",
    status: "Active",
  });
  const [editingLocationId, setEditingLocationId] = useState(null);
  const [deletingLocationId, setDeletingLocationId] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleAddLocation = async () => {
    if (!locationData.nameLocation || !locationData.status) {
      alert("Please fill all fields");
      return;
    }
    await addLocation(locationData);
    setAddModalOpen(false);
    setLocationData({ nameLocation: "", status: "Active" });
  };

  const handleEditLocation = async () => {
    if (!locationData.nameLocation || !locationData.status) {
      alert("Please fill all fields");
      return;
    }
    await updateLocation({ ...locationData, id: editingLocationId });
    setEditModalOpen(false);
    setEditingLocationId(null);
    setLocationData({ nameLocation: "", status: "Active" });
  };

  const handleDeleteLocation = async () => {
    await deleteLocation(deletingLocationId);
    setDeleteAlertOpen(false);
    setDeletingLocationId(null);
  };

  const filteredLocations = locations.filter((location) =>
    (location.nameLocation || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="w-full bg-white mt-32 rounded-xl shadow-md p-4">
        {/* Search and Add Location */}
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search Locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3"
          />
          <Button
            onClick={() => setAddModalOpen(true)}
            className="bg-blue-500 text-white"
          >
            Add Location
          </Button>
        </div>

        {/* Locations Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLocations.map((location, index) => (
              <TableRow key={location._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{location.nameLocation}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      location.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {location.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setLocationData(location);
                        setEditingLocationId(location._id);
                        setEditModalOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setDeletingLocationId(location._id);
                        setDeleteAlertOpen(true);
                      }}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Add Location Modal */}
        {isAddModalOpen && (
          <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Location</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Location Name"
                  value={locationData.nameLocation}
                  onChange={(e) =>
                    setLocationData({
                      ...locationData,
                      nameLocation: e.target.value,
                    })
                  }
                />
                <div>
                  <label htmlFor="status" className="block mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={locationData.status}
                    onChange={(e) =>
                      setLocationData({
                        ...locationData,
                        status: e.target.value,
                      })
                    }
                    className="bg-gray-50 border rounded-lg px-2 py-1 w-full"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddLocation}>Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Location Modal */}
        {isEditModalOpen && (
          <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Location</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Location Name Input */}
                <Input
                  placeholder="Location Name"
                  value={locationData.nameLocation}
                  onChange={(e) =>
                    setLocationData({
                      ...locationData,
                      nameLocation: e.target.value,
                    })
                  }
                />
                {/* Status Dropdown */}
                <div>
                  <label htmlFor="status" className="block mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={locationData.status}
                    onChange={(e) =>
                      setLocationData({
                        ...locationData,
                        status: e.target.value,
                      })
                    }
                    className="bg-gray-50 border rounded-lg px-2 py-1 w-full"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                {/* Save Button */}
                <Button
                  onClick={async () => {
                    await handleEditLocation();
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Alert */}
        {isDeleteAlertOpen && (
          <AlertDialog
            open={isDeleteAlertOpen}
            onOpenChange={setDeleteAlertOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this location? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteAlertOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteLocation}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default LocationList;
