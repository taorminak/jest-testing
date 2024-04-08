// NOTE: In this challenge you can test both the Zoo AND Animal classes. Use separate test classes.

class Zoo {
    constructor() {
      this.animals = [];
    }
  
    addAnimal(animal) {
      this.animals.push(animal);
    }
  
    feedAllAnimals() {
      this.animals.forEach(animal => {
        animal.feed();
      });
    }
  
    checkAnimalHealth() {
      return this.animals.map(animal => animal.checkHealth());
    }
  }
  
  class Animal {
    constructor(name, species) {
      this.name = name;
      this.species = species;
      this.isHungry = true;
      this.health = 100;
    }
  
    feed() {
      this.isHungry = false;
    }
  
    checkHealth() {
      if (this.isHungry) {
        this.health -= 10; // Decrease health if the animal is hungry
      }
      return { name: this.name, species: this.species, health: this.health };
    }
  }
  
  module.exports = { Zoo, Animal };
