## Description
This is a Node.js project using Express.js to create a RESTful API for managing products. It includes features like filtering, pagination, search, and statistics, with MongoDB integration for data persistence.

## Example Response
```json
{
  "total": 50,
  "page": 1,
  "limit": 5,
  "products": [
    {
      "id": "12345",
      "name": "Smartphone",
      "description": "A high-end smartphone",
      "price": 999,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```
