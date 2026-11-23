import { useEffect, useState } from "react";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const [processingUserId, setProcessingUserId] = useState("");
  const [processingAction, setProcessingAction] = useState("");

  // Fetch pending registrations
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login as Super Admin.");
        }

        const response = await fetch(
          "http://localhost:5000/api/superadmin/pending-registrations",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data.users || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  // Approve or Reject registration
  const handleRegistrationAction = async (userId, action) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${action} this registration?`
    );

    if (!confirmed) return;

    try {
      setProcessingUserId(userId);
      setProcessingAction(action);
      setActionError("");
      setActionMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as Super Admin.");
      }

      const response = await fetch(
        `http://localhost:5000/api/superadmin/${userId}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to ${action} registration`);
      }

      // Remove processed user from pending list
      setUsers((previousUsers) =>
        previousUsers.filter((user) => user._id !== userId)
      );

      setActionMessage(
        data.message || `Registration ${action}d successfully`
      );
    } catch (error) {
      setActionError(error.message);
    } finally {
      setProcessingUserId("");
      setProcessingAction("");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-violet-700">
          Loading pending registrations...
        </p>
      </div>
    );
  }

  // Fetch error
  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Super Admin Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage and review new user registrations.
        </p>
      </div>

      {/* Pending Count */}
      <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Pending Registrations
        </p>

        <h2 className="mt-2 text-3xl font-bold text-violet-700">
          {users.length}
        </h2>
      </div>

      {/* Success Message */}
      {actionMessage && (
        <div className="mb-5 rounded-lg bg-green-50 p-4 text-sm text-green-700">
          {actionMessage}
        </div>
      )}

      {/* Action Error */}
      {actionError && (
        <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {actionError}
        </div>
      )}

      {/* Registration List */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          Registration Requests
        </h2>

        {users.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No pending registrations found.
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] text-left">

              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-4 text-sm text-gray-600">Name</th>
                  <th className="p-4 text-sm text-gray-600">Email</th>
                  <th className="p-4 text-sm text-gray-600">
                    Requested Role
                  </th>
                  <th className="p-4 text-sm text-gray-600">Status</th>
                  <th className="p-4 text-sm text-gray-600">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">

                    <td className="p-4 text-sm font-medium text-gray-800">
                      {user.fullName}
                    </td>

                    <td className="p-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    <td className="p-4 text-sm capitalize text-violet-700">
                      {user.requestedRole}
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        {user.status}
                      </span>
                    </td>

                    {/* Approve and Reject */}
                    <td className="p-4">
                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleRegistrationAction(user._id, "approve")
                          }
                          disabled={Boolean(processingUserId)}
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {processingUserId === user._id &&
                          processingAction === "approve"
                            ? "Approving..."
                            : "Approve"}
                        </button>

                        <button
                          onClick={() =>
                            handleRegistrationAction(user._id, "reject")
                          }
                          disabled={Boolean(processingUserId)}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {processingUserId === user._id &&
                          processingAction === "reject"
                            ? "Rejecting..."
                            : "Reject"}
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default SuperAdminDashboard;