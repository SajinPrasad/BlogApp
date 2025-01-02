import React from "react";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";

import FileInput from "../Common/FileInput";
import { createPostService, editPostService } from "../services/blogServices";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Title length must be at least 5 characters."),
  description: Yup.string()
    .required("Please enter the blog description.")
    .min(100, "Description is too short."),
});

const PostForm = ({ onClose, addNewPost, setUpdatedPost, post, isEditing }) => {
  const handleSubmit = async (values) => {
    if (!isEditing) {
      // Image validation when creating a new post
      if (!values.image) {
        toast.error("Please upload an image");
        return;
      }

      // Additional validation for file size and file type
      if (values.image) {
        const file = values.image;
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
          toast.error("Unsupported file type");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          // 5MB size limit
          toast.error("Image size is too large");
          return;
        }
      }

      // Create post if all validations pass
      const createdPost = await createPostService(values);

      if (createdPost) {
        addNewPost(createdPost);
        onClose();
      }
    } else {
      if (!(values.image instanceof File)) {
        delete values.image;
      }
      // No image validation for editing
      const updatedPost = await editPostService(values, post.id);

      if (updatedPost) {
        setUpdatedPost(updatedPost);
        onClose();
      }
    }
  };

  const initialValues = {
    title: post?.title || "",
    description: post?.description || "",
    image: post?.image || null,
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-3/5 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2  text-white p-1 rounded-full 
           transition-colors duration-300"
        >
          <X size={24} color="white" />
        </button>
        <h2
          className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent 
        bg-gradient-to-r from-yellow-400 to-green-600"
        >
          Create New Post
        </h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter the title"
                  className={`w-full px-3 py-2 bg-gray-700 text-white border rounded-md 
                    ${
                      errors.title && touched.title
                        ? "border-red-500"
                        : "border-gray-600 focus:border-yellow-500"
                    } 
                    transition-colors duration-300 focus:outline-none`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  placeholder="Enter the description"
                  className={`w-full px-3 py-2 bg-gray-700 text-white border rounded-md 
                    ${
                      errors.description && touched.description
                        ? "border-red-500"
                        : "border-gray-600 focus:border-yellow-500"
                    } 
                    transition-colors duration-300 focus:outline-none h-32`}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Upload Image
                </label>
                {/* Preview the existing image */}
                {initialValues.image && (
                  <div className="mb-2">
                    <img
                      src={initialValues.image}
                      alt="Current Post"
                      className="w-32 h-32 object-cover rounded"
                    />
                    <p className="text-sm text-gray-400 mt-1">Current Image</p>
                  </div>
                )}
                <Field name="image" id="image" component={FileInput} />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-green-600 
                text-white font-semibold rounded-md hover:from-yellow-600 hover:to-green-700 
                transition-all duration-300 transform hover:scale-105 focus:outline-none 
                focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                {isEditing ? "Update Post" : "Submit Post"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default PostForm;
