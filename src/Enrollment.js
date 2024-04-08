class Enrollment {
    constructor(course) {
      this.course = course;
      this.status = 'pending';
      this.creditsEarned = 0;
      this.prerequisitesCompleted = false;
    }
  
    // Enroll in the course
    enroll() {
      if (this.status === 'pending' || this.status === 'withdrawn') {
        if (this.prerequisitesCompleted) {
          this.status = 'enrolled';
        } else {
          throw new Error('Cannot enroll. Prerequisites not completed.');
        }
      } else {
        throw new Error('Cannot enroll. Already enrolled or completed.');
      }
    }
  
    // Withdraw from the course
    withdraw() {
      if (this.status === 'enrolled') {
        this.status = 'withdrawn';
      } else {
        throw new Error('Cannot withdraw. Not currently enrolled.');
      }
    }
  
    // Complete the course
    complete() {
      if (this.status === 'enrolled') {
        this.status = 'completed';
        this.creditsEarned = this.course.credits;
      } else {
        throw new Error('Cannot complete. Not currently enrolled.');
      }
    }
  
    // Set prerequisites as completed
    setPrerequisitesCompleted() {
      this.prerequisitesCompleted = true;
    }
  }
  
  class Course {
    constructor(name, credits) {
      this.name = name;
      this.credits = credits;
    }
  }
  
  module.exports = { Enrollment, Course };
  