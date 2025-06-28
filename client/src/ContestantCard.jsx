export default function ContestantCard({ data }) {
  const { name, flag, photoURL, votes = 0 } = data;

  const handleVote = (amount) => {
    alert(`Vote for $${amount} coming soon!`);
  };

  return (
    <div className="card">
      <img src={photoURL} alt={name} />
      <h2>{flag} {name}</h2>
      <p>Votes: {votes}</p>
      {[1, 5, 10, 20].map(amount => (
        <button key={amount} onClick={() => handleVote(amount)}>
          Vote ${amount}
        </button>
      ))}
    </div>
  );
}