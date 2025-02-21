import { Suspense, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './utils/ErrorBoundary.jsx';
import Loader from './components/Loader/Progress.jsx';
import AppRoutes from './Routes/Routes.jsx';

function App() {

  return (
    <ErrorBoundary>
      <Router basename="/missingpetsbangalore">
            <Suspense fallback={<Loader />}>
              <AppRoutes />
            </Suspense>
          </Router>
    </ErrorBoundary>
  )
}

export default App
