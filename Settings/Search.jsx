import React, { useState, useEffect } from "react";
import Header from "../components/Layouts/Header";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:5000/api";

  const fetchUsers = async (searchQuery = "") => {
    setLoading(true);
    setError("");
    
    try {
      const url = searchQuery 
        ? `${API_BASE_URL}/users?search=${encodeURIComponent(searchQuery)}`
        : `${API_BASE_URL}/users`;
        
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        fetchUsers(query);
      } else {
        fetchUsers();
      }
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'TEAM_LEAD':
        return 'primary';
      case 'TEAM_MEMBER':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <div>
      <Header title="Search" />
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ maxWidth: 350 }}
        />
      </div>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!loading && !error && (
        <>
          <Row>
            {users.map(user => (
              <Col md={4} key={user.user_id}>
                <Card className="p-3 shadow-sm mb-3 rounded">
                  <div className="d-flex align-items-center mb-2">
                    {user.profile_picture_url ? (
                      <img 
                        src={user.profile_picture_url} 
                        alt={user.name}
                        className="rounded-circle me-2"
                        style={{ width: 40, height: 40, objectFit: 'cover' }}
                      />
                    ) : (
                      <div 
                        className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                        style={{ 
                          width: 40, 
                          height: 40, 
                          backgroundColor: '#e9ecef',
                          color: '#6c757d'
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h6 className="mb-0">{user.name}</h6>
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </div>
                  <div className="d-flex gap-1">
                    <span className={`badge bg-${getRoleBadgeVariant(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          
          {users.length === 0 && !query && (
            <Alert variant="info">
              No users found. Start typing to search for users.
            </Alert>
          )}
          
          {users.length === 0 && query && (
            <Alert variant="warning">
              No users found matching "{query}".
            </Alert>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
