function bookTicket() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const seats = document.getElementById('seats').value;

  // Validation using RegExp
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const seatsRegex = /^([1-9]|10)$/;

  if (!nameRegex.test(name)) {
    alert('Name should contain alphabets only');
    return;
  }

  if (!emailRegex.test(email)) {
    alert('Enter a valid email');
    return;
  }

  if (!seatsRegex.test(seats)) {
    alert('Seats must be between 1 to 10');
    return;
  }

  // Store booking info
  const booking = {
    name: name,
    email: email,
    seats: seats
  };

  // Display ticket details
  document.getElementById('ticket').innerHTML = `
    <h3>Booking Confirmed!</h3>
    <p>Name: ${booking.name}</p>
    <p>Email: ${booking.email}</p>
    <p>Seats: ${booking.seats}</p>
  `;
}