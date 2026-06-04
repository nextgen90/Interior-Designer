"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatus(id: string, status: string) {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update appointment status" };
  }
}

export async function addExpense(formData: FormData) {
  const description = formData.get("description") as string;
  const amountStr = formData.get("amount") as string;
  const category = formData.get("category") as string;

  if (!description || !amountStr || !category) {
    return { success: false, error: "All fields required" };
  }

  const amount = parseFloat(amountStr);

  try {
    await prisma.expense.create({
      data: {
        description,
        amount,
        category,
      }
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add expense" };
  }
}
