class Reservation {
    constructor() {
      this.status = 'pending';
    }
  
    // Make a reservation
    makeReservation() {
      if (this.status === 'pending') {
        this.status = 'reserved';
      } else {
        throw new Error('Cannot make reservation. Reservation already exists.');
      }
    }
  
    // Cancel a reservation
    cancelReservation() {
      if (this.status === 'reserved' || this.status === 'pending') {
        this.status = 'cancelled';
      } else {
        throw new Error('Cannot cancel reservation. Reservation does not exist or already cancelled.');
      }
    }
  
    // Check in to the reservation
    checkIn() {
      if (this.status === 'reserved') {
        this.status = 'checked-in';
      } else {
        throw new Error('Cannot check in. Reservation not found or already checked in.');
      }
    }
  }
  
  module.exports = Reservation;
  