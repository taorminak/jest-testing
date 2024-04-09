const OnlineStore = require("../src/OnlineStore");

describe("Online Store", () => {
  let onlineStore;
  let products, orders;

  beforeEach(() => {
    onlineStore = new OnlineStore();
    products = onlineStore.products;
    orders = onlineStore.orders;
  });

  it("should initialize with an empty products list", () => {
    expect(products).toHaveLength(0);
  });

  it("should initialize with an empty orders list", () => {
    expect(orders).toHaveLength(0);
  });

  const addedProducts = [
    { productId: 1, name: "Minecraft", price: 20 },
    { productId: 2, price: 20, name: "Need for Speed" },
    { price: 20, productId: 100, name: "Sims" },
  ];
  it.each(addedProducts)(
    "should add a product to the store",
    (addedProduct) => {
      products.push(addedProduct);

      expect(products).toContain(addedProduct);
    }
  );
});
