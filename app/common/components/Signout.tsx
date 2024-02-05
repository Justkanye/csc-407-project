"use client";

const Signout = ({ className }: { className?: string }) => {
  const signout = () => {
    fetch("/api/logout");
  };
  return (
    <a onClick={signout} className={className}>
      Sign Out
    </a>
  );
};

export default Signout;
