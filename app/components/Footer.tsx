export default function Footer() {
  return (
    <footer className="bg-black  border-t border-red-600 py-6 text-center mt-12">
      <p id="footer-phrase" className="  font-bold">Achame kutinyuu, kutiitab chego.</p>
      <p className="mt-1">Kalenjin © {new Date().getFullYear()}</p>
    </footer>
  );
}