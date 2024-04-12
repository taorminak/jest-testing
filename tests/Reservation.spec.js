const Reservation = require("../src/Reservation");

describe("Reservation", () => {
  let reservation, reservationStatus;

  beforeEach(() => {
    reservation = new Reservation();
    reservationStatus = reservation.status;
  });

  it("should initialize reservation with pending status", () => {
    const expectedStatus = "pending";

    expect(reservationStatus).toBe(expectedStatus);
  });

  it("should change reservation status to reserved when making reservation", () => {
    reservation.makeReservation();
    reservationStatus = reservation.status;
    expectedStatus = "reserved";

    expect(reservationStatus).toBe(expectedStatus);
  });

  it("should throw an error if reservation already exist", () => {
    reservation.status = "reserved";
    const makeReservation = () => {
      reservation.makeReservation();
    };

    expect(makeReservation).toThrow(
      "Cannot make reservation. Reservation already exists."
    );
  });
});
