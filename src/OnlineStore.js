class OnlineStore {
    constructor() {
      this.products = [];
      this.orders = []; 
    }
  
    // Add a product to the store
    addProduct(productId, name, price) {
      const product = { productId, name, price };
      this.products.push(product);
    }
  
    // Retrieve product information
    getProduct(productId) {
      const product = this.products.find(product => product.productId === productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }
  
    // Process an order
    processOrder(orderId, productId, quantity) {
      const product = this.getProduct(productId);
      const order = { orderId, productId, productName: product.name, quantity, totalPrice: product.price * quantity };
      this.orders.push(order);
      return order;
    }
  
    // Retrieve order details
    getOrder(orderId) {
      const order = this.orders.find(order => order.orderId === orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    }
  }
  
  module.exports = OnlineStore;
  