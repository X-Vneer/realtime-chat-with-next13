
export const generateChateId = (firstId: string, secondId: string) => {
    const sortedIds = [firstId, secondId].sort()

    return `${sortedIds[0]}--${sortedIds[1]}`

}