import { prisma } from "@/lib/prisma";
import { logout } from "./login/actions";
import { updateAppointmentStatus, addExpense } from "./actions";
import styles from "./admin.module.css";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch data
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });

  const expenses = await prisma.expense.findMany({
    orderBy: { date: "desc" },
  });

  const totalExpenses = expenses.reduce((acc: number, curr) => acc + curr.amount, 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Atelier Admin</div>
        <form action={logout}>
          <button type="submit" className={styles.logoutBtn}>Logout</button>
        </form>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Appointments Section */}
          <section className={styles.section}>
            <h2>Appointments</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Service</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr><td colSpan={5} className={styles.empty}>No appointments yet.</td></tr>
                  ) : appointments.map(app => (
                    <tr key={app.id}>
                      <td>
                        <div className={styles.primaryText}>{app.name}</div>
                        <div className={styles.secondaryText}>{app.email}</div>
                        {app.phone && <div className={styles.secondaryText}>{app.phone}</div>}
                      </td>
                      <td>{app.service}</td>
                      <td>
                        <div className={styles.primaryText}>{app.date}</div>
                        <div className={styles.secondaryText}>{app.time}</div>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[app.status.toLowerCase()]}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <form action={async () => {
                            "use server";
                            await updateAppointmentStatus(app.id, "APPROVED");
                            revalidatePath("/admin");
                          }}>
                            <button className={styles.approveBtn} disabled={app.status === "APPROVED"}>Approve</button>
                          </form>
                          <form action={async () => {
                            "use server";
                            await updateAppointmentStatus(app.id, "DISAPPROVED");
                            revalidatePath("/admin");
                          }}>
                            <button className={styles.rejectBtn} disabled={app.status === "DISAPPROVED"}>Reject</button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Expenses Section */}
          <section className={styles.section}>
            <div className={styles.expenseHeader}>
              <h2>Store Expenses</h2>
              <div className={styles.totalBox}>
                <span>Total Expenditure</span>
                <span className={styles.totalAmount}>${totalExpenses.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.addExpenseCard}>
              <h3>Add New Expense</h3>
              <form action={async (formData) => {
                "use server";
                await addExpense(formData);
              }} className={styles.expenseForm}>
                <input type="text" name="description" placeholder="Description (e.g. Office Supplies)" required />
                <input type="number" name="amount" placeholder="Amount" step="0.01" required />
                <select name="category" required>
                  <option value="">Select Category...</option>
                  <option value="Materials">Materials</option>
                  <option value="Software">Software</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Rent">Rent</option>
                  <option value="Other">Other</option>
                </select>
                <button type="submit" className={styles.addBtn}>Add Expense</button>
              </form>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.length === 0 ? (
                    <tr><td colSpan={4} className={styles.empty}>No expenses recorded.</td></tr>
                  ) : expenses.map(exp => (
                    <tr key={exp.id}>
                      <td>{exp.date.toLocaleDateString()}</td>
                      <td>{exp.description}</td>
                      <td><span className={styles.categoryBadge}>{exp.category}</span></td>
                      <td className={styles.amount}>${exp.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
