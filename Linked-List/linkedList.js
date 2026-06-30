class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    insertAtHead(data) {
        const newNode = new Node(data,this.head);
        this.head = newNode;
        this.length++;
    }

    getByIndex(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    insertAtIndex(index, data) {
        if(index === 0) insertAtHead(data);
        if(index < 0 || index > this.length) {
            return null;
        }
        let previous = this.getByIndex(index - 1);
        const newNode = new Node(data, previous.next);
        previous.next = newNode;
        this.length++;
    }
    removeHead() {
        if (!this.head) {
            return null;
        }
        this.head = this.head.next;
        this.length--;
    }
    removeAtIndex(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        if (index === 0) {
            this.removeHead();
            return;
        }
        let previous = this.getByIndex(index - 1);
        previous.next = previous.next.next;
        this.length--;
    }
    printList() {
        let current = this.head;
        let output = '';
        while (current) {
            output += current.value + ' -> ';
            current = current.next;
        }
        console.log(output + 'null');
    }
}

class Node {
    constructor(value,next) {
        this.value = value;
        this.next = next;
    }
}

LinkedList.fromvalues = function(...values) {
    const ll = new LinkedList();
    for (let i = values.length - 1; i >= 0; i--) {
        ll.insertAtHead(values[i]);
    }
    return ll;
}

module.exports = LinkedList;