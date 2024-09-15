import React from "react";
import { useNavigate } from "react-router-dom";

// Shared Tailwind class strings
const linkClasses =
  "block py-2 px-4 rounded-lg hover:bg-secondary/80 transition duration-300";
const inputClasses =
  "bg-input text-foreground px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300";
const cardClasses =
  "bg-card text-card-foreground p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105";

// Sidebar Component
const Sidebar = () => (
  <aside className="w-64 bg-secondary text-secondary-foreground p-4 hidden md:block">
    <nav className="space-y-4">
      <a href="/" className={linkClasses}>
        Dashboard
      </a>
      {/* <a href="#" className={linkClasses}>
        Members
      </a>
      <a href="#" className={linkClasses}>
        Loans
      </a>
      <a href="#" className={linkClasses}>
        Settings
      </a> */}
    </nav>
  </aside>
);

// Header Component
const Header = () => {
  const navigate = useNavigate();

  const handleAddNewMember = () => navigate("/newmember");

  return (
    <header className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0">
      <h1 className="text-3xl font-bold text-primary">Member Dashboard</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search members..."
          className={inputClasses}
        />
        <select className={inputClasses}>
          <option value="">Filter by status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          className="bg-accent text-accent-foreground hover:bg-accent/80 px-6 py-3 rounded-lg shadow-lg transition duration-300"
          onClick={handleAddNewMember}
        >
          Add New Member
        </button>
      </div>
    </header>
  );
};

// MemberCard Component
const MemberCard = ({ name, loans, emi }) => (
  <div className={cardClasses}>
    <h2 className="text-2xl font-semibold mb-2 text-secondary">{name}</h2>
    <p className="text-muted-foreground">
      Active Loans: <span className="font-bold text-primary">{loans}</span>
    </p>
    <p className="text-muted-foreground">
      EMI: <span className="font-bold text-primary">${emi}/month</span>
    </p>
  </div>
);

// MainContent Component
const MainContent = () => (
  <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <MemberCard name="John Doe" loans="3" emi="150" />
    <MemberCard name="Jane Smith" loans="2" emi="200" />
    <MemberCard name="Alice Johnson" loans="1" emi="100" />
  </main>
);

// Dashboard Component
const Dashboard = () => (
  <div className="min-h-screen bg-background text-foreground flex">
    <Sidebar />
    <div className="flex-1 p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        <MainContent />
      </div>
    </div>
  </div>
);

export default Dashboard;
