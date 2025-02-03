"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/categoryStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Edit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const CategoryList = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
  } = useCategoryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryData, setCategoryData] = useState({
    name: "",
    status: "",
  });
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    if (id) {
      fetchCategories(id);
    }
  }, [id]);

  // Handle adding or editing a category
  const handleSaveCategory = async () => {
    if (!id) return;

    try {
      if (currentCategory) {
        // Edit existing category
        await updateCategory(currentCategory._id, {
          categoryname: categoryData.name,
          status: categoryData.status,
          companyId: id,
        });
      } else {
        // Add new category
        await addCategory({
          categoryname: categoryData.name,
          status: categoryData.status,
          companyId: id,
        });
      }
      setModalOpen(false);
      setCurrentCategory(null);
      setCategoryData({ name: "", status: "" });
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // Handle opening the edit modal
  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setCategoryData({
      name: category.categoryname,
      status: category.status,
    });
    setModalOpen(true);
  };

  // Handle opening the delete confirmation dialog
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteAlertOpen(true);
  };

  // Confirm deletion
  const confirmDeleteCategory = async () => {
    if (categoryToDelete && id) {
      try {
        await deleteCategory(categoryToDelete._id, id);
        setDeleteAlertOpen(false);
        setCategoryToDelete(null);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  // Filter categories based on search term
  const filteredCategories = (categories || []).filter((cat) =>
    (cat.categoryname || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="w-full bg-white mt-32 rounded-xl shadow-md">
        <div className="flex justify-between items-center gap-7 p-4">
          <div className="flex items-center gap-5">
            <p>All</p>
            <div className="rounded-3xl flex bg-gray-200 items-center justify-center gap-1 px-3">
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent rounded text-sm border-none focus:outline-none w-full px-2"
                aria-label="Search input"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              onClick={() => {
                setCurrentCategory(null);
                setCategoryData({ name: "", status: "" });
                setModalOpen(true);
              }}
              className="text-blue-400"
            >
              Add Category
            </Button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.categoryname}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : category.status === "Inactive"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(category)}
                      >
                        <Trash className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add/Edit Category Modal */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Category Name"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData({ ...categoryData, name: e.target.value })
              }
            />
            <div>
              <label htmlFor="status" className="block mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={categoryData.status}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, status: e.target.value })
                }
                className="bg-gray-50 border rounded-lg px-2 py-1 w-full"
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveCategory}>
              {currentCategory ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteCategory}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryList;