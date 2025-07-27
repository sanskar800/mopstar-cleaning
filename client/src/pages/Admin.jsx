import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toast } from 'react-toastify';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: EditorState.createEmpty(),
    category: 'Other',
    tags: '',
    mainImage: null,
    galleryImages: []
  });

  const categories = ['Featured', 'Advice', 'Guidelines', 'Tips', 'Other'];

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchBlogs();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/admin/login` : 'http://localhost:4000/api/admin/login';
      const response = await axios.post(apiUrl, loginData);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('adminToken', response.data.token);
        setIsLoggedIn(true);
        toast.success('Login successful!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setShowForm(false);
    setEditingBlog(null);
  };

  const fetchBlogs = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/blogs` : 'http://localhost:4000/api/blogs';
      const response = await axios.get(apiUrl, {
        headers: token ? { token } : {}
      });
      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
        toast.error('Session expired. Please login again.');
      } else {
        console.error('Error fetching blogs:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contentState = formData.content.getCurrentContent();
    if (!contentState.hasText()) {
      toast.error('Content cannot be empty');
      return;
    }

    const contentHtml = draftToHtml(convertToRaw(contentState));
    const formDataToSend = new FormData();

    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', contentHtml);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('tags', JSON.stringify(formData.tags.split(',').map(tag => tag.trim())));

    if (formData.mainImage) {
      formDataToSend.append('mainImage', formData.mainImage);
    }

    Array.from(formData.galleryImages).forEach(file => {
      formDataToSend.append('galleryImages', file);
    });

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      const url = editingBlog
        ? `${baseUrl}/blogs/${editingBlog._id}`
        : `${baseUrl}/blogs`;

      const method = editingBlog ? 'put' : 'post';

      const response = await axios[method](url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: token
        }
      });

      if (response.data.success) {
        toast.success(editingBlog ? 'Blog updated!' : 'Blog created!');
        setShowForm(false);
        setEditingBlog(null);
        setFormData({
          title: '',
          content: EditorState.createEmpty(),
          category: 'Other',
          tags: '',
          mainImage: null,
          galleryImages: []
        });
        fetchBlogs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    const contentBlock = htmlToDraft(blog.content || '');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    setFormData({
      title: blog.title,
      content: editorState,
      category: blog.category,
      tags: blog.tags.join(', '),
      mainImage: null,
      galleryImages: []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
        const response = await axios.delete(`${baseUrl}/blogs/${id}`, {
          headers: { token: token }
        });

        if (response.data.success) {
          toast.success('Blog deleted!');
          fetchBlogs();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-24">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog Management</h1>
              <p className="text-gray-600">Create and manage your cleaning tips and insights</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {showForm ? 'Cancel' : '+ Add Blog'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="border-b border-gray-200 pb-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <p className="text-gray-600 mt-2">
                {editingBlog ? 'Update your blog content' : 'Share your cleaning expertise with readers'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title and Category Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter an engaging title..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Blog Content
                </label>
                <div className="border border-gray-300 rounded-xl overflow-hidden">
                  <Editor
                    editorState={formData.content}
                    onEditorStateChange={(editorState) => setFormData({ ...formData, content: editorState })}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class min-h-[400px] p-6"
                    toolbarClassName="toolbar-class border-b border-gray-200"
                    toolbar={{
                      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'remove', 'history'],
                      inline: { inDropdown: false, options: ['bold', 'italic', 'underline', 'strikethrough'] },
                      blockType: { inDropdown: true, options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'] },
                      fontSize: { options: [10, 12, 14, 18, 24, 36] },
                      fontFamily: { options: ['Arial', 'Times New Roman', 'Verdana'] },
                      list: { inDropdown: false, options: ['unordered', 'ordered', 'indent', 'outdent'] },
                      textAlign: { inDropdown: false, options: ['left', 'center', 'right', 'justify'] },
                      colorPicker: { colors: ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'] },
                      link: { inDropdown: true, options: ['link', 'unlink'], defaultTargetOption: '_blank' },
                      image: { uploadEnabled: false, previewImage: true, inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg' },
                      remove: true,
                      history: { inDropdown: true, options: ['undo', 'redo'] },
                    }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="cleaning, tips, advice, guidelines"
                />
              </div>

              {/* Image Uploads */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Main Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, mainImage: e.target.files[0] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required={!editingBlog}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Gallery Images (max 5)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFormData({ ...formData, galleryImages: e.target.files })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
                >
                  {editingBlog ? 'Update Blog Post' : 'Publish Blog Post'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blogs Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Published Blogs</h3>
            <p className="text-gray-600 mt-1">Manage your existing blog posts</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Blog Post
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map(blog => (
                  <tr key={blog._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <img
                          src={blog.mainImage}
                          alt={blog.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500">{blog.tags.slice(0, 2).join(', ')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

















