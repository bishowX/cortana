export async function Flight({ flightNumber }: { flightNumber: number }) {
  return (
    <div>
      <div>{flightNumber}</div>
      <div>Delayed</div>
      <div>Kathmandu</div>
      <div>Italy</div>
    </div>
  );
}
