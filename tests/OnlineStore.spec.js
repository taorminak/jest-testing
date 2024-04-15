const OnlineStore = require("../src/OnlineStore");

describe("Online Store", () => {
  let onlineStore;
  let products, orders;

  beforeEach(() => {
    onlineStore = new OnlineStore();
    products = onlineStore.products;
    orders = onlineStore.orders;
  });

  describe("Online Store initialization", () => {
    it("should initialize with an empty products list", () => {
      expect(products).toHaveLength(0);
    });

    it("should initialize with an empty orders list", () => {
      expect(orders).toHaveLength(0);
    });
  });

  describe("Adding product to a store", () => {
    const addedProducts = [
      { productId: 1, name: "Minecraft", price: 20 },
      { productId: 2, price: 20, name: "Need for Speed" },
      { price: 20, productId: 100, name: "Sims" },
    ];
    it.each(addedProducts)(
      "should add a product %s to the store",
      (addedProduct) => {
        let initialProductsLength = products.length;
        const { productId, name, price } = addedProduct;

        onlineStore.addProduct(productId, name, price);

        expect(products).toHaveLength(initialProductsLength + 1);
      }
    );

    it.each(addedProducts)(
      "should create a product %s with specific properties",
      (addedProduct) => {
        const { productId, name, price } = addedProduct;

        onlineStore.addProduct(productId, name, price);

        expect(products).toContainEqual(addedProduct);
      }
    );

    addedProducts.forEach((addedProduct) => {
      const { productId, name, price } = addedProduct;
      const typeString = "string";
      const typeNumber = "number";

      it(`should have a productId of type number for product: ${name}`, () => {
        expect(typeof productId).toBe(typeNumber);
      });

      it(`should have a name of type string for product: ${name}`, () => {
        expect(typeof name).toBe(typeString);
      });

      it(`should have a price of type number for product: ${name}`, () => {
        expect(typeof price).toBe(typeNumber);
      });
    });
  });

  describe("Retrieving the information about a product", () => {
    const searchedProducts = [
      { productId: 29, name: "Valorian", price: 20.55 },
      { productId: 17, price: 29.99, name: "Theft Auto" },
      { price: 17.89, productId: 190, name: "League of Legends" },
    ];
    it.each(searchedProducts)(
      "should retrieve the information about the product %s",
      (searchedProduct) => {
        products.push(searchedProduct);
        const id = searchedProduct.productId;

        const result = onlineStore.getProduct(id);

        expect(result).toEqual(searchedProduct);
      }
    );

    const productsList = [
      { price: 93.89, productId: 2, name: "Super Mario" },
      { productId: 87, price: 26.69, name: "Call of Duty" },
      { price: 133.89, productId: 40, name: "Fortnite" },
    ];
    it.each(productsList)(
      "should throw a new error if there is no such product in the list",
      (product) => {
        const resultGetProduct = () => {
          onlineStore.getProduct(product.productId);
        };

        expect(resultGetProduct).toThrow("Product not found");
      }
    );
  });

  describe("Processing order", () => {
    const productsList = [
      { productId: 99, name: "Minecraft", price: 70.55 },
      { productId: 87, price: 26.69, name: "Call of Duty" },
      { price: 133.89, productId: 40, name: "Fortnite" },
    ];
    const orderParamsList = [
      [23, 99, 5],
      [32, 87, 2],
      [49, 40, 6],
    ];

    it.each(orderParamsList)(
      "should process an order with orderId: %i, productId: %i, and quantity: %i",
      (orderId, productId, quantity) => {
        const initialOrdersList = orders.length;

        onlineStore.products = [...productsList];
        onlineStore.processOrder(orderId, productId, quantity);

        expect(orders).toHaveLength(initialOrdersList + 1);
      }
    );

    const ordersList = [
      {
        orderId: 1,
        productId: 101,
        productName: "Call of Duty",
        quantity: 2,
        totalPrice: 500,
      },
      {
        orderId: 200,
        productId: 102,
        productName: "Minecraft",
        quantity: 1,
        totalPrice: 1200,
      },
      {
        orderId: 21,
        productId: 103,
        productName: "Super Mario",
        quantity: 3,
        totalPrice: 100,
      },
    ];

    const ordersParamsList = [1, 200, 21];

    it.each(ordersParamsList)(
      "should retrieve the information about the order by id %s",
      (orderParams) => {
        onlineStore.orders = [...ordersList];

        const result = onlineStore.getOrder(orderParams);

        expect(onlineStore.orders).toContain(result);
      }
    );

    it("should throw a new error if there is no such order", () => {
      const absentOrderId = 100;

      onlineStore.orders = [...ordersList];

      const resultGetOrder = () => {
        onlineStore.getOrder(absentOrderId);
      };

      expect(resultGetOrder).toThrow("Order not found");
    });
  });
});
