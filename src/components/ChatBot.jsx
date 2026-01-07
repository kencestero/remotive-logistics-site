import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm here to help you find the perfect trailer. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1), // Exclude initial greeting
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        throw new Error("No response from API");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble responding. Please refresh and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <button className="chat-bubble" onClick={() => setIsOpen(true)} aria-label="Open chat">
          <i className="fa-solid fa-comments"></i>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-content">
              <i className="fa-solid fa-robot"></i>
              <div>
                <h4>Trailer Expert</h4>
                <span className="chat-status">
                  <span className="status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.role === "user" ? "user" : "assistant"}`}
              >
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message assistant">
                <div className="message-content typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={sendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about trailers, financing, delivery..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chat-send"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
