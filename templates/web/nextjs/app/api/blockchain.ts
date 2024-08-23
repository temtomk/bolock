import { NextResponse } from "next/server";

const tokenUrl = "http://127.0.0.1:4000/token";

export async function getOwner() {
    const response = await fetch(
        `${tokenUrl}/owner`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.text();
    return data
}

export async function getContractAddress() {
    const response = await fetch(
        `${tokenUrl}/address`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.text();
    return data
}

export async function getBalance() {
    const response = await fetch(
        `${tokenUrl}/balance`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.text();
    return data
}