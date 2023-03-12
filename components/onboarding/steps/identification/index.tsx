export default function IdentificationStep() {
  return (
    <article>
      <header>
        <h1>Identification Step</h1>
      </header>
      <form action="/api/onboarding" method="POST">
        {/* <label htmlFor="firstName">First name:<span aria-label="required">*</span></label><br />
                <input type="text" id="firstName" name="firstName" required />
                <br />
                <label htmlFor="familyName">Family name:<span aria-label="required">*</span></label><br />
                <input type="text" id="familyName" name="familyName" required /><br /> */}
        <button type="submit">Send</button>
      </form>
    </article>
  );
}
