import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Booking } from '../types/bookings';
import { initPath } from '../utils/init-path';

const BOOKINGS_FILE = join(__dirname, '..', 'data', 'bookings.json');
initPath(BOOKINGS_FILE, '[]');

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

    await writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write booking:', err);
  }
}
