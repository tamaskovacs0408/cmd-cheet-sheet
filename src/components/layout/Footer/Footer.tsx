import "./footer.scss";

export function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__text'>
          &copy; {new Date().getFullYear()} Command Cheat Sheet. Built for
          developers.
        </p>
      </div>
    </footer>
  );
}
