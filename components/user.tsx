export async function User() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}
