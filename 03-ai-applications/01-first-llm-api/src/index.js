import "dotenv/config"

const apiCallHandler=async(req,res)=>{
    try {
        const response=await fetch('https://api.openai.com/v1/responses',{
            method:"POST",
            headers:{
                Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                model: "gpt-6-astra",
                input: "Write a one-sentence bedtime story about a unicorn.",
            })
        })

          if (!response.ok) {
            const errorData = await response.json();

            console.error("OpenAI API Error:", errorData);

            return res.status(response.status).json({
                message: "Failed to generate AI response",
                error: errorData.error?.message,
            });
        }
        
        const data = await response.json();

        return res.status(200).json({
            success: true,
            response: data.output_text,
            usage: data.usage,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Internal Server Error"})
    }
}

apiCallHandler()

export default apiCallHandler