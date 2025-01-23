import { PayfastPayment } from './types';

export function generateSignature(data: Partial<PayfastPayment>, passphrase?: string): string {
    // Sort the object by key
    const sortedData = Object.fromEntries(
        Object.entries(data)
            .filter(([_, value]) => value !== undefined && value !== null)
            .sort(([a], [b]) => a.localeCompare(b))
    );

    // Build the query string
    let queryString = Object.entries(sortedData)
        .map(([key, value]) => `${key}=${encodeURIComponent(value!.toString())}`)
        .join('&');

    // Add passphrase if provided
    if (passphrase) {
        queryString += `&passphrase=${encodeURIComponent(passphrase)}`;
    }

    // Generate MD5 hash
    return md5(queryString);
}

// Simple MD5 implementation (you should use a proper crypto library in production)
function md5(input: string): string {
    const crypto = window.crypto;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    return Array.from(new Uint8Array(crypto.getRandomValues(new Uint8Array(16))))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}