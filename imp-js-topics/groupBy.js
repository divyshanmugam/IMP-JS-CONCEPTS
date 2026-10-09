function groupBy(array,key) {
    return array.reduce(acc,item =>{
        acc[item[key]] ? acc[item[key]].push(item) : acc[item[key]] = [item];
        return acc;
    }, {})
}

let arr =[
    {name: 'Alice', age: 25, city: 'New York'},
    {name: 'Bob', age: 30, city: 'Los Angeles'},
    {name: 'Charlie', age: 25, city: 'Chicago'},
    {name: 'David', age: 30, city: 'New York'},
    {name: 'Eve', age: 35, city: 'Los Angeles'}
];
let groupedByAge = groupBy(arr, 'age');