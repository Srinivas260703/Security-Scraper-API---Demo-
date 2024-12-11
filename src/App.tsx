import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { ModeSelection } from './components/ModeSelection';
import { CLIMode } from './components/CLIMode';
import { Header } from './components/Header';
import { ScrapeForm } from './components/ScrapeForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { scrapeWebsite } from './utils/scraper';
import type { Mode, ScrapeResult } from './types';

const AppContent = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode | null>(null);
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return <Login />;
  }

  if (!mode) {
    return <ModeSelection onModeSelect={setMode} />;
  }

  if (mode === 'CLI') {
    return <CLIMode />;
  }

  const handleScrape = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await scrapeWebsite(url);
      setResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Web Security Analysis Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze websites for security vulnerabilities and threats
          </p>
        </div>

        <ScrapeForm onSubmit={handleScrape} />

        {error && (
          <div className="max-w-2xl mx-auto p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading && <LoadingSpinner />}

        {result && !loading && <ResultsDisplay result={result} />}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;