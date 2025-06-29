export default function ContestantCard({ data }) {
  const { name, flag, photoUrl, image, votes = 0 } = data;
  const imgSrc = photoUrl || image || "";

  // Add this log to see the URL for each contestant as it renders
  console.log("Rendering image for:", name, "URL:", imgSrc, data);

  const handleVote = (amount) => {
    alert(`Vote for $${amount} coming soon!`);
  };

  return (
    <div
      className="card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        margin: "16px",
        backgroundColor: "#fff",
        textAlign: "center",
        transition: "transform 0.2s",
        ":hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <img
        src={imgSrc}
        alt={name}
        style={{
          width: 200,
          height: 200,
          objectFit: "contain",
          borderRadius: "8px",
          border: "1px solid #eee",
          marginBottom: "12px",
        }}
      />
      <h2
        style={{
          fontSize: "1.5rem",
          margin: "0 0 8px",
          color: "#333",
        }}
      >
        {flag} {name}
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          margin: "8px 0",
        }}
      >
        Votes: {votes}
      </p>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#888",
          margin: "8px 0",
        }}
      >
        $1.00 = 1 Vote
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          margin: "8px 0",
        }}
      >
        <input
          type="number"
          min="1"
          placeholder="Enter votes to buy"
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "150px",
            textAlign: "center",
          }}
          onChange={(e) => {
            const value = e.target.value;
            if (value && parseInt(value) >= 1) {
              // Placeholder for future vote handling logic
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector(
              `input[placeholder="Enter votes to buy"]`
            );
            if (input && input.value && parseInt(input.value) >= 1) {
              handleVote(parseInt(input.value));
            } else {
              alert("Please enter a valid number of votes (minimum 1).");
            }
          }}
          style={{
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s",
            ":hover": {
              backgroundColor: "#ff4c4c",
            },
          }}
        >
          Buy Votes
        </button>
      </div>
    </div>
  );
}
