import { useState, useCallback, useEffect } from 'react';

export const useVoiceInput = (language = 'hi-IN') => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = language;

            recognitionInstance.onstart = () => setIsListening(true);
            recognitionInstance.onend = () => setIsListening(false);
            recognitionInstance.onerror = (event) => setError(event.error);

            recognitionInstance.onresult = (event) => {
                const currentTranscript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                setTranscript(currentTranscript);
            };

            setRecognition(recognitionInstance);
        } else {
            setError("Speech recognition not supported in this browser.");
        }
    }, [language]);

    const startListening = useCallback(() => {
        if (recognition) {
            setTranscript('');
            setError(null);
            try {
                recognition.start();
            } catch (e) {
                console.error("Recognition already started");
            }
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
        }
    }, [recognition]);

    return { isListening, transcript, error, startListening, stopListening };
};
