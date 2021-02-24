export type attachmentType = {
    src: string
}

export type userType = {
    name: string,
    avatar: string,
    role: string,
}

export type answerType = {
    user: userType,
    content: string,
    attachments: attachmentType[],
    likesCount: number,
}

export type commentType = {
    user: userType,
    content: string,
    attachments: attachmentType[],
    answers: answerType[],
    likesCount?: number,
    answersCount?: number,
    sharesCount?: number,
}