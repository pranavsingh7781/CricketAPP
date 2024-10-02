import mongoose from 'mongoose'
const connectodb = async () =>
{
    try {
        const connection = await mongoose.connect(process.env.Mongo_URI,{

        });
        console.log("Database has been connected successfuly")
    } catch (error) {
        console.log(error);
        process.exit(1); // exit with failure
        
    }
};

export default connectodb;