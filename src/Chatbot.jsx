import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "./api.js";
import "./Chatbot.css";

const welcomeMessage = {
  role: "assistant",
  content: "Hi! I’m Kilo, made by Futuresort. How can I help you with?",
};

const chatStorageKey = "futuresort-kilo-conversation-v1";

function loadSessionMessages() {
  try {
    const storedMessages = window.sessionStorage.getItem(chatStorageKey);
    if (!storedMessages) return [welcomeMessage];

    const parsedMessages = JSON.parse(storedMessages);
    if (!Array.isArray(parsedMessages)) {
      window.sessionStorage.removeItem(chatStorageKey);
      return [welcomeMessage];
    }

    const restoredMessages = parsedMessages
      .filter(
        (message) =>
          message &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim(),
      )
      .slice(-24)
      .map(({ role, content }) => ({ role, content }));

    return [welcomeMessage, ...restoredMessages];
  } catch (error) {
    console.warn("Could not restore Kilo's tab session.", error);
    return [welcomeMessage];
  }
}

const suggestedQuestions = [
  "What services do you offer?",
  "Show me your projects",
  "How can I contact you?",
];

function RobotAvatar({ className, imageRef }) {
  return (
    <picture ref={imageRef} className={className} aria-hidden="true">
      <source
        media="(prefers-reduced-motion: reduce)"
        srcSet="/kilo-bot.png"
      />
      <img src="/kilo-bot-float.gif" alt="" />
    </picture>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(loadSessionMessages);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const toggleRef = useRef(null);
  const avatarRef = useRef(null);
  const avatarFlightRef = useRef(null);
  const [isAvatarFlying, setIsAvatarFlying] = useState(false);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        chatStorageKey,
        JSON.stringify(
          messages.filter((message) => message !== welcomeMessage),
        ),
      );
    } catch (error) {
      console.warn("Could not save Kilo's tab session.", error);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isAvatarFlying) return undefined;
    const pendingFlight = avatarFlightRef.current;
    if (!pendingFlight) {
      setIsAvatarFlying(false);
      return undefined;
    }

    let frameId;
    let flightImage;
    let animation;

    frameId = window.requestAnimationFrame(() => {
      const target = avatarRef.current;
      if (
        !target ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        avatarFlightRef.current = null;
        setIsAvatarFlying(false);
        return;
      }

      const destination = target.getBoundingClientRect();
      const origin = pendingFlight.rect;
      const deltaX = destination.left - origin.left;
      const deltaY = destination.top - origin.top;
      const scaleX = destination.width / origin.width;
      const scaleY = destination.height / origin.height;
      const middleScaleX = 1 + (scaleX - 1) * 0.52;
      const middleScaleY = 1 + (scaleY - 1) * 0.52;

      flightImage = new Image();
      flightImage.src = pendingFlight.src;
      flightImage.alt = "";
      flightImage.setAttribute("aria-hidden", "true");
      Object.assign(flightImage.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: `${origin.width}px`,
        height: `${origin.height}px`,
        margin: "0",
        zIndex: "10000",
        objectFit: "contain",
        pointerEvents: "none",
        transformOrigin: "top left",
        willChange: "transform, opacity",
      });
      flightImage.className = "kilo-avatar-flight";
      document.body.appendChild(flightImage);
      if (typeof flightImage.animate !== "function") {
        flightImage.remove();
        avatarFlightRef.current = null;
        setIsAvatarFlying(false);
        return;
      }

      const transformAt = (x, y, xScale, yScale) =>
        `translate3d(${x}px, ${y}px, 0) scale(${xScale}, ${yScale})`;
      animation = flightImage.animate(
        [
          {
            offset: 0,
            opacity: 1,
            transform: transformAt(origin.left, origin.top, 1, 1),
          },
          {
            offset: 0.52,
            opacity: 1,
            transform: transformAt(
              origin.left + deltaX * 0.52,
              origin.top + deltaY * 0.52 - 42,
              middleScaleX,
              middleScaleY,
            ),
          },
          {
            offset: 1,
            opacity: 0.15,
            transform: transformAt(
              destination.left,
              destination.top,
              scaleX,
              scaleY,
            ),
          },
        ],
        {
          duration: 820,
          easing: "cubic-bezier(.22,.86,.27,1)",
          fill: "forwards",
        },
      );
      animation.onfinish = () => {
        flightImage?.remove();
        avatarFlightRef.current = null;
        setIsAvatarFlying(false);
      };
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      animation?.cancel();
      flightImage?.remove();
    };
  }, [isAvatarFlying, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  function openChat() {
    const image = toggleRef.current?.querySelector("img");
    if (image) {
      const rect = image.getBoundingClientRect();
      avatarFlightRef.current = {
        rect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },
        src: image.currentSrc || image.src,
      };
      setIsAvatarFlying(true);
    }
    setIsOpen(true);
  }

  function closeChat() {
    setIsOpen(false);
    setIsAvatarFlying(false);
    avatarFlightRef.current = null;
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  }

  function clearChat() {
    setMessages([welcomeMessage]);
    setDraft("");
    setError("");
    try {
      window.sessionStorage.removeItem(chatStorageKey);
    } catch (error) {
      console.warn("Could not clear Kilo's tab session.", error);
    }
  }

  async function submitMessage(text = draft) {
    const content = text.trim();
    if (!content || isSending) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setDraft("");
    setError("");
    setIsSending(true);

    try {
      const reply = await sendChatMessage(
        nextMessages
          .filter((message) => message !== welcomeMessage)
          .slice(-12)
          .map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
      );
      setMessages((current) => [
        ...current,
        { role: "assistant", content: reply },
      ]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitMessage();
  }

  return (
    <div className="kilo-chat">
      {isOpen && (
        <section
          className="kilo-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="kilo-chat-title"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeChat();
          }}
        >
          <header className="kilo-chat-header">
            <RobotAvatar
              className={`kilo-avatar${isAvatarFlying ? " is-flying" : ""}`}
              imageRef={avatarRef}
            />
            <div className="kilo-chat-heading">
              <h2 id="kilo-chat-title">Chat with Kilo</h2>
            </div>
            <button
              className="kilo-new-chat"
              type="button"
              onClick={clearChat}
              disabled={isSending}
              aria-label="Start a new chat"
              title="Start a new chat"
            >
              ↻
            </button>
            <button
              className="kilo-close"
              type="button"
              onClick={closeChat}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="kilo-chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                className={`kilo-message kilo-message-${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.content}
              </div>
            ))}
            {messages.length === 1 && (
              <div
                className="kilo-suggestions"
                aria-label="Suggested questions"
              >
                {suggestedQuestions.map((question) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() => submitMessage(question)}
                    disabled={isSending}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            {isSending && (
              <div
                className="kilo-message kilo-message-assistant kilo-typing"
                role="status"
              >
                Kilo is thinking<span>...</span>
              </div>
            )}
            {error && (
              <p className="kilo-chat-error" role="alert">
                {error}
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="kilo-chat-form" onSubmit={handleSubmit}>
            <label className="kilo-sr-only" htmlFor="kilo-chat-input">
              Message Kilo
            </label>
            <textarea
              id="kilo-chat-input"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submitMessage();
                }
              }}
              placeholder="Ask us anything..."
              maxLength={1800}
              rows={1}
              disabled={isSending}
            />
            <button
              className="kilo-send"
              type="submit"
              disabled={isSending || !draft.trim()}
              aria-label="Send message"
            >
              ↑
            </button>
          </form>
        </section>
      )}

      <button
        ref={toggleRef}
        className={`kilo-chat-toggle${isOpen ? " is-open" : ""}`}
        type="button"
        onClick={openChat}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Kilo chat" : "Chat with Kilo"}
      >
        <RobotAvatar className="kilo-toggle-bot" />
      </button>
    </div>
  );
}
