import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Shared Tailwind class strings
const inputClasses =
  "bg-input text-foreground px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300";
const cardClasses =
  "bg-card text-card-foreground p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105";

// Header Component
const Header = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  const navigate = useNavigate();

  const handleAddNewMember = () => navigate("/newmember");

  return (
    <header className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0">
      <h1 className="text-3xl font-bold text-primary">Member Dashboard</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={inputClasses}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={inputClasses}
        >
          <option value="">Filter by status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
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

const MemberCard = ({ uuid, name, email, number, status, onClick }) => (
  <div
    className={cardClasses}
    onClick={onClick} // Add onClick handler
  >
    <h2 className="text-2xl font-semibold mb-2 text-secondary">{name}</h2>
    <p className="text-muted-foreground">Email: {email}</p>
    <p className="text-muted-foreground">Phone: {number}</p>
    <p className="text-muted-foreground">Status: {status}</p>
  </div>
);
const MainContent = ({ members }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCardClick = (uuid) => {
    navigate(`/memberprofile/${uuid}`); // Navigate using uuid
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.length > 0 ? (
        members.map((member) => (
          <MemberCard
            key={member.uuid} // Use uuid as key
            uuid={member.uuid}
            name={member.name}
            email={member.email}
            number={member.number}
            status={member.status}
            onClick={() => handleCardClick(member.uuid)} // Pass uuid
          />
        ))
      ) : (
        <p>No members available.</p>
      )}
    </main>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    // Fetch members from localStorage
    const storedMembers = JSON.parse(localStorage.getItem("members")) || [];
    setMembers(storedMembers);
  }, []);

  // Filter members based on search query and status
  const filteredMembers = members.filter((member) => {
    const matchesName = member.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? member.status === statusFilter : true;
    return matchesName && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <MainContent members={filteredMembers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
