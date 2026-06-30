const LinkedList = require('./linkedList');

const ll = LinkedList.fromvalues(5,2,9,6);

ll.printList();
ll.insertAtIndex(2, 1);
ll.removeAtIndex(2);
ll.printList();