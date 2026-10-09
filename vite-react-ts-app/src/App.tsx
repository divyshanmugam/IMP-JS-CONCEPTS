import {lazy,Suspense } from 'react';
import './App.css';

const Inbox = lazy(() => import('./components/Inbox'));

function App() {

  return (
      <Suspense fallback={<div> Loading...</div>}><Inbox /></Suspense>
  )
}

export default App
