function Stack(data){
    var data = data ? data : [];
    
    this.isEmpty = data.length === 0;
    this.push = x => data.push(x);
    this.pop = x => data.pop();
    this.peek = () => data[data.length - 1]; 
    this.size = () => data.length;
    this.clear = () => data = [];
    // helper method to print out all element in the stack
    this.print = () => console.log(data.toString());
}


function toBinary(n) {
    var stack = new Stack();
    while (n > 0) {
        stack.push(n & 1);
        n = n >> 1;
    }
    return stack;
}

var r = toBinary(15);
r.print();