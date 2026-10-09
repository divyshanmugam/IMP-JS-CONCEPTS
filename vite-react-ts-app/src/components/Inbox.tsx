import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import useFetch from "../useFetch";

type Comment = {
    name: string;
    email: string;
};

export default function Inbox() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, loading, error } = useFetch<Comment[]>("https://jsonplaceholder.typicode.com/comments");

    function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
        return array.reduce<Record<string, T[]>>((acc, item) => {
            const group = String(item[key]);
            acc[group] ? acc[group].push(item) : acc[group] = [item];
            return acc;
        }, {});
    }

    let arr =[
        {name: 'Alice', age: 25, city: 'New York'},
        {name: 'Bob', age: 30, city: 'Los Angeles'},
        {name: 'Charlie', age: 25, city: 'Chicago'},
        {name: 'David', age: 30, city: 'New York'},
        {name: 'Eve', age: 35, city: 'Los Angeles'}
    ];
    let groupedByAge = groupBy(arr, 'age');

  return (
    <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
        <div>
            <h1>Message Inbox</h1>
            <select>
                {Object.entries(groupedByAge).map(([age,details]) => (
                    <optgroup label={`Age: ${age}`} key={age}>
                        { details.map(detail => (
                            <option key={detail.name} value={detail.name}>
                                {detail.name} - {detail.city}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
            {Object.entries(groupedByAge).map(([age, details]) => (
                <div key={age}>
                <h3>{`Age:${age}`}</h3>
                {details.map(detail => (
                    <label key={detail.name}>
                    <input type="radio" name={`age-${age}`} value={detail.name} />
                    {`${detail.name} - ${detail.city}`}
                    </label>
                ))}
                </div>
            ))}

            <input type="text" placeholder="Search" onChange={(e)=> setSearchTerm(e.target.value)} />
            {loading && <p>Loading comments...</p>}
            {error && <p role="alert">Failed to fetch comments: {error.message}</p>}
            <ul style={{listStyleType: 'none'}}>
                {data && data.length > 0 &&
                    data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item =>
                        (<li key={item.email}>{item.name} - {item.email}</li>)
                    )
                }

            </ul>
        </div>
    </ErrorBoundary>
  );
}

