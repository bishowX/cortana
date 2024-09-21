export const Countries = async (props: {}) => {
  const resp = await fetch(
    "http://localhost:3000/api/risk-data?type=countries",
  );
  const data = await resp.json();

  return (
    <div>
      {data.map((country) => (
        <h1 key={country.code}>{country.name}</h1>
      ))}
    </div>
  );
};
