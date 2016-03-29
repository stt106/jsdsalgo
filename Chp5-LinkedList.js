function LinkedList() {
    
    // helper class to model the node on the list
    var Node = function(data) {
        this.data = data;
        this.next = null; // pointer to the next node
        //this.toString = () => console.log(this.data);
    }   
    // private 
    var head = null;
    var length = 0;
    
    // public
    this.isEmpty = () => length === 0;
    this.size = () => length;
    this.getHead = () => head;
    
    // append a new node to the end
    this.append = node => {
        var n = new Node(node); // create a new node to be added
        if (head === null) {
            head = n;
            length++;
            return;
        }
        var current = head;
        while(current.next) { // find the last node on the list
            current = current.next;
        }
        current.next = n;    
        length++;        
    }
    
    // insert a new node to a specific position
    this.insert = (position, node) => {
        if (position > length || position < 0)
            throw Error('invalid position');

        var n = new Node(node); // create a new node
        var index = 0;
        var currentNode = head; // set the current node to the head 
        if (position === 0) {
            n.next = currentNode;
            head = n;
        }
        else {
            while (index < position-1){ // find where to insert 
                currentNode = currentNode.next;
                index++;
            }
            // update the pointer for the new node and currentNode
            n.next = currentNode.next;
            currentNode.next = n;
        }
        length++; 
    }
    
    // remove a node from the list
    this.removeAt = position => {
        var current = head;
        if (position === 0) {
            head = current.next;
            current = null;
        }
        else {
            var index = 0;
            while (index < position-1) {
                index++;
                current = current.next;
            }
            
            var next = current.next; // get the next node of current node
            var nextNext = next.next; // get the next node of next node
            current.next = nextNext; // set the next node of current to next next node
            next = null; // remove next node so it can be GCed.
        }
        length--;// update the length;
    }
    
    // first index of an node element
    this.indexOf = element => {
        var index = 0;
        var current = head;
        while (current) {
            if (current.data === element)
                return index;
            index++;
            current = current.next;
        }
        return -1;
    }
    
    this.print = () => {
        var n = head;
        var res = '';
        while (n) {
            res += n.data + '-';
            n = n.next;
        }
        console.log(res);
    }
}



(function test() {
    console.log('%%%testing single linked list%%%');
    var list = new LinkedList();
   
    console.log(list.size());
    list.append('head');
    console.log(list.getHead());
    console.log(list.testHead);
    list.print();
    
    list.insert(0, 'newHead');
    list.print();
    
    list.insert(2, 'tail');
    list.print();
    
    list.insert(1, 'randomnode');
    list.print();
    console.log('index of tail:' + list.indexOf('tail'));
    console.log('index of nothing:' + list.indexOf('nothing'));
    console.log('index of head:' + list.indexOf('head'));
    list.removeAt(0);
    list.print();
})();

function DoubleLinkedList() {
    
    // node on double linked list
    function Node(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
    
    var head = null;
    var tail = null; // offers another way of iterating the list
    var length = 0;
    
    this.head = () => head;
    this.size = () => length;
    this.isEmpty = () => length === 0;
    
    // insert a node at any position
    this.insert = (position, data) => {
        if (position < 0 || position > length)
            throw new Error('invalid position');
        
        var node = new Node(data);
        if (position === 0) { // insert to the head
            if (head) { // current list not empty
                var currrentHead = head;
                node.next = currentHead;
                currentHead.prev = node;
                head = node;    
            }
            else { // current list empty
                head = node;
                tail = node;
            }
        }
        else if (position === length) {// insert to the tail
            var currentTail = tail;
            currentTail.next = node;
            node.prev = currentTail;
            tail = node;
        }
        else { // in the middle of the list
            var current = head;
            var index = 0; // could also iterate from the end of list
            while (index < position - 1) {
                current = current.next;
                index++;
            }
            var currentNext = current.next; // next of current node
            current.next = node; // insert the new node to be the next of current node
            node.prev = current; // update the new node prev pointer
            if (currentNext){ // in case previous next node is not null
                currentNext.prev = node; // update previous node of previous next
                node.next = currentNext; // update the next node of the new node
            }
        }
        length++;
    }
    
    this.removeAt = position => {
        var index = 0;
        var current = head;
        while (index < position) {
            index++;
            current = current.next;
        }
        var prev = current.prev;
        var next = current.next;
        if (prev) 
            prev.next = next;
        if (next)
            next.prev = prev;
            
        if (position === 0) {
            head = next; // set the new head if removing current head
        }
        else if (position === length)
             tail = prev; // set the new tail if removing the current tail
        
        length--;
     }
     
     this.print = () => {
         console.log(length);
         var n = head;
         var s = '';
         while (n) {
             s += n.data + '-';
             n = n.next;
         }
         console.log(s);
     }
}

(function test() {
    console.log('\n%%% test double linked list %%%');
    var dl = new DoubleLinkedList();
    dl.insert(0, 'head');
    dl.insert(1, 'tail');
    dl.print();
    
    dl.insert(2, 'middle');
    dl.print();
    
    dl.insert(1, 'random');
    dl.print();
    
    dl.removeAt(2);
    dl.print();
    
    dl.removeAt(0);
    dl.print();
    
    dl.removeAt(1);
    dl.print();
})()

/*
Circula linked list has the tail.next = head;
Double circula linked list has tail.next = head and head.prev = tail
*/