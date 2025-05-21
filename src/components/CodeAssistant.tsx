import { useState } from 'react';
import { fetchOpenAICode } from '../lib/openai';
import { useHighlight } from '../hooks/useHighlight';

export const CodeAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useHighlight(code);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await fetchOpenAICode(prompt);
      setCode(result.trim());
    } catch (err) {
      setCode('// Error fetching code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <textarea
        className="w-full p-2 border rounded resize-y h-32"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask for some code..."
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'Generating...' : 'Submit'}
      </button>

      {code && (
        <pre className="mt-4 p-4 bg-gray-900 text-white overflow-auto rounded">
          <code className="language-tsx">{code}</code>
        </pre>
      )}
    </div>
  );
};
