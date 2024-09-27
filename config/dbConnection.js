import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectionToDB= async ()=>{

    try {
        const{ connection}= await mongoose.connect(
            process.env.MONGODB_URL||`mongodb+srv://thanishmamilla:thanish123@cluster0.1x0tmmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        )
    
        if(connection){
            console.log(`Connected to MongoDB :${connection.host}`);
        }

    } catch (e) {
        console.log(e);
        process.exit(1);
    } 
}
export default connectionToDB;