import { readFile, writeFile } from 'fs/promises';
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Booking } from '../types/bookings';

const BOOKINGS_FILE = join(__dirname, '..', 'data', 'bookings.json');
try {
  if (!existsSync(BOOKINGS_FILE)) {
    writeFileSync(BOOKINGS_FILE, '[]');
  }
} catch (err) {
  console.error('Failed to create bookings file:', err);
}

export async function getBookings(): Promise<Booking[]> {
  try {
    const data = await readFile(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read bookings:', err);
    return [];
  }
}

export async function addBooking(booking: Booking): Promise<void> {
  try {
    const bookings = await getBookings();
    bookings.push(booking);

    await writeFile(BOOKINGS_FILE, JSON.stringify(bookings), 'utf-8');
  } catch (err) {
    console.error('Failed to write booking:', err);
  }
}
