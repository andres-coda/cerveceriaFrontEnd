const BASE_URL = 'http://localhost:3000/menu'; 

class MenuService {
  async getMenuById(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching menu by ID');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getMenu() {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('Error fetching menu');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getMenuSearch(query) {
    try {
      const response = await fetch(`${BASE_URL}?${new URLSearchParams(query).toString()}`);
      if (!response.ok) {
        throw new Error('Error searching menu');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async createMenu(menuDto) {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuDto),
      });
      if (!response.ok) {
        throw new Error('Error creating menu');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async deleteMenu(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting menu');
      }
    } catch (error) {
      throw error;
    }
  }

  async updateMenuById(id, menuDto) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuDto),
      });
      if (!response.ok) {
        throw new Error('Error updating menu');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

export default new MenuService();