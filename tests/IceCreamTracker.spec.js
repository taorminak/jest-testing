const IceCreamTracker = require("../src/IceCreamTracker");

describe("Ice Cream Tracker", () => {
  let iceCreamTracker;
  let consumedIceCreams;

  beforeEach(() => {
    iceCreamTracker = new IceCreamTracker();
    consumedIceCreams = iceCreamTracker.consumedIceCreams;
  });

  it("should initialize the empty list of consumed ice creams", () => {
    expect(consumedIceCreams).toHaveLength(0);
  });
});
