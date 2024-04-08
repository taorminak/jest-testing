class IceCreamTracker {
    constructor() {
      this.consumedIceCreams = [];
    }
  
    // Add a consumed ice cream item with its calorie count
    addConsumedIceCream(flavor, calorieCount) {
      if (calorieCount <= 0 || isNaN(calorieCount)) {
        throw new Error('Invalid calorie count');
      }
      const iceCreamItem = { flavor, calorieCount };
      this.consumedIceCreams.push(iceCreamItem);
    }
  
    // Calculate the total calorie intake from consumed ice cream
    calculateTotalCalories() {
      let totalCalories = 0;
      for (const iceCreamItem of this.consumedIceCreams) {
        totalCalories += iceCreamItem.calorieCount;
      }
      return totalCalories;
    }
  
    // Provide recommendations based on ice cream intake goals
    getRecommendation(goalCalories) {
      const totalCalories = this.calculateTotalCalories();
      const remainingCalories = goalCalories - totalCalories;
      if (remainingCalories > 0) {
        return `You have ${remainingCalories} calories remaining for your ice cream goal.`;
      } else if (remainingCalories === 0) {
        return 'You have reached your ice cream intake goal for the day.';
      } else {
        return `You have exceeded your ice cream intake goal by ${Math.abs(remainingCalories)} calories.`;
      }
    }
  }
  
  module.exports = IceCreamTracker;
  