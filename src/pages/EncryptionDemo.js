import React, { useState } from "react";

const EncryptionDemo = () => {
  const [text, setText] = useState("");
  const [encrypted, setEncrypted] = useState("");

  const handleEncrypt = () => {
    if (!text) return setEncrypted("Enter text first!");
    const encoded = btoa(text);
    setEncrypted(encoded);
  };

  const handleDecrypt = () => {
    if (!encrypted) return setText("Enter encrypted text first!");
    try {
      const decoded = atob(encrypted);
      setText(decoded);
    } catch {
      setText("Invalid encrypted text!");
    }
  };

  return (
    <div className="container py-5">
      <h3 className="text-center text-primary mb-3">Encryption Demo</h3>
      <textarea
        className="form-control mb-3"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="d-flex gap-2">
        <button className="btn btn-success w-50" onClick={handleEncrypt}>
          Encrypt
        </button>
        <button className="btn btn-secondary w-50" onClick={handleDecrypt}>
          Decrypt
        </button>
      </div>
      <p className="mt-3 small text-muted">Encrypted Output:</p>
      <div className="border rounded p-2 bg-light">{encrypted}</div>
    </div>
  );
};

export default EncryptionDemo;
