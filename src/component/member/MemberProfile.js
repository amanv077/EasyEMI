import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Utility functions
const generateUniqueId = () => "_" + Math.random().toString(36).substr(2, 9);

const calculateEMI = (amount, rateOfInterest, duration) => {
  const principal = parseFloat(amount);
  const rate = parseFloat(rateOfInterest) / 12 / 100;
  const numberOfPayments = parseFloat(duration);

  const emi =
    (principal * rate * Math.pow(1 + rate, numberOfPayments)) /
    (Math.pow(1 + rate, numberOfPayments) - 1);
  return emi.toFixed(2);
};

// Popup for adding a new loan
const AddLoanPopup = ({ onClose, onAddLoan }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const handleAddLoan = () => {
    const loanId = generateUniqueId();
    onAddLoan({ loanId, date, amount, duration, interestRate });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Loan</h2>
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Amount (in Rupees)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Duration (in months)</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Rate of Interest (%)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleAddLoan}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Loan
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Popup for converting to EMI
const ConvertToEMIPopup = ({ loan, onConvertToEMI, onClose }) => {
  const [emi, setEmi] = useState(null);

  useEffect(() => {
    if (loan) {
      const calculatedEMI = calculateEMI(
        loan.amount,
        loan.interestRate,
        loan.duration
      );
      setEmi(calculatedEMI);
    }
  }, [loan]);

  const handleConvert = () => {
    onConvertToEMI(loan);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Convert to EMI</h2>
        {loan ? (
          <>
            <p>
              <strong>Loan ID:</strong> {loan.loanId}
            </p>
            <p>
              <strong>Amount:</strong> ₹{loan.amount}
            </p>
            <p>
              <strong>Duration:</strong> {loan.duration} months
            </p>
            <p>
              <strong>Rate of Interest:</strong> {loan.interestRate}%
            </p>
            <p className="mt-4">
              <strong>Monthly EMI:</strong> ₹{emi}
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleConvert}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Convert
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <p>No loan details available.</p>
        )}
      </div>
    </div>
  );
};

const MemberProfile = () => {
  const { uuid } = useParams();
  const [member, setMember] = useState(null);
  const [loans, setLoans] = useState([]);
  const [emis, setEmis] = useState([]);
  const [showAddLoanPopup, setShowAddLoanPopup] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showConvertToEMIPopup, setShowConvertToEMIPopup] = useState(false);

  useEffect(() => {
    // Fetch member from localStorage
    const members = JSON.parse(localStorage.getItem("members")) || [];
    const foundMember = members.find((m) => m.uuid === uuid);
    setMember(foundMember);

    // Fetch loans and emis related to the member
    const allLoans = JSON.parse(localStorage.getItem("loans")) || [];
    const memberLoans = allLoans.filter((loan) => loan.memberId === uuid);
    setLoans(memberLoans);

    const allEmis = JSON.parse(localStorage.getItem("emis")) || [];
    const memberEmis = allEmis.filter((emi) => emi.memberId === uuid);
    setEmis(memberEmis);
  }, [uuid]);

  const handleAddLoan = (newLoan) => {
    const allLoans = JSON.parse(localStorage.getItem("loans")) || [];
    allLoans.push({ ...newLoan, memberId: uuid });
    localStorage.setItem("loans", JSON.stringify(allLoans));
    setLoans(allLoans);
  };

  const handleConvertToEMI = (loan) => {
    setSelectedLoan(loan);
    setShowConvertToEMIPopup(true);
  };

  const handleConvertToEMIAction = (loan) => {
    // Remove loan from the current list and add to EMI list
    const allLoans = JSON.parse(localStorage.getItem("loans")) || [];
    const updatedLoans = allLoans.filter((l) => l.loanId !== loan.loanId);
    localStorage.setItem("loans", JSON.stringify(updatedLoans));
    setLoans(updatedLoans);

    const allEmis = JSON.parse(localStorage.getItem("emis")) || [];
    allEmis.push({
      ...loan,
      emi: calculateEMI(loan.amount, loan.interestRate, loan.duration),
    });
    localStorage.setItem("emis", JSON.stringify(allEmis));
    setEmis(allEmis);
  };

  const handleDeleteLoan = (loanId) => {
    const allLoans = JSON.parse(localStorage.getItem("loans")) || [];
    const updatedLoans = allLoans.filter((loan) => loan.loanId !== loanId);
    localStorage.setItem("loans", JSON.stringify(updatedLoans));
    setLoans(updatedLoans);
  };

  const handleEditLoan = (loanId, updatedLoan) => {
    const allLoans = JSON.parse(localStorage.getItem("loans")) || [];
    const updatedLoans = allLoans.map((loan) =>
      loan.loanId === loanId ? { ...loan, ...updatedLoan } : loan
    );
    localStorage.setItem("loans", JSON.stringify(updatedLoans));
    setLoans(updatedLoans);
  };

  if (!member) {
    return <p>Member not found.</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Member Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold">{member.name}</h2>
        <p>Email: {member.email}</p>
        <p>Phone: {member.number}</p>
        <p>Status: {member.status}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
        {loans.length > 0 ? (
          <ul>
            {loans.map((loan) => (
              <li
                key={loan.loanId}
                className="mb-4 p-4 border border-gray-200 rounded flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Loan ID:</strong> {loan.loanId}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{loan.amount}
                  </p>
                  <p>
                    <strong>Duration:</strong> {loan.duration} months
                  </p>
                  <p>
                    <strong>Rate of Interest:</strong> {loan.interestRate}%
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleConvertToEMI(loan)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Convert to EMI
                  </button>
                  <button
                    onClick={() => handleDeleteLoan(loan.loanId)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No current loans.</p>
        )}
        <button
          onClick={() => setShowAddLoanPopup(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add New Loan
        </button>
        {showAddLoanPopup && (
          <AddLoanPopup
            onClose={() => setShowAddLoanPopup(false)}
            onAddLoan={handleAddLoan}
          />
        )}
        {showConvertToEMIPopup && selectedLoan && (
          <ConvertToEMIPopup
            loan={selectedLoan}
            onConvertToEMI={handleConvertToEMIAction}
            onClose={() => setShowConvertToEMIPopup(false)}
          />
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">EMI Loans</h2>
        {emis.length > 0 ? (
          <ul>
            {emis.map((emi) => (
              <li
                key={emi.loanId}
                className="mb-4 p-4 border border-gray-200 rounded flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Loan ID:</strong> {emi.loanId}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{emi.amount}
                  </p>
                  <p>
                    <strong>Duration:</strong> {emi.duration} months
                  </p>
                  <p>
                    <strong>Rate of Interest:</strong> {emi.interestRate}%
                  </p>
                  <p>
                    <strong>Monthly EMI:</strong> ₹{emi.emi}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleEditLoan(emi.loanId, {
                      ...emi,
                      amount: prompt("New Amount", emi.amount),
                    })
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded ml-4"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No EMI loans.</p>
        )}
      </div>
    </div>
  );
};

export default MemberProfile;
