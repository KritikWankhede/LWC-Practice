import { createElement } from 'lwc';
import TotalVoiceRecognition from 'c/totalVoiceRecognition';

// Mock the SpeechRecognition API
const mockSpeechRecognition = {
    start: jest.fn(),
    stop: jest.fn(),
    onresult: jest.fn(),
    onerror: jest.fn(),
    lang: '',
};

jest.mock('web SPEECHRECognition', () => {
    return {
        webkitSpeechRecognition: jest.fn(() => mockSpeechRecognition)
    };
});

describe('c-total-voice-recognition', () => {
    afterEach(() => {
        // Clean up the DOM after each test
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('should render the component', () => {
        const element = createElement('c-total-voice-recognition', {
            is: TotalVoiceRecognition
        });
        document.body.appendChild(element);
        expect(element).toBeTruthy();
    });

    it('should disable start button when language is not selected', () => {
        const element = createElement('c-total-voice-recognition', {
            is: TotalVoiceRecognition
        });
        document.body.appendChild(element);

        const startButton = element.shadowRoot.querySelector('lightning-button[label="Start"]');
        expect(startButton).toBeTruthy();
        expect(startButton.disabled).toBe(true);
    });

    it('should disable stop button when recording has not started', () => {
        const element = createElement('c-total-voice-recognition', {
            is: TotalVoiceRecognition
        });
        document.body.appendChild(element);

        const stopButton = element.shadowRoot.querySelector('lightning-button[label="Stop"]');
        expect(stopButton).toBeTruthy();
        expect(stopButton.disabled).toBe(true);
    });

    it('should enable start button when language is selected', async () => {
        const element = createElement('c-total-voice-recognition', {
            is: TotalVoiceRecognition
        });
        document.body.appendChild(element);

        // Simulate selecting a language
        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.value = 'en-US'; // English (US)
        combobox.dispatchEvent(new CustomEvent('change'));
        await Promise.resolve();

        const startButton = element.shadowRoot.querySelector('lightning-button[label="Start"]');
        expect(startButton).toBeTruthy();
        expect(startButton.disabled).toBe(false);
    });

    it('should start recording on clicking start button', async () => {
        const element = createElement('c-total-voice-recognition', {
            is: TotalVoiceRecognition
        });
        document.body.appendChild(element);

        // Simulate selecting a language
        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.value = 'en-US'; // English (US)
        combobox.dispatchEvent(new CustomEvent('change'));
        await Promise.resolve();

        // Click the start button
        const startButton = element.shadowRoot.querySelector('lightning-button[label="Start"]');
        startButton.click();
        await Promise.resolve();

        expect(mockSpeechRecognition.start).toHaveBeenCalled();
    });

    it('should stop recording on clicking stop button', async () => {
        const element = createElement('c-total-voice-recognition', {
            is: TotalVoiceRecognition
        });
        document.body.appendChild(element);

        // Simulate selecting a language
        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.value = 'en-US'; // English (US)
        combobox.dispatchEvent(new CustomEvent('change'));
        await Promise.resolve();

        // Click the start button
        const startButton = element.shadowRoot.querySelector('lightning-button[label="Start"]');
        startButton.click();
        await Promise.resolve();

        // Click the stop button
        const stopButton = element.shadowRoot.querySelector('lightning-button[label="Stop"]');
        stopButton.click();
        await Promise.resolve();

        expect(mockSpeechRecognition.stop).toHaveBeenCalled();
    });

    it('should display the transcript', async () => {
        const element = createElement('c-total-voice-recognition', {
            is: TotalVoiceRecognition
        });
        document.body.appendChild(element);

        // Simulate selecting a language
        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.value = 'en-US'; // English (US)
        combobox.dispatchEvent(new CustomEvent('change'));
        await Promise.resolve();

        // Click the start button
        const startButton = element.shadowRoot.querySelector('lightning-button[label="Start"]');
        startButton.click();
        await Promise.resolve();

        // Simulate successful speech-to-text conversion
        mockSpeechRecognition.onresult({
            resultIndex: 0,
            results: [
                [{
                    transcript: 'Hello, world!',
                    confidence: 1
                }]
            ]
        });
        await Promise.resolve();

        // Click the stop button
        const stopButton = element.shadowRoot.querySelector('lightning-button[label="Stop"]');
        stopButton.click();
        await Promise.resolve();

        // Verify the transcript is displayed
        const transcriptElement = element.shadowRoot.querySelector('p');
        expect(transcriptElement).toBeTruthy();
        expect(transcriptElement.textContent).toBe('Hello, world!');
    });

    it('should show error message when speech recognition is not supported', () => {
        const element = createElement('c-total-voice-recognition', {
            is: TotalVoiceRecognition
        });
        document.body.appendChild(element);

        // Verify the error message is displayed
        const errorMessageElement = element.shadowRoot.querySelector('p');
        expect(errorMessageElement).toBeTruthy();
        expect(errorMessageElement.textContent).toBe('Speech Recognition is not supported by your browser');
    });

    // it('should translate the transcript', async () => {
    //     const element = createElement('c-total-voice-recognition', {
    //         is: TotalVoiceRecognition
    //     });
    //     document.body.appendChild(element);
    //
    //     // Simulate selecting a language
    //     const combobox = element.shadowRoot.querySelector('lightning-combobox');
    //     combobox.value = 'fr-FR'; // French (France)
    //     combobox.dispatchEvent(new CustomEvent('change'));
    //     await Promise.resolve();
    //
    //     // Click the start button
    //     const startButton = element.shadowRoot.querySelector('lightning-button[label="Start"]');
    //     startButton.click();
    //     await Promise.resolve();
    //
    //     // Simulate successful speech-to-text conversion
    //     mockSpeechRecognition.onresult({
    //         resultIndex: 0,
    //         results: [
    //             [{
    //                 transcript: 'Hello, world!',
    //                 confidence: 1
    //             }]
    //         ]
    //     });
    //     await Promise.resolve();
    //
    //     // Click the stop button
    //     const stopButton = element.shadowRoot.querySelector('lightning-button[label="Stop"]');
    //     stopButton.click();
    //     await Promise.resolve();
    //
    //     // Verify the transcript is displayed
    //     const transcriptElement = element.shadowRoot.querySelector('p');
    //     expect(transcriptElement).toBeTruthy();
    //     expect(transcriptElement.textContent).toBe('Bonjour, monde!');
    // });
});