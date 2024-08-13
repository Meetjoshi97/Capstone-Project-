import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://capstone-project-shop-verse.onrender.com/api/user/all');
      const usersWithRoles = response.data.map(user => ({
        ...user,
        role: user.isAdmin ? 'admin' : 'user'
      }));
      setUsers(usersWithRoles);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateUser = async () => {
    try {
      const { role, ...userData } = newUser;
      await axios.post('https://capstone-project-shop-verse.onrender.com/api/user/create', {
        ...userData,
        isAdmin: role === 'admin'
      });
      toast.success('User created successfully');
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error creating user');
    }
  };

  const handleUpdateUser = async (id, email, role) => {
    try {
      await axios.post('https://capstone-project-shop-verse.onrender.com/api/user/update', {
        id,
        email,
        isAdmin: role === 'admin'
      });
      toast.success('User updated successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Error updating user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://capstone-project-shop-verse.onrender.com/api/user/delete/${id}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  return (
    <div className="p-4 bg-white">
      <h1 className="text-xl font-semibold mb-4">User Management</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 add-user text-white rounded mb-4"
      >
        Add User
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="p-4 text-left">Username</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="p-4">{user.username}</td>
              <td className="p-4">
                <input
                  type="email"
                  defaultValue={user.email}
                  onBlur={(e) => handleUpdateUser(user._id, e.target.value, user.role)}
                  className="p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="p-4">
                <select
                  defaultValue={user.role}
                  onBlur={(e) => handleUpdateUser(user._id, user.email, e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              &times;
            </button>
            <h2 className="text-xl mb-4 " >Add User</h2>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={newUser.username}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newUser.password}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              />
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button
                onClick={handleCreateUser}
                className="p-2 add-user text-white rounded w-full"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default UserManagement;
