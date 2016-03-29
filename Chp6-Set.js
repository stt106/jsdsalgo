function MySet() {
    var items = {}; // use an object to implement set
    
    this.has = x => items.hasOwnProperty(x);
    this.add = x => {
        if (!this.has(x)) {
            // object in JS must have unique property names; so this ensures uniqueness
            items[x] = x; // add a new property to an object
            return true;
        }
        return false;
    }
    
    this.remove = x => {
        if (this.has(x)) {
            delete items[x]; // remove a property from an object
            return true;
        }
        return false;
    }
    
    this.clear = () => items = {};
    
    //Object prototype has a keys function which returns an array of
    //all the properties of a given object instance
    this.size = () => Object.keys(items).length;
    
    this.values = () => Object.keys(items); // keys and values are the same in items object    
    
    this.union = otherSet => {
        var res = new MySet();
        this.values().forEach(x => res.add(x));
        otherSet.values().forEach(x => res.add(x));
        return res;
    }
    
    this.interset = otherSet => {
        var res = new MySet();
        var common = this.values().filter(x => otherSet.has(x));
        common.forEach(x => res.add(x));
        return res;
    }
    
    this.difference = otherSet => {
        var res = new MySet();
        var diff = this.values().filter(x => !otherSet.has(x));
        diff.forEach(x => res.add(x));
        return res;
    }
    
    this.subSet = otherSet => {
        return otherSet.values().every(x => this.has(x));
    }
}

(function test(){
    var s = new MySet();
    var data = [1, 2, 3, 4, 5];
    data.forEach(i => s.add(i));
    console.log(s.values());
    s.remove(4);
    console.log(s.values());
    
    var s2 = new MySet();
    var data2 = [2, 3, 4, 5, 6];
    data2.forEach(i => s2.add(i));
    var union = s.union(s2);
    console.log('union:' + union.values());
    var intersect = s.interset(s2);
    console.log('intersect:' + intersect.values());
    var diff = s.difference(s2);
    console.log('diff:' + diff.values());
})();