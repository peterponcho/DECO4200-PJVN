export const Member =  (id: number, fullName: String, userName: String, isUser:Boolean , isOnline: Boolean)=>{
    return {
        id: id,
        fullName: fullName,
        userName: userName,
        isUser: isUser,
        isOnline: isOnline,
        displayName: isUser ? 'Me' : userName,
    }
}