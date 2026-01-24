// FIXED VERSION - Common TypeScript + React Errors Fixed

// ✅ ERROR 1: Unused React import in React 18+
// BEFORE:
// import React from 'react';
// function App() { return <div>Hello</div>; }

// AFTER:
// import { useEffect } from 'react';
// function App() { return <div>Hello</div>; }
// No need to import React anymore!

// ✅ ERROR 2: import.meta.env type error
// BEFORE:
// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// // Error: Property 'env' does not exist

// AFTER (SOLUTION):
// 1. Add to tsconfig.json:
// "types": ["vite/client"]
//
// 2. Use import.meta.env directly - Vite handles typing

// ✅ ERROR 3: Using 'import' as variable name
// BEFORE:
// declare const import: { meta: { env: any } };
// // Error: 'import' is reserved keyword

// AFTER:
// // Just use import.meta.env directly with proper tsconfig

// ✅ ERROR 4: Unused variables
// BEFORE:
// const [error, setError] = useState(null);
// // Error: 'error' is declared but never read

// AFTER:
// Option 1: Remove if not used
// Option 2: Use optional chaining with proper checks
// Option 3: Use _error to indicate intentionally unused: const [_error, setError]

// ✅ ERROR 5: useState type safety
// CORRECT USAGE:
interface User {
  id: string;
  name: string;
}

function MyComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Good error handling:
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && <p>Hello {user.name}</p>}
    </div>
  );
}

// ✅ ERROR 6: useRef with HTMLElement
// CORRECT USAGE:
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);

  return <div ref={ref}>Content</div>;
}

// ✅ ERROR 7: Event handlers with TypeScript
// CORRECT USAGE:
function Form() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  );
}

// ✅ ERROR 8: Component return types
// CORRECT USAGE:
interface Props {
  title: string;
  count?: number;
}

const MyComponent: React.FC<Props> = ({ title, count = 0 }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
    </div>
  );
};

// ✅ ERROR 9: API Response typing
// CORRECT USAGE:
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Project {
  id: string;
  title: string;
}

const fetchProjects = async (): Promise<ApiResponse<Project[]>> => {
  const response = await fetch('/api/projects');
  return response.json();
};

// ✅ ERROR 10: useEffect cleanup
// CORRECT USAGE:
import { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const result = await fetch('/api/data');
      const json = await result.json();
      if (isMounted) {
        setData(json);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to prevent state update on unmounted component
    };
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}

export {};
