import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users');
        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSuspend = async (id, currentStatus) => {
    try {
      const endpoint = currentStatus === 'active' ? 'suspend' : 'reactivate';
      await axios.put(`http://localhost:5000/api/admin/users/${id}/${endpoint}`);
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div style={{ padding: '2rem 0' }}>
        <h1>Admin Dashboard</h1>
        <p>Manage users and content across the platform</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>User Management</h2>
        {loading ? <p>Loading users...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Role</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>{u.name}</td>
                  <td style={{ padding: '1rem' }}>{u.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: u.role === 'admin' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.1)', fontSize: '0.875rem' }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: u.status === 'active' ? 'var(--success)' : 'var(--danger)' }}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {u.role !== 'admin' && (
                      <button 
                        onClick={() => handleSuspend(u._id, u.status)}
                        className={`btn ${u.status === 'active' ? 'btn-danger' : 'btn-secondary'}`}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
