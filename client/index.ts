const apiRoute = "/api/email" as const

export async function sendEmail<T extends object = {}>(body?: T) {
    const response = await fetch(apiRoute, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: body ? JSON.stringify(body): null})
    if (!response.ok) {
        // ... failed to send email
        return false
    }
    return true
}