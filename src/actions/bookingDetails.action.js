import { apiFetch } from "../utils/api";
import { toast } from "react-toastify";


export async function bookingDetailsAction({request, params}) {
    const formData = await request.formData();
    const intent = formData.get("intent");

    try{
        if (intent === "add-item") {}

        if (intent === "add-payment") {}

        if (intent === "edit-customer") {}

    } catch (error) {
        toast.error("An error occurred while processing your request.");
    }
}