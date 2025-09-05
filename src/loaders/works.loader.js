export async function worksLoader(){
    const response = await fetch("http://127.0.0.1:8000/api/gallery/?category=gallery")
    const responseData = await response.json()
    const data = await responseData.data
    return data
}