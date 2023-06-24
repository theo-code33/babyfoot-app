export type Props = {
    id?: string
}

export type MessageErrorResend = {
    message: string
    status: "success" | "error"
}