export default function ContestantCard({ data }) {
  const {
    name,
    flag,
    photoURL,
    image,
    votes = 0,
  } = data;
  const imgSrc = photoURL || image || '';

  const handleVote = (amount) => {
    alert(`Vote for $${amount} coming soon!`);
  };

  return (
    <div className="card">
      <img src={imgSrc} alt={name} style={{ width: 200, height: 200, objectFit: 'cover' }} />
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
