import axios from "axios";
export const sendEmail = async(emailData) => {
    try
    {
        await axios.post("http://localhost:3000", emailData);
    }
    catch(e)
    {
        console.log("Error in api File");
    }
}