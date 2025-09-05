export async function worksLoader(){
    const response = await fetch("gallery/?category=gallery")
    const responseData = await response.json()
    const data = await responseData.data
    return data
}