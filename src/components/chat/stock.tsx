export async function Stock({ symbol, numOfMonths }) {
  return (
    <div>
      <div>{symbol}</div>

      <div>
        <h1>
          {symbol} data for {numOfMonths} months
        </h1>
      </div>
    </div>
  );
}
