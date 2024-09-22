async function fetchCountryRiskScores(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/risk-data?type=countryRiskScores&countryId=${id}`,
  );
  if (!res.ok) throw new Error("Failed to fetch risk scores");
  return res.json();
}
async function fetchCountryData(id: string) {
  const res = await fetch(`http://localhost:3000/api/risk-data?type=countries`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  const countries = await res.json();
  return countries.find((country) => country.id === parseInt(id));
}

export async function CountryRiskProfile({ id }: { id: string }) {
  const country = await fetchCountryData(id);
  const riskScores = await fetchCountryRiskScores(id);

  if (!country) return <div>Country not found</div>;

  return (
    <div>
      <h1>{country.name} Risk Profile</h1>
      <p>Region: {country.region}</p>
      <h2>Risk Scores:</h2>
      <ul>
        {riskScores.map((score) => (
          <li key={score.riskFactorId}>
            Risk Factor ID: {score.riskFactorId}, Score: {score.score}, Year:{" "}
            {score.year}
          </li>
        ))}
      </ul>
    </div>
  );
}
