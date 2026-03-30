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

export const streamMessage = async ({ message, chatId, onChunk, onComplete, onError, onMeta }) => {
    let reader = null;
    let controller = null;

    try {
        // Create abort controller for stream cleanup
        controller = new AbortController();

        const body = JSON.stringify({ message, chat: chatId })

        const response = await fetch('http://localhost:3000/api/chats/message/stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body,
            signal: controller.signal
        })

        if (!response.ok) {
            // Try parsing JSON error if present
            let errText = response.statusText
            try {
                const errJson = await response.json()
                errText = errJson.error || errJson.message || errText
            } catch (e) {}
            throw new Error(errText)
        }

        // Read raw text stream (plain chunked text)
        reader = response.body.getReader()
        const decoder = new TextDecoder()
        let fullText = ''
        let tokenIndex = 0
        let buffer = ''
        let metaParsed = false

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunkText = decoder.decode(value, { stream: true })
            if (!chunkText) continue

            buffer += chunkText

            // If metadata not yet parsed, look for metadata line terminated by a newline
            if (!metaParsed) {
                if (buffer.startsWith('__META__')) {
                    const newlineIdx = buffer.indexOf('\n')
                    if (newlineIdx !== -1) {
                        const metaJson = buffer.slice('__META__'.length, newlineIdx)
                        try {
                            const meta = JSON.parse(metaJson)
                            if (onMeta) {
                                try { onMeta(meta) } catch (e) {}
                            }
                        } catch (e) {
                            // ignore parse errors
                        }
                        // Remove metadata line from buffer and continue processing remainder as first token chunk
                        buffer = buffer.slice(newlineIdx + 1)
                        metaParsed = true
                    } else {
                        // wait for more data to complete metadata line
                        continue
                    }
                } else {
                    // No metadata prefix found; treat buffer as normal content
                    metaParsed = true
                }
            }

            // Remaining buffer is actual token content
            if (buffer.length > 0) {
                tokenIndex++
                fullText += buffer
                if (onChunk) {
                    try { onChunk({ chunk: buffer, fullContent: fullText, messageId: null, tokenIndex }) } catch (e) {}
                }
                buffer = ''
            }
        }

        // Stream completed
        if (onComplete) {
            try { onComplete({ content: fullText, chat: null, messageId: null, totalTokens: tokenIndex }) } catch (e) {}
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
