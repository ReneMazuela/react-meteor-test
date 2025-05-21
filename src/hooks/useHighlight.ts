import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx'; // Include other languages as needed

export const useHighlight = (code: string) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);
};
