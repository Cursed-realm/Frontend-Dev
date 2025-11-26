class MovieTicket {
  constructor(name, seatNo, price) {
    this.movieName = name;
    this.seatNo = seatNo;
    this.price = price;
  }
}

class OnlineTicket extends MovieTicket {
  constructor(name, seatNo, price, fee) {
    super(name, seatNo, price);
    this.convenienceFee = fee;
  }

  getTotalAmount() {
    return this.price + this.convenienceFee;
  }
}

// Add method to MovieTicket.prototype
MovieTicket.prototype.printTicket = function () {
  console.log(
    `Ticket: ${this.movieName}, Seat: ${this.seatNo}, Price: $${this.price}`
  );
};

const t1 = new MovieTicket("Avengers", "A10", 12);
const t2 = new OnlineTicket("Avengers", "A11", 12, 2);

t1.printTicket();
t2.printTicket(); // inherited method
console.log("Total amount for online ticket:", t2.getTotalAmount());
