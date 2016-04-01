function MyMap() {
    var items = {}; // like set using an object to implement Map/Dictionary
    
    this.contains = x => items.hasOwnProperty(x);
    
    this.add = (key, val) => {
        if (!this.contains(key)){
            items[key] = val;
            return true;
        }
        return false;
    }
    
    this.remove = key => {
        if (this.contains(key)) {
            delete items[key];
            return true;
        }
        return false;
    }
    
    this.clear = () => items = {};
    this.size = () => Object.keys(items).length;
    this.keys = () => Object.keys(items);
    this.get = key => this.contains(key) ? items[key] : undefined;
    this.values = () => {
        var keys = this.keys();
        var res = [];
        keys.forEach(k => res.push(items[k]));
        return res;
    } 
}

var djb2 = function(key) {
    var hash = 5381;
    for (var i = 0; i < key.length; i++) {
        hash = (hash * 33) + key.charCodeAt(i);
    }
    return hash % 1013;
}


// a key value pair that is to be added to the hash table.
function KeyValuePair(key, value) {
    this.Key = key;
    this.Value = value;
    this.toString = () => {
        return key + '-' + value;
    }
}

function HashTable(capacity = 4) {
    var buckets = new Array(capacity);
    
    // use separate chainning to handle collisions
    this.addSC = (key, value) => {
        var hashedKey = djb2(key);
        if (buckets[hashedKey] === undefined) {
            // first time to insert to this index, initilise it to a new single LinkedList
            buckets[hashedKey] = new LinkedList();
        }
        // when colision happens; just add it to the list
        buckets[hashedKey].append(new KeyValuePair(key, value));
    }
    
    // use linear probing to handle collisions
    this.addLP = (key, value) => {
        var hashedKey = djb2(key);
        var currentItem = buckets[hashedKey];
        while (!currentItem) {
            hashedKey++; // keep incrementing the hashed key until there is a space available.
            currentItem = buckets[hashedKey]; 
        }
        buckets[hashedKey] = new KeyValuePair(key, value); 
    }
    
}

console.log(djb2('tiantang sun'));
console.log(djb2('tony sun'));