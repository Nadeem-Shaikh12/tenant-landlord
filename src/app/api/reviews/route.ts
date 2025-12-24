import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

// Helper to read DB
function readDb() {
    if (!fs.existsSync(dbPath)) {
        return { reviews: [] };
    }
    const fileDetails = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileDetails);
}

// Helper to write DB
function writeDb(data: any) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export async function GET() {
    try {
        const db = readDb();
        const reviews = db.reviews || [];
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, rating, comment, userId } = body;

        if (!name || !rating || !comment || !userId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = readDb();
        if (db.reviews && db.reviews.some((r: any) => r.userId === userId)) {
            return NextResponse.json({ error: 'You have already submitted a review.' }, { status: 409 });
        }

        const newReview = {
            id: uuidv4(),
            userId,
            name,
            rating: Number(rating),
            comment,
            date: new Date().toISOString(),
            verified: false,
        };

        if (!db.reviews) {
            db.reviews = [];
        }

        db.reviews.unshift(newReview); // Add to top
        writeDb(db);

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
    }
}
