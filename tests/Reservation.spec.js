const Reservation = require("../src/Reservation");

describe("Reservation", () => {
  let reservation, reservationStatus;

  beforeEach(() => {
    reservation = new Reservation();
  });

  it("should initialize reservation with pending status", () => {
    const expectedStatus = "pending";

    expect(reservation.status).toBe(expectedStatus);
  });

  it("should change reservation status to reserved when making reservation", () => {
    expectedStatus = "reserved";

    reservation.makeReservation();

    expect(reservation.status).toBe(expectedStatus);
  });

  it("should throw an error if reservation already exist", () => {
    reservation.makeReservation();

    const makeNewReservation = () => {
      reservation.makeReservation();
    };

    expect(makeNewReservation).toThrow(
      "Cannot make reservation. Reservation already exists."
    );
  });

  it("should cancel reservation if the status is pending", () => {
    expectedStatus = "cancelled";

    reservation.cancelReservation();

    expect(reservation.status).toBe(expectedStatus);
  });

  it("should cancel reservation if the status is reserved", () => {
    expectedStatus = "cancelled";
    reservation.makeReservation();

    reservation.cancelReservation();

    expect(reservation.status).toBe(expectedStatus);
  });

  it("should throw error if reservation already canceled", () => {
    reservation.cancelReservation();

    const cancelCanceledReservation = () => {
      reservation.cancelReservation();
    };

    expect(cancelCanceledReservation).toThrow(
      "Cannot cancel reservation. Reservation does not exist or already cancelled."
    );
  });

  it("should change reservation status to checked-in if the status is reserved", () => {
    reservation.makeReservation();
    expectedStatus = "checked-in";

    reservation.checkIn();

    expect(reservation.status).toBe(expectedStatus);
  });

  it("should throw error if reservation status is checked-in", () => {
    reservation.makeReservation();
    reservation.checkIn();

    const checkInAlredayCheckedIn = () => {
      reservation.checkIn();
    };

    expect(checkInAlredayCheckedIn).toThrow(
      "Cannot check in. Reservation not found or already checked in."
    );
  });

  it("should throw error if reservation status is pending", () => {
    const checkInAlredayCheckedIn = () => {
      reservation.checkIn();
    };

    expect(checkInAlredayCheckedIn).toThrow(
      "Cannot check in. Reservation not found or already checked in."
    );
  });
});
