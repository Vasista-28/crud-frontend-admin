import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ManageItems.css';

const ManageItems = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const itemId = params.get('id');

  const [item, setItem] = useState({ name: '', description: '', price: '' });
  const [fetchMode, setFetchMode] = useState(!!itemId);

  useEffect(() => {
    if (fetchMode) {
      fetch(`https://crud-app-bfbpafd8fte0gae8.eastus-01.azurewebsites.net/api/items/${itemId}`)
        .then((response) => response.json())
        .then((data) => setItem(data))
        .catch((error) => console.error('Error fetching item:', error));
    }
  }, [itemId, fetchMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleAdd = () => {
    fetch('https://crud-app-bfbpafd8fte0gae8.eastus-01.azurewebsites.net/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Item added successfully');
        setItem({ name: '', description: '', price: '' });
      })
      .catch((error) => console.error('Error adding item:', error));
  };

  const handleUpdate = () => {
    fetch(`https://crud-app-bfbpafd8fte0gae8.eastus-01.azurewebsites.net/api/items/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => alert('Item updated successfully'))
      .catch((error) => console.error('Error updating item:', error));
  };

  const handleDelete = () => {
    fetch(`https://crud-app-bfbpafd8fte0gae8.eastus-01.azurewebsites.net/api/items/${itemId}`, {
      method: 'DELETE',
    })
      .then(() => {
        alert('Item deleted successfully');
        setFetchMode(false);
        setItem({ name: '', description: '', price: '' });
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  return (
    <div className="manage-container">
      <h1>Manage Item</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={item.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={item.description} onChange={handleInputChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={item.price} onChange={handleInputChange} />
        </div>
        <div className="buttons">
          {!fetchMode && <button type="button" onClick={handleAdd}>Add</button>}
          {fetchMode && <button type="button" onClick={handleUpdate}>Update</button>}
          {fetchMode && <button type="button" onClick={handleDelete}>Delete</button>}
        </div>
      </form>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ManageItems;
