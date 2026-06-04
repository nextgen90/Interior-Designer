"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitAppointment(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;

  if (!name || !email || !service || !date || !time) {
    return { success: false, error: "All fields are required" };
  }

  try {
    // Attempt to save to DB
    // Note: If Prisma DB is not set up properly via URL, this might throw.
    // In production, we'd ensure DB URL is strictly checked.
    await prisma.appointment.create({
      data: {
        name,
        email,
        service,
        date,
        time,
      }
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to save appointment", error);
    return { success: false, error: "Failed to submit appointment to database." };
  }
}
