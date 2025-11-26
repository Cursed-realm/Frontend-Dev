const user = {
  name: "Alice",
  showName: () => {
    console.log(this.name); 
  }
};
user.showName(); 
const userFixed = {
  name: "Aditya",
  showName: function() {
    console.log(this.name); 
  }
};
userFixed.showName(); 
const userShorthand = {
  name: "Aditya",
  showName() {
    console.log(this.name);
  }
};
userShorthand.showName(); 