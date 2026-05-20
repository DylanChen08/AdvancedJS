var name = 'window'; const obj = { name: 'obj', say() { console.log(this.name); } } 
const fn = obj.say; fn();