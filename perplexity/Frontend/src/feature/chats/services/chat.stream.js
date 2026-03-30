/**
 * Frontend Streaming Service
 * 
 * Handles Server-Sent Events (SSE) for real-time token-by-token streaming
 * from the backend LangChain implementation.
 * 
 * Features:
 * - Real-time token reception (not fake delays)
 * - Proper error handling
 * - Stream cleanup on error
 * - Type-safe event parsing
 */

export const streamMessage = async ({ message, chatId, onChunk, onComplete, onError }) => {
    let reader = null;
    let controller = null;

    try {
        // Create abort controller for stream cleanup
        controller = new AbortController();

        const body = JSON.stringify({
            message,
            chat: chatId
        })
        
        // Fetch SSE stream with streaming enabled
        const response = await fetch('http://localhost:3000/api/chats/message/stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include JWT cookie
            body,
            signal: controller.signal
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Stream failed: ${response.statusText}`);
        }

        // Initialize stream reader for token-by-token processing
        reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullText = '';
        let initialization = null;
        let tokenCount = 0;

        /**
         * Main streaming loop
         * Processes each chunk from the SSE stream
         */
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
                // Handle any remaining data in buffer
                if (buffer.trim().startsWith('data: ')) {
                    try {
                        const data = JSON.parse(buffer.slice(6));
                        handleStreamEvent(data, initialization, { onChunk, onComplete, onError }, fullText);
                    } catch (e) {
                        // Silently ignore buffer parsing errors at end of stream
                    }
                }
                break;
            }

            // Decode chunk and add to buffer
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');

            // Keep incomplete line in buffer for next iteration
            buffer = lines[lines.length - 1];

            // Process complete lines (SSE format: data: {...}\n\n)
            for (let i = 0; i < lines.length - 1; i++) {
                const line = lines[i];
                
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6));
                        handleStreamEvent(
                            data, 
                            initialization, 
                            { onChunk, onComplete, onError }, 
                            fullText
                        );
                        
                        // Track state updates
                        if (data.type === 'init') {
                            initialization = data;
                        } else if (data.type === 'chunk') {
                            fullText += data.content;
                            tokenCount++;
                        }
                    } catch (e) {
                        // Log but don't fail on parsing errors
                        // Continue processing other lines
                    }
                }
            }
        }

    } catch (error) {
        // Ensure reader cleanup
        if (reader) {
            reader.cancel().catch(() => {});
        }
        
        // Abort fetch if still pending
        if (controller) {
            controller.abort();
        }

        // Propagate error to caller
        if (onError) {
            const errorMessage = error.name === 'AbortError' 
                ? 'Stream was cancelled' 
                : error.message || 'Failed to stream message';
            onError(new Error(errorMessage));
        }
    }
}

/**
 * Handles individual SSE events from the stream
 */
function handleStreamEvent(data, initialization, { onChunk, onComplete, onError }, fullText) {
    switch (data.type) {
        case 'init':
            // Initialization event with chat and message metadata
            // No action needed - tracked by caller
            break;

        case 'chunk':
            // Token/chunk received
            // Call immediately for real-time UI updates
            if (onChunk) {
                onChunk({
                    chunk: data.content,
                    fullContent: fullText + data.content, // Include this token
                    messageId: initialization?.messageId,
                    tokenIndex: data.tokenIndex
                });
            }
            break;

        case 'complete':
            // Stream completed successfully
            if (onComplete) {
                onComplete({
                    content: data.content,
                    chat: initialization?.chat,
                    messageId: initialization?.messageId,
                    totalTokens: data.totalTokens,
                    timestamp: data.timestamp
                });
            }
            break;

        case 'error':
            // Error from server
            if (onError) {
                onError(new Error(data.error || 'Unknown streaming error'));
            }
            break;

        default:
            // Unknown event type - ignore
            break;
    }
}
