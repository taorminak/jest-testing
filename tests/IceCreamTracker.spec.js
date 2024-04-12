const IceCreamTracker = require("../src/IceCreamTracker");

describe("Ice Cream Tracker", () => {
  let iceCreamTracker;
  let consumedIceCreams;

  beforeEach(() => {
    iceCreamTracker = new IceCreamTracker();
    consumedIceCreams = iceCreamTracker.consumedIceCreams;
  });

  describe("Account initialization", () => {
    it("should initialize the empty list of consumed ice creams", () => {
      expect(consumedIceCreams).toHaveLength(0);
    });
  });

  describe("Adding an ice cream with calorie count", () => {
    const addedIceCreams = [
      { flavor: "vanilla", calorieCount: 291 },
      { flavor: "chocolate", calorieCount: 341 },
      { flavor: "pistachio", calorieCount: 252 },
    ];
    it.each(addedIceCreams)(
      "should add a consumed ice cream item with its calorie count",
      (addedIceCream) => {
        const { flavor, calorieCount } = addedIceCream;
        const initialConsumedIceCreamsLength = consumedIceCreams.length;

        iceCreamTracker.addConsumedIceCream(flavor, calorieCount);

        expect(consumedIceCreams).toHaveLength(
          initialConsumedIceCreamsLength + 1
        );
      }
    );

    const iceCreamsWithNegativeCalorieCount = [
      { flavor: "vanilla", calorieCount: 0 },
      { flavor: "chocolate", calorieCount: -250 },
      { flavor: "pistachio", calorieCount: -75764 },
    ];
    it.each(iceCreamsWithNegativeCalorieCount)(
      "should throw a new error if calorie count <= 0",
      (addedIceCream) => {
        const { flavor, calorieCount } = addedIceCream;

        const resultAddIceCream = () => {
          iceCreamTracker.addConsumedIceCream(flavor, calorieCount);
        };

        expect(resultAddIceCream).toThrow("Invalid calorie count");
      }
    );

    const iceCreamsWithInvalidCalorieCount = [
      { flavor: "mango", calorieCount: null },
      { flavor: "strawberry", calorieCount: "two hundred" },
      { flavor: "pistachio", calorieCount: undefined },
    ];
    it.each(iceCreamsWithInvalidCalorieCount)(
      "should throw a new error if calorie count is not a number",
      (addedIceCream) => {
        const { flavor, calorieCount } = addedIceCream;

        const resultAddIceCream = () => {
          iceCreamTracker.addConsumedIceCream(flavor, calorieCount);
        };

        expect(resultAddIceCream).toThrow("Invalid calorie count");
      }
    );
  });

  describe("Calories count", () => {
    const iceCreamsList = [
      { flavor: "cookie dough", calorieCount: 351 },
      { flavor: "toffee", calorieCount: 298 },
      { flavor: "banana", calorieCount: 312 },
    ];
    it("should calculate the total calorie intake from consumed ice cream", () => {
      iceCreamTracker.consumedIceCreams = [...iceCreamsList];
      let totalCalories = 0;

      for (item of iceCreamTracker.consumedIceCreams) {
        totalCalories += item.calorieCount;
      }

      let result = iceCreamTracker.calculateTotalCalories();

      expect(result).toBe(totalCalories);
    });

    const lowGoalCaloriesList = [780, 300, 160];
    it.each(lowGoalCaloriesList)(
      "should provide a message based on ice cream intake goals",
      (goalCalories) => {
        iceCreamTracker.consumedIceCreams = [...iceCreamsList];

        let result = iceCreamTracker.getRecommendation(goalCalories);

        expect(result).toEqual(expect.any(String));
      }
    );

    it.each(lowGoalCaloriesList)(
      "should provide a message about excessive intake of calories",
      (goalCalories) => {
        iceCreamTracker.consumedIceCreams = [...iceCreamsList];

        let result = iceCreamTracker.getRecommendation(goalCalories);

        expect(result).toMatch(/exceeded your ice cream intake goal/);
      }
    );

    const iceCreamParamsList = [
      [{ flavor: "cookie dough", calorieCount: 351 }, 351],
      [{ flavor: "toffee", calorieCount: 298 }, 298],
      [{ flavor: "banana", calorieCount: 312 }, 312],
    ];
    it.each(iceCreamParamsList)(
      "should provide a message about reaching the exact calories",
      (consumedIceCream, goalCalories) => {
        iceCreamTracker.consumedIceCreams.push(consumedIceCream);

        let result = iceCreamTracker.getRecommendation(goalCalories);

        expect(result).toMatch(
          "You have reached your ice cream intake goal for the day."
        );
      }
    );

    const highGoalCaloriesList = [1280, 1500, 1600];
    it.each(highGoalCaloriesList)(
      "should provide a message about remaining calories for the goal",
      (goalCalories) => {
        iceCreamTracker.consumedIceCreams = [...iceCreamsList];

        let result = iceCreamTracker.getRecommendation(goalCalories);

        expect(result).toMatch(/calories remaining for your ice cream goal/);
      }
    );
  });
});
