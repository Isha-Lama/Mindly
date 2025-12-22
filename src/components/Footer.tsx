export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      {/* Top line above footer */}
      <div className="w-full h-px bg-gray-300"></div>

      <div className="flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="spirax-smaller">
          Mindly
        </div>

        {/* Footer Links */}
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-10 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground whitespace-nowrap">Team Mindly</a></li>
            <li><a href="#" className="hover:text-foreground whitespace-nowrap">Contact</a></li>
            <li><a href="#" className="hover:text-foreground whitespace-nowrap">About</a></li>
            <li><a href="#" className="hover:text-foreground whitespace-nowrap">Terms</a></li>
            <li><a href="#" className="hover:text-foreground whitespace-nowrap">Help</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
