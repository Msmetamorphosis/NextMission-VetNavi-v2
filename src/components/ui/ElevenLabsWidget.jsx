'use client';

import { useEffect } from 'react';

export default function ElevenLabsWidget() {
  useEffect(() => {
    // Load the ElevenLabs script if it hasn't been loaded yet
    if (!document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="elevenlabs-widget-container">
      <elevenlabs-convai agent-id="agent_01jysdpp5wehx800c3a7jtfwz3"></elevenlabs-convai>
    </div>
  );
}