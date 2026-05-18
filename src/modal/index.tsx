import { useState } from "react";
import "./style.css";

interface Props {
  close: () => void;
  submit: (feedback: {
    type: FeedbackType;
    message: string;
  }) => Promise<Response>;
}

type FeedbackType = "BUG" | "PRAISE" | "SUGGESTION" | "GENERAL";

export function Modal({ close, submit }: Props) {
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);

  const feedbackTypes = [
    { value: "BUG" as FeedbackType, label: "Bug" },
    { value: "PRAISE" as FeedbackType, label: "Praise" },
    { value: "SUGGESTION" as FeedbackType, label: "Suggestion" },
  ];

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      await submit({
        type: selectedType || "GENERAL",
        message: message.trim(),
      });

      setSended(true);
      setTimeout(() => {
        close();
      }, 2000);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = (type: { value: FeedbackType }) => {
    if (selectedType === type.value) setSelectedType(null);
    else setSelectedType(type.value);
  };

  return (
    <div className="tb-modal-overlay" onClick={close}>
      {sended ? (
        <div className="tb-modal-sended">
          <div className="tb-modal-sended-icon">✔</div>
          <p className="tb-modal-sended-title">Feedback sended</p>
          <p className="tb-modal-sended-message">
            Thanks for your feedback! Your feedback has been sent successfully.
          </p>
        </div>
      ) : (
        <div
          className="tb-modal"
          role="dialog"
          aria-modal="true"
          aria-hidden="false"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tb-modal-header">
            <h1 className="tb-modal-title">Share your feedback</h1>

            <button className="tb-modal-close-button" onClick={close}>
              🗙
            </button>
          </div>

          <div className="tb-modal-content">
            <div className="tb-modal-linear">
              {feedbackTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleTypeSelect(type)}
                  className={`tb-modal-type-button ${selectedType === type.value ? `selected` : ""}`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <textarea
              className="tb-modal-textarea"
              placeholder="Write your feedback here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="tb-modal-footer">
            <button
              disabled={loading}
              className="tb-modal-submit-button"
              onClick={handleSubmit}
            >
              {loading ? "Sending..." : "Submit Feedback"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
